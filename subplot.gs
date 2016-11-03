***************************************************************************************
* $Id: subplot.gs,v 1.91 2015/07/27 22:21:13 bguan Exp $
*
* Copyright (c) 2006-2015, Bin Guan
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without modification, are
* permitted provided that the following conditions are met:
*
* 1. Redistributions of source code must retain the above copyright notice, this list
*    of conditions and the following disclaimer.
*
* 2. Redistributions in binary form must reproduce the above copyright notice, this
*    list of conditions and the following disclaimer in the documentation and/or other
*    materials provided with the distribution.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
* EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
* OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
* SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
* INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
* TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
* BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
* CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
* ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
* DAMAGE.
***************************************************************************************
function subplot(arg)
*
* Prepare plotting area for a multi-panel plot.
*
rc=gsfallow('on')

* Define system temporary directory.
tmpdir='/tmp'
* Get username and create user-specific temporary directory.
'!echo $USER > .bGASL.txt'
rc=read('.bGASL.txt')
while(sublin(rc,1))
  '!echo $USER > .bGASL.txt'
  rc=read('.bGASL.txt')
endwhile
user=sublin(rc,2)
'!rm .bGASL.txt'
mytmpdir=tmpdir'/bGASL-'user
'!mkdir -p 'mytmpdir
* Get process ID.
pidlock=mytmpdir'/pid.lock'
pidfile=mytmpdir'/pid.txt'
'!while true; do if mkdir 'pidlock'; then break; else echo System busy. Please wait...; sleep 1; fi; done 2> /dev/null'
'!echo $PPID > 'pidfile
rc=read(pidfile)
randnum=sublin(rc,2)
'!rm -r 'pidlock

*
* Read input/initialize.
*
ntot=subwrd(arg,1)
idx=subwrd(arg,2)
if(idx='')
  usage()
  return
endif
wrd3=subwrd(arg,3)
if(valnum(wrd3))
  ncol=wrd3
else
  ncol=2
endif
nrow=ntot/ncol
if(nrow!=math_int(nrow))
  nrow=math_int(nrow)+1
endif
_.isrowmajor.1=0
_.xyratio.1=0
_.istight.1=0
_.isxtight.1=0
_.isytight.1=0
_.morexspace.1=0
_.moreyspace.1=0
_.morexpad.1=0
_.moreypad.1=0
_.scalefactor.1=1
_.xappend.1=0
_.yappend.1=0
rc=parseopt(arg,'-','rowmajor','isrowmajor')
rc=parseopt(arg,'-','xy','xyratio')
rc=parseopt(arg,'-','tight','istight')
rc=parseopt(arg,'-','xtight','isxtight')
rc=parseopt(arg,'-','ytight','isytight')
rc=parseopt(arg,'-','xs','morexspace')
rc=parseopt(arg,'-','ys','moreyspace')
rc=parseopt(arg,'-','xp','morexpad')
rc=parseopt(arg,'-','yp','moreypad')
rc=parseopt(arg,'-','scale','scalefactor')
rc=parseopt(arg,'-','xappend','xappend')
rc=parseopt(arg,'-','yappend','yappend')

if(_.morexpad.1<0)
  say '[subplot ERROR] <xpad> must be >=0.'
  return
endif
if(_.moreypad.1<0)
  say '[subplot ERROR] <ypad> must be >=0.'
  return
endif
if(_.scalefactor.1>1)
  say '[subplot ERROR] <scalefactor> must be <=1.'
  return
endif

*
* Make and open a .ctl file (no .dat file) if no file is open (for running when no file is open, e.g., when plotting a Taylor diagram).
*
'query dims'
file_created=0
if(sublin(result,1)='No files open')
  ctllines=11
  ctlline.1='dset ^%y4.dat'
  ctlline.2='undef -9.99e8'
  ctlline.3='options template'
  ctlline.4='title intentionally left blank.'
  ctlline.5='xdef 2 levels 0 216'
  ctlline.6='ydef 2 levels -90 90'
  ctlline.7='zdef 1 levels 1000'
  ctlline.8='tdef 1 linear 01jan0001 1dy'
  ctlline.9='vars 1'
  ctlline.10='var 0 99 var'
  ctlline.11='endvars'
  cnt=1
  while(cnt<=ctllines)
    status=write(mytmpdir'/subplot.ctl.'randnum,ctlline.cnt)
    cnt=cnt+1
  endwhile
  status=close(mytmpdir'/subplot.ctl.'randnum)
  'open 'mytmpdir'/subplot.ctl.'randnum
  file_created=1
endif

qdims(1,'mydim')

*
* Restore original dimension environment for use by 'display' below.
*
_.mydim.resetx
_.mydim.resety
_.mydim.resetz
_.mydim.resett

*
* Needed because xlab/ylab could have been turned off earlier for a tight plot.
*
'set xlab on'
'set ylab on'

*
* Get aspect ratio of plot area.
*
num_varying_dim=(_.mydim.xsO!=_.mydim.xeO)+(_.mydim.ysO!=_.mydim.yeO)+(_.mydim.zsO!=_.mydim.zeO)+(_.mydim.tsO!=_.mydim.teO)
if(num_varying_dim<1 | num_varying_dim>2)
  say '[subplot ERROR] # of varying dimensions must be 1 or 2. Current setting is'
  'query dims'
  cnt=2
  while(cnt<=6)
    say ' 'sublin(result,cnt)
    cnt=cnt+1
  endwhile
  return
endif
'query gxinfo'
line6=sublin(result,6)
mproj=subwrd(line6,3)
if(num_varying_dim=1)
*
* For line graph, use fixed aspect ratio.
*
  xy_ratio=1
else
  if(_.mydim.xsO!=_.mydim.xeO & _.mydim.ysO!=_.mydim.yeO & mproj=2)
*
*   For Lat/Lon projection, aspect ratio is calculated.
*
    multi_factor=(5/3)/(360/180)
    lonlat_ratio=(_.mydim.loneO-_.mydim.lonsO)/(_.mydim.lateO-_.mydim.latsO)
    xy_ratio=multi_factor*lonlat_ratio
  else
*
*   For all other 2-D maps, aspect ratio is obtained by test-plotting (using current dimension setting).
*
    'set grid off'
    'set grads off'
    'set frame off'
    'set xlab off'
    'set ylab off'
    'set mpdraw off'
    'set gxout contour'
    'set clevs -1e9'
    'display lat'
    'q gxinfo'
    line3=sublin(result,3)
    line4=sublin(result,4)
    tmpa=subwrd(line3,4)
    tmpb=subwrd(line3,6)
    tmpc=subwrd(line4,4)
    tmpd=subwrd(line4,6)
    xy_ratio=(tmpb-tmpa)/(tmpd-tmpc)
    'set grid on'
    'set grads on'
    'set frame on'
    'set xlab on'
    'set ylab on'
    'set mpdraw on'
    'set gxout contour'
  endif
endif
if(_.xyratio.1)
  xy_ratio=_.xyratio.1
endif
xy_ratio=1

*
* Set up margins/spacing/padding.
*
'set vpage off'
'set parea off'
'query gxinfo'
line2=sublin(result,2)
realpagewid=subwrd(line2,4)
realpagehgt=subwrd(line2,6)
marginleft=0.25
marginright=0.25
margintop=0.25
marginbottom=0.25
*xspace0=0
*yspace0=0
*xpad0=0.33
*ypad0=0.22
xspace0=-1.1
yspace0=-0.88
xpad0=0.88
ypad0=0.66
xspace=xspace0+_.morexspace.1
yspace=yspace0+_.moreyspace.1
xpad=xpad0+_.morexpad.1
ypad=ypad0+_.moreypad.1
if(_.istight.1)
  xspace=-2*xpad
  yspace=-2*ypad
endif
if(_.isxtight.1)
  xspace=-2*xpad
endif
if(_.isytight.1)
  yspace=-2*ypad
endif

*
* Set z- and t-dimension to be fixed because later I use "query defval 1 1" to pass values between sub-plots.
* If z/t is not fixed, "query defval 1 1" may get undefined values if sub-plots are for different z/t's.
*
'set z 1'
'set t 1'

*
* Get virtual page width and height, automatically fitting page width or height.
*
pareawid_fitwid=(realpagewid-marginleft-marginright-2*xpad*ncol-xspace*(ncol-1))/ncol
pareahgt_fitwid=pareawid_fitwid/xy_ratio
pareahgt_fithgt=(realpagehgt-margintop-marginbottom-2*ypad*nrow-yspace*(nrow-1))/nrow
if(pareahgt_fitwid<pareahgt_fithgt)
  pareawid=pareawid_fitwid
  pareahgt=pareawid/xy_ratio
else
  pareahgt=pareahgt_fithgt
  pareawid=pareahgt*xy_ratio
endif
pareawid=pareawid*_.scalefactor.1
pareahgt=pareahgt*_.scalefactor.1
vpagewid=pareawid+2*xpad
vpagehgt=pareahgt+2*ypad

*
* Exit if plots to be appended cannot fit into rest of page.
*
if(idx=1)
  if(_.xappend.1=1)
    'query defval vpagexbmax 1 1'
    vpage_xb_max=subwrd(result,3)
    if(vpagewid*ncol+xspace*ncol>realpagewid-vpage_xb_max-marginright)
      say '[subplot ERROR] cannot fit into page; try reducing # of columns to be appended.'
      return
    endif
  endif
  if(_.yappend.1=1)
    'query defval vpageybmin 1 1'
    vpage_yb_min=subwrd(result,3)
    if(vpagehgt*nrow+yspace*nrow>vpage_yb_min-marginbottom)
      say '[subplot ERROR] cannot fit into page; try reducing # of rows to be appended.'
      return
    endif
  endif
endif

*
* Get virtual page boundaries.
* (xa,ya)---------
*    |           |
*    |   vpage   |
*    |           |
*    ---------(xb,yb)
*
if(_.isrowmajor.1=0)
  row_coordinate=idx-math_int((idx-1)/nrow)*nrow
  col_coordinate=math_int((idx-1)/nrow)+1
  idx_above=idx-1
  idx_left=idx-nrow
else
  col_coordinate=idx-math_int((idx-1)/ncol)*ncol
  row_coordinate=math_int((idx-1)/ncol)+1
  idx_left=idx-1
  idx_above=idx-ncol
endif
if(idx=1)
  if(_.xappend.1=0)
    'define vpagexa'idx'=0+'marginleft
  else
    'define vpagexa'idx'=vpagexbmax+'xspace
  endif
  if(_.yappend.1=0)
    'define vpageya'idx'='realpagehgt'-'margintop
  else
    'define vpageya'idx'=vpageybmin-'yspace
  endif
endif
if(col_coordinate=1 & idx!=1)
  'define vpagexa'idx'=vpagexa'idx_above
  'define vpageya'idx'=vpageyb'idx_above'-'yspace
endif
if(row_coordinate=1 & idx!=1)
  'define vpagexa'idx'=vpagexb'idx_left'+'xspace
  'define vpageya'idx'=vpageya'idx_left
endif
if(col_coordinate!=1 & row_coordinate!=1)
  'define vpagexa'idx'=vpagexb'idx_left'+'xspace
  'define vpageya'idx'=vpageyb'idx_above'-'yspace
endif
'define vpagexb'idx'=vpagexa'idx'+'vpagewid
'define vpageyb'idx'=vpageya'idx'-'vpagehgt

*
* Record rightmost and lowest virtual page boundaries for later use.
*
if(idx=1)
  'define vpagexbmax=vpagexb'idx
  'define vpageybmin=vpageyb'idx
else
  'query defval vpagexb'idx' 1 1'
  vpage_xb=subwrd(result,3)
  'query defval vpagexbmax 1 1'
  vpage_xb_max=subwrd(result,3)
  if(vpage_xb>vpage_xb_max)
    'define vpagexbmax=vpagexb'idx
  endif
  'query defval vpageyb'idx' 1 1'
  vpage_yb=subwrd(result,3)
  'query defval vpageybmin 1 1'
  vpage_yb_min=subwrd(result,3)
  if(vpage_yb<vpage_yb_min)
    'define vpageybmin=vpageyb'idx
  endif
endif

*
* Set virtual page boundaries.
*
'query defval vpagexa'idx' 1 1'
vpage_xa=subwrd(result,3)
'query defval vpagexb'idx' 1 1'
vpage_xb=subwrd(result,3)
'query defval vpageya'idx' 1 1'
vpage_ya=subwrd(result,3)
'query defval vpageyb'idx' 1 1'
vpage_yb=subwrd(result,3)
'set vpage 'vpage_xa' 'vpage_xb' 'vpage_yb' 'vpage_ya

*
* Set plotting area.
*
'query gxinfo'
line2=sublin(result,2)
psudopagewid=subwrd(line2,4)
psudopagehgt=subwrd(line2,6)
if(psudopagewid=realpagewid)
  rvratio=realpagewid/vpagewid
else
  rvratio=realpagehgt/vpagehgt
endif
pareawid=pareawid*rvratio
pareahgt=pareahgt*rvratio
parea_xa=(psudopagewid-pareawid)/2
parea_xb=psudopagewid-(psudopagewid-pareawid)/2
parea_ya=psudopagehgt-(psudopagehgt-pareahgt)/2
parea_yb=(psudopagehgt-pareahgt)/2
if(parea_xa<0);parea_xa=0;endif
if(parea_xb>=psudopagewid);parea_xb=psudopagewid-5e-5;endif
if(parea_ya>=psudopagehgt);parea_ya=psudopagehgt-5e-5;endif
if(parea_yb<0);parea_yb=0;endif
'set parea 'parea_xa' 'parea_xb' 'parea_yb' 'parea_ya

*
* Set label sizes (optional).
*
'set clopts -1 -1 '0.07*rvratio
'set xlopts 1 -1 '0.09*rvratio
'set ylopts 1 -1 '0.09*rvratio
'set strsiz '0.11*rvratio
say '[subplot info] Current setting is'
say ' aspect ratio = 'math_format('%.3f',xy_ratio)'.'
*say ' set clopts -1 -1 'math_format('%.3f',0.07*rvratio)
*say ' set xlopts 1 -1 'math_format('%.3f',0.09*rvratio)
*say ' set ylopts 1 -1 'math_format('%.3f',0.09*rvratio)
*say ' set strsiz 'math_format('%.3f',0.11*rvratio)

*
* Set xlab, ylab (optional).
*
if(_.istight.1=1 | _.isxtight.1=1)
  if(col_coordinate=1)
    'set ylab on'
  else
    'set ylab off'
  endif
endif
if(_.istight.1=1 | _.isytight.1=1)
  if(row_coordinate=nrow)
    'set xlab on'
  else
    'set xlab off'
  endif
endif

*
* Restore original dimension environment.
*
_.mydim.resetx
_.mydim.resety
_.mydim.resetz
_.mydim.resett

if(file_created=1)
  'close 'file_number()
endif

return
***************************************************************************************
function file_number()
*
* Get the number of files opened.
*
'q files'
line1=sublin(result,1)
line1=sublin(result,1)
if(line1='No files open')
  return 0
endif

lines=1
while(sublin(result,lines+1)!='')
  lines=lines+1
endwhile

return lines/3
***************************************************************************************
function parseopt(instr,optprefix,optname,outname)
*
* Parse an option, store argument(s) in a global variable array.
*
rc=gsfallow('on')
cnt=1
cnt2=0
while(subwrd(instr,cnt)!='')
  if(subwrd(instr,cnt)=optprefix''optname)
    cnt=cnt+1
    word=subwrd(instr,cnt)
    while(word!='' & (valnum(word)!=0 | substr(word,1,1)''999!=optprefix''999))
      cnt2=cnt2+1
      _.outname.cnt2=parsestr(instr,cnt)
      cnt=_end_wrd_idx+1
      word=subwrd(instr,cnt)
    endwhile
  endif
  cnt=cnt+1
endwhile
return cnt2
***************************************************************************************
function usage()
*
* Print usage information.
*
say '  Prepare plotting area for a multi-panel plot.'
say ''
say '  USAGE: subplot <ntot> <idx> [<ncol>] [-rowmajor 0|1] [-xy <xyratio>] [-tight 0|1] [-xtight 0|1] [-ytight 0|1]'
say '         [-xs <xspace>] [-ys <yspace>] [-xp <xpad>] [-yp <ypad>] [-scale <scalefactor>] [-xappend 0|1] [-yappend 0|1]'
say '    <ntot>: total number of panels to be plotted. Do NOT have to be # of rows times # of columns; will be rounded up to that value.'
say '    <idx>: index of panel. In any column/row, panels with smaller <idx> MUST be plotted earlier.'
say '    <ncol>: number of columns. Default=2 (even if <ntot> = 1).'
say '    -rowmajor 1: plot 1st row first, then 2nd row, ...'
say '    <xyratio>: aspect ratio of plotting area. Default=1. An optimal value is calculated for map projections.'
say '    -tight 1: leave no spaces between panels.'
say '    -xtight 1: leave no horizontal spaces between panels.'
say '    -ytight 1: leave no vertical spaces between panels.'
say '    <xspace>: horizontal spacing in addition to default value.'
say '    <yspace>: vertical spacing in addition to default value.'
say '    <xpad>: horizontal padding in addition to default value.'
say '    <ypad>: vertical padding in addition to default value.'
say '    <scalefactor>: scale factor for plot width/height. MUST be <=1. Default=1.'
say '    -xappend 1: attach a new page right of existing plots. This is NOT intended for simple multi-column plots.'
say '    -yappend 1: attach a new page below existing plots. This is NOT intended for simple multi-row plots.'
say ''
say '  NOTE:'
say '    1. Spacing refers to blank space between virtual pages; can be any value.'
say '    2. Padding refers to space between virtual page boundaries and plotting area; cannot be negative values.'
say '    3. For best result, set desired dimensions before (instead of after) running this script.'
say ''
say '  EXAMPLE 1: 2 rows by 2 columns.'
say '    set lon 120 300'
say '    set lat -25 25'
say '    set t 1'
say '    subplot 4 1'
say '    display sst'
say '    ...'
say '    set t 4'
say '    subplot 4 4'
say '    display sst'
say ''
say '  EXAMPLE 2: 3 rows by 1 column and no vertical spaces between panels.'
say '    set lon 120 300'
say '    set lat -25 25'
say '    set t 1'
say '    subplot 3 1 1 -ytight 1'
say '    display sst'
say '    ...'
say '    set t 3'
say '    subplot 3 3 1 -ytight 1'
say '    display sst'
say ''
say '  DEPENDENCIES: parsestr.gsf qdims.gsf'
say ''
say '  Copyright (c) 2006-2015, Bin Guan.'
return

**************************************************************************************
* $Id: parsestr.gsf,v 1.21 2015/04/29 22:27:42 bguan Exp $
*
* Copyright (c) 2005, Bin Guan
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without modification, are
* permitted provided that the following conditions are met:
*
* 1. Redistributions of source code must retain the above copyright notice, this list
*    of conditions and the following disclaimer.
*
* 2. Redistributions in binary form must reproduce the above copyright notice, this
*    list of conditions and the following disclaimer in the documentation and/or other
*    materials provided with the distribution.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
* EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
* OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
* SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
* INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
* TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
* BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
* CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
* ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
* DAMAGE.
***************************************************************************************
function parsestr(instr,start_wrd_idx)
*
* Extract first word, or first phrase (indicated by double quotes) in <instr> starting from <start_wrd_idx>'th word.
* Usage: outstr=parsestr(instr,start_wrd_idx)
*   instr: input string.
*   start_wrd_idx: parsing starts at <start_wrd_idx>'th word (NOT phrase) of <instr>.
*   _end_wrd_idx: output global variable; parsing is stopped at <_end_wrd_idx>'th word (NOT phrase) of input string.
*   outstr: output word/phrase.
*
* Note 1: Word to be extracted may or may not be double quoted. Phrase to be extracted MUST be double quoted.
* Note 2: Blank spaces are NOT allowed immediately inside double quotes; other redundant blank spaces in double quotes will be truncated.
* Note 3: Outer pair of double quotes (e.g., "Hello, World!") will NOT be included in output phrase.
* Note 4: If present, inner double quotes immediately inside outer double quotes (e.g., ""Hello, World!"") WILL be included in output phrase.
* Note 5: Double quotes shall not appear in places other than indicated in Note 3 and 4.
* Note 6: Empty string will be returned for "".
*
outstr=''
cnt=start_wrd_idx
wrd=subwrd(instr,cnt)

if(substr(wrd,1,1)!='"')
  outstr=wrd
  _end_wrd_idx=cnt
  return outstr
endif

if(wrd='""')
  outstr=''
  _end_wrd_idx=cnt
  return outstr
endif

wrd=substr(wrd,2,math_strlen(wrd)-1)
while(substr(wrd,math_strlen(wrd),1)!='"')
  if(cnt=start_wrd_idx)
    outstr=wrd
  else
    outstr=outstr' 'wrd
  endif
  cnt=cnt+1
  wrd=subwrd(instr,cnt)
  if(wrd='')
    errmsg='[parsestr ERROR] Unmatched quote.'
    say errmsg
    _end_wrd_idx='NaN'
    return errmsg
  endif
endwhile
wrd=substr(wrd,1,math_strlen(wrd)-1)
if(cnt=start_wrd_idx)
  outstr=wrd
else
  outstr=outstr' 'wrd
endif
_end_wrd_idx=cnt
return outstr

***************************************************************************************
* $Id: qdims.gsf,v 1.60 2015/09/28 21:31:39 bguan Exp $
*
* Copyright (c) 2012-2015, Bin Guan
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without modification, are
* permitted provided that the following conditions are met:
*
* 1. Redistributions of source code must retain the above copyright notice, this list
*    of conditions and the following disclaimer.
*
* 2. Redistributions in binary form must reproduce the above copyright notice, this
*    list of conditions and the following disclaimer in the documentation and/or other
*    materials provided with the distribution.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
* EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
* OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
* SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
* INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
* TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
* BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
* CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
* ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
* DAMAGE.
***************************************************************************************
function qdims(snap_to_grid,outname)
*
* Query and set dimensions.
*
* Usage: qdims(<snap_to_grid>,<outname>)
*   <snap_to_grid>: 0|1. Set to 1 to get correct dimension information for .ctl/.dat output - should reset dimensions later using _.<outname>.reset*. Set to 0 if no file output is involved.
*   <outname>: name of output global variable will be _.<outname>.*. The total length of _.<outname>.* cannot exceed 16.
*
fmt='%.12g'

'query dims'
lx=sublin(result,2)
ly=sublin(result,3)
lz=sublin(result,4)
lt=sublin(result,5)

*
* Get dimension information BEFORE snapping to grid, which can be used later to reset dimensions to original, un-snapped status.
* Note: The method used here gives limited significant digits.
*

*
* x dimension.
*
if(subwrd(lx,7)='to')
  _.outname.lonsO=subwrd(lx,6)
  _.outname.loneO=subwrd(lx,8)
  _.outname.xsO=subwrd(lx,11)
  _.outname.xeO=subwrd(lx,13)
else
  _.outname.lonsO=subwrd(lx,6)
  _.outname.loneO=subwrd(lx,6)
  _.outname.xsO=subwrd(lx,9)
  _.outname.xeO=subwrd(lx,9)
endif
_.outname.resetx='set x '_.outname.xsO' '_.outname.xeO

*
* y dimension.
*
if(subwrd(ly,7)='to')
  _.outname.latsO=subwrd(ly,6)
  _.outname.lateO=subwrd(ly,8)
  _.outname.ysO=subwrd(ly,11)
  _.outname.yeO=subwrd(ly,13)
else
  _.outname.latsO=subwrd(ly,6)
  _.outname.lateO=subwrd(ly,6)
  _.outname.ysO=subwrd(ly,9)
  _.outname.yeO=subwrd(ly,9)
endif
_.outname.resety='set y '_.outname.ysO' '_.outname.yeO

*
* z dimension.
*
if(subwrd(lz,7)='to')
  _.outname.levsO=subwrd(lz,6)
  _.outname.leveO=subwrd(lz,8)
  _.outname.zsO=subwrd(lz,11)
  _.outname.zeO=subwrd(lz,13)
else
  _.outname.levsO=subwrd(lz,6)
  _.outname.leveO=subwrd(lz,6)
  _.outname.zsO=subwrd(lz,9)
  _.outname.zeO=subwrd(lz,9)
endif
_.outname.resetz='set z '_.outname.zsO' '_.outname.zeO

*
* t dimension.
*
if(subwrd(lt,7)='to')
  _.outname.timsO=subwrd(lt,6)
  _.outname.timeO=subwrd(lt,8)
  _.outname.tsO=subwrd(lt,11)
  _.outname.teO=subwrd(lt,13)
else
  _.outname.timsO=subwrd(lt,6)
  _.outname.timeO=subwrd(lt,6)
  _.outname.tsO=subwrd(lt,9)
  _.outname.teO=subwrd(lt,9)
endif
_.outname.resett='set t '_.outname.tsO' '_.outname.teO

*
* Snap coordinates to grid.
*
if(snap_to_grid)
  'set x 'math_nint(_.outname.xsO)' 'math_nint(_.outname.xeO)
  'set y 'math_nint(_.outname.ysO)' 'math_nint(_.outname.yeO)
  'set z 'math_nint(_.outname.zsO)' 'math_nint(_.outname.zeO)
  'set t 'math_nint(_.outname.tsO)' 'math_nint(_.outname.teO)
endif

*
* Ensure x-coordinates have no redundant points.
*
if(snap_to_grid)
  'query dims'
  lx=sublin(result,2)
  if(subwrd(lx,7)='to')
    lonsTMP=subwrd(lx,6)
    loneTMP=subwrd(lx,8)
    xsTMP=subwrd(lx,11)
    xeTMP=subwrd(lx,13)
  else
    lonsTMP=subwrd(lx,6)
    loneTMP=subwrd(lx,6)
    xsTMP=subwrd(lx,9)
    xeTMP=subwrd(lx,9)
  endif
  if(loneTMP-lonsTMP>=360)
    rddnt_points=(loneTMP-lonsTMP-360)/((loneTMP-lonsTMP)/(xeTMP-xsTMP))+1
    'set x 'xsTMP' 'xeTMP-rddnt_points
  endif
endif

*
* Re-get dimension information AFTER snapping to grid.
* Note: The method used here is different from earlier to get more significant digits for world coordinates.
*

'query dims'
lx=sublin(result,2)
ly=sublin(result,3)
lz=sublin(result,4)
lt=sublin(result,5)

*
* x dimension.
*
if(subwrd(lx,7)='to')
*
* x is not fixed.
*
  _.outname.xs=subwrd(lx,11)
  _.outname.xe=subwrd(lx,13)
  'set x '_.outname.xs
  'set y 1'
  'set z 1'
  'set t 1'
  _.outname.lons=getval('lon',fmt)
  'set x '_.outname.xe
  'set y 1'
  'set z 1'
  'set t 1'
  _.outname.lone=getval('lon',fmt)
  _.outname.nx=_.outname.xe-_.outname.xs+1
  _.outname.dlon=(_.outname.lone-_.outname.lons)/(_.outname.xe-_.outname.xs)
  _.outname.xdef='xdef '_.outname.nx' linear '_.outname.lons' '_.outname.dlon
else
*
* x is fixed.
*
  _.outname.xs=subwrd(lx,9);
  _.outname.xe=subwrd(lx,9);
  'set x '_.outname.xs
  'set y 1'
  'set z 1'
  'set t 1'
  _.outname.lons=getval('lon',fmt)
  'set x '_.outname.xe
  'set y 1'
  'set z 1'
  'set t 1'
  _.outname.lone=getval('lon',fmt)
  _.outname.nx=_.outname.xe-_.outname.xs+1
  _.outname.dlon=9.87654321
  _.outname.xdef='xdef '_.outname.nx' levels '_.outname.lons
endif

*
* y dimension.
*
if (subwrd(ly,7)='to')
*
* y is not fixed.
*
  _.outname.ys=subwrd(ly,11)
  _.outname.ye=subwrd(ly,13)
  'set x 1'
  'set y '_.outname.ys
  'set z 1'
  'set t 1'
  _.outname.lats=getval('lat',fmt)
  'set x 1'
  'set y '_.outname.ye
  'set z 1'
  'set t 1'
  _.outname.late=getval('lat',fmt)
  _.outname.ny=_.outname.ye-_.outname.ys+1
  _.outname.dlat=(_.outname.late-_.outname.lats)/(_.outname.ye-_.outname.ys)
  _.outname.ydef='ydef '_.outname.ny' linear '_.outname.lats' '_.outname.dlat
else
*
* y is fixed.
*
  _.outname.ys=subwrd(ly,9)
  _.outname.ye=subwrd(ly,9)
  'set x 1'
  'set y '_.outname.ys
  'set z 1'
  'set t 1'
  _.outname.lats=getval('lat',fmt)
  'set x 1'
  'set y '_.outname.ye
  'set z 1'
  'set t 1'
  _.outname.late=getval('lat',fmt)
  _.outname.ny=_.outname.ye-_.outname.ys+1
  _.outname.dlat=9.87654321
  _.outname.ydef='ydef '_.outname.ny' levels '_.outname.lats
endif

*
* If y is not linear (e.g., Gaussian).
*
if(ylinlev()='levels' | ylinlev()='LEVELS')
* begin trick to get a new line character
  'nonexistentvar=1'
  'query defval nonexistentvar 1 1'
  newlinechar=substr(result,12,1)
  'undefine nonexistentvar'
* end trick
  _.outname.ydef='ydef '_.outname.ny' levels'
  cnt=_.outname.ys
  while(cnt<=_.outname.ye)
    'set x 1'
    'set y 'cnt
    'set z 1'
    'set t 1'
    if(math_mod(cnt,10)=1 & cnt>1)
      _.outname.ydef=_.outname.ydef' 'newlinechar
    endif
    _.outname.ydef=_.outname.ydef' 'getval('lat',fmt)
    cnt=cnt+1
  endwhile
endif

*
* z dimension.
*
if (subwrd(lz,7)='to')
*
* z is not fixed.
*
  _.outname.zs=subwrd(lz,11)
  _.outname.ze=subwrd(lz,13)
  'set x 1'
  'set y 1'
  'set z '_.outname.zs
  'set t 1'
  _.outname.levs=getval('lev',fmt)
  'set x 1'
  'set y 1'
  'set z '_.outname.ze
  'set t 1'
  _.outname.leve=getval('lev',fmt)
  _.outname.nz=_.outname.ze-_.outname.zs+1
  _.outname.dlev=(_.outname.leve-_.outname.levs)/(_.outname.ze-_.outname.zs)
  _.outname.zdef='zdef '_.outname.nz' linear '_.outname.levs' '_.outname.dlev
else
*
* z is fixed.
*
  _.outname.zs=subwrd(lz,9)
  _.outname.ze=subwrd(lz,9)
  'set x 1'
  'set y 1'
  'set z '_.outname.zs
  'set t 1'
  _.outname.levs=getval('lev',fmt)
  'set x 1'
  'set y 1'
  'set z '_.outname.ze
  'set t 1'
  _.outname.leve=getval('lev',fmt)
  _.outname.nz=_.outname.ze-_.outname.zs+1
  _.outname.dlev=9.87654321
  _.outname.zdef='zdef '_.outname.nz' levels '_.outname.levs
endif
if(_.outname.nz=1)
_.outname.nz0=0
else
_.outname.nz0=_.outname.nz
endif

*
* If z is not linear (usually the case).
*
if(zlinlev()='levels' | zlinlev()='LEVELS')
* my trick to get a new line character
  'nonexistentvar=1'
  'q defval nonexistentvar 1 1'
  newlinechar=substr(result,12,1)
  'undefine nonexistentvar'
* end trick
  _.outname.zdef='zdef '_.outname.nz' levels'
  cnt=_.outname.zs
  while(cnt<=_.outname.ze)
    'set x 1'
    'set y 1'
    'set z 'cnt
    'set t 1'
    if(math_mod(cnt,10)=1 & cnt>1)
      _.outname.zdef=_.outname.zdef' 'newlinechar
    endif
    _.outname.zdef=_.outname.zdef' 'getval('lev',fmt)
    cnt=cnt+1
  endwhile
endif

*
* t dimension.
*
if (subwrd(lt,7)='to')
*
* t is not fixed.
*
  _.outname.tims=subwrd(lt,6)
  _.outname.time=subwrd(lt,8)
  _.outname.ts=subwrd(lt,11)
  _.outname.te=subwrd(lt,13)
else
*
* t is fixed.
*
  _.outname.tims=subwrd(lt,6)
  _.outname.time=subwrd(lt,6)
  _.outname.ts=subwrd(lt,9)
  _.outname.te=subwrd(lt,9)
endif
_.outname.yrs=substr(_.outname.tims,math_strlen(_.outname.tims)-3,math_strlen(_.outname.tims))
_.outname.yre=substr(_.outname.time,math_strlen(_.outname.time)-3,math_strlen(_.outname.time))
* In the above two lines, year is obtained as the last four digits of the time expression. This is always correct.
* If count from the left, the digit location will depend on whether minutes are specified in the time expression (e.g., 00Z01JAN1999 vs. 00:00Z01JAN1999).
_.outname.nt=_.outname.te-_.outname.ts+1
_.outname.dtim=time_incr()
_.outname.tdef='tdef '_.outname.nt' linear '_.outname.tims' '_.outname.dtim

'set x '_.outname.xs' '_.outname.xe
'set y '_.outname.ys' '_.outname.ye
'set z '_.outname.zs' '_.outname.ze
'set t '_.outname.ts' '_.outname.te

return
***************************************************************************************
function time_incr()
*
* Get time increment from the default .ctl file.
*
'query ctlinfo'
if(result='No Files Open')
  return 'unknown'
endif

lines=1
while(1)
  lin=sublin(result,lines)
  if(subwrd(lin,1)='tdef' | subwrd(lin,1)='TDEF')
    return subwrd(lin,5)
  endif
  lines=lines+1
endwhile
***************************************************************************************
function ylinlev()
*
* Determine if y is linear or levels based on the default .ctl file.
*
'query ctlinfo'
if(result='No Files Open')
  return 'unknown'
endif

lines=1
while(1)
  lin=sublin(result,lines)
  if(subwrd(lin,1)='ydef' | subwrd(lin,1)='YDEF')
    return subwrd(lin,3)
  endif
  lines=lines+1
endwhile
***************************************************************************************
function zlinlev()
*
* Determine if z is linear or levels based on the default .ctl file.
*
'query ctlinfo'
if(result='No Files Open')
  return 'unknown'
endif

lines=1
while(1)
  lin=sublin(result,lines)
  if(subwrd(lin,1)='zdef' | subwrd(lin,1)='ZDEF')
    return subwrd(lin,3)
  endif
  lines=lines+1
endwhile
***************************************************************************************
function getval(expr,fmt)
*
* Return value of a GrADS expression in specified format.
*
if(fmt='fmt');fmt='%g';endif
'nonexistentvar='expr
'query defval nonexistentvar 1 1'
part1=subwrd(result,3)
if(part1='missing');return 'NaN';endif
'nonexistentvar='expr'-'part1
'query defval nonexistentvar 1 1'
part2=subwrd(result,3)
'nonexistentvar='expr'-'part1'-'part2
'query defval nonexistentvar 1 1'
part3=subwrd(result,3)
'undefine nonexistentvar'

return math_format(fmt,part1+part2+part3)
