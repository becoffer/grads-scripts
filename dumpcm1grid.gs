'reinit'
'open cm1out_s.ctl'

*********************** USER SETTINGS ************************************
* first time to output
tstart=33
* last time to output
tend=106
* did the model include moisture (1=yes, 0=no)?
moist=1
* does your output include base state fields (1=yes, 0=no)?
bases=0

* domain to output
xone=25
xtwo=826
yone=25
ytwo=826
zone=1
ztwo=115

* enter grid spacing
dx = 125.0

***************************************************************************
if(bases=0)
  'set t 1'
  'set x 1'
  'set y 1'
  'set z 'zone' 'ztwo
  'define th0=th'
  'define prs0=prs'
endif

sett=tstart
while(sett<=tend)

tdirname=sett
if(sett<100)
tdirname='0'sett
endif
if(sett<10)
tdirname='00'sett
endif

'set fwrite cm1dump'tdirname'.dat'
'set gxout fwrite'

'set x 'xone' 'xtwo
'set y 'yone' 'ytwo
'set z 'zone' 'ztwo
'set t 'sett

  if(moist=1)
    'define qh=qc+qr+qi+qs+qg+qhl'
  endif
  if(moist=0)
* kludge to set qv and qh to 0
    'define qv=0*th'
    'define qh=0*th'
  endif
  
  setz=zone
  while(setz<=ztwo)
    'set z 'setz
    'd uinterp'
  setz=setz+1
  endwhile
  setz=zone
  while(setz<=ztwo)
    'set z 'setz
    'd vinterp'
  setz=setz+1
  endwhile
  setz=zone
  while(setz<=ztwo)
    'set z 'setz
    'd winterp'
  setz=setz+1
  endwhile
  setz=zone
  while(setz<=ztwo)
    'set z 'setz
    'set x 'xone-2' 'xtwo+2
    'set y 'yone-2' 'ytwo+2
    if (setz=1)
    'define xvort = cdiff(winterp,y) / (2*'dx') - vinterp / 10.0'
    endif
    if (setz > 1 & setz < 115)
    'set z 'setz+1
    'q dims'
    zlin=sublin(result,4)
    height2=subwrd(zlin,6)*1000
    'set z 'setz-1
    'q dims'
    zlin=sublin(result,4)
    height1=subwrd(zlin,6)*1000
    'define xvort = cdiff(winterp,y) / (2*'dx') - (vinterp(z='setz+1') - vinterp(z='setz-1')) / ('height2'-'height1')'
    endif
    if (setz=115)
    xvort=0.0
    endif
    'set x 'xone' 'xtwo
    'set y 'yone' 'ytwo
    'd xvort'
  setz=setz+1
  endwhile
  setz=zone
  while(setz<=ztwo)
    'set z 'setz
    'set x 'xone-2' 'xtwo+2
    'set y 'yone-2' 'ytwo+2
    if (setz=1)
    'define yvort = uinterp / 10.0 - cdiff(winterp,x) / (2*'dx')'
    endif 
    if (setz > 1 & setz < 115)
    'set z 'setz+1
    'q dims'
    zlin=sublin(result,4)
    height2=subwrd(zlin,6)*1000
    'set z 'setz-1
    'q dims'
    zlin=sublin(result,4)
    height1=subwrd(zlin,6)*1000
    'define yvort = (uinterp(z='setz+1') - uinterp(z='setz-1')) / ('height2'-'height1') - cdiff(winterp,x) / (2*'dx')'
    endif
    if (setz=115)
    yvort=0.0
    endif
    'set x 'xone' 'xtwo
    'set y 'yone' 'ytwo
    'd yvort'
  setz=setz+1
  endwhile
  setz=zone
  while(setz<=ztwo)
    'set z 'setz
    'set x 'xone-2' 'xtwo+2
    'set y 'yone-2' 'ytwo+2
    'define zvort = (cdiff(vinterp,x) - cdiff(uinterp,y)) / (2*'dx')'
    'set x 'xone' 'xtwo
    'set y 'yone' 'ytwo
    'd zvort'
  setz=setz+1
  endwhile
  setz=zone
  while(setz<=ztwo)
    'set z 'setz
    'set x 'xone-2' 'xtwo+2
    'set y 'yone-2' 'ytwo+2
    'define zvort = (cdiff(vinterp,x) - cdiff(uinterp,y)) / (2*'dx')'
    'define def1 = (cdiff(uinterp,x) - cdiff(vinterp,y)) / (2*'dx')'
    'define def2 = (cdiff(vinterp,x) + cdiff(uinterp,y)) / (2*'dx')'
    'define ow = zvort*zvort - def1*def1 - def2*def2'
    'undefine zvort'
    'undefine def1'
    'undefine def2'
    'set x 'xone' 'xtwo
    'set y 'yone' 'ytwo
    'd ow'
  setz=setz+1
  endwhile
  setz=zone
  while(setz<=ztwo)
    'set z 'setz
    'd th-th0'
  setz=setz+1
  endwhile
  setz=zone
  while(setz<=ztwo)
    'set z 'setz
    'd prs-prs0'
  setz=setz+1
  endwhile
  setz=zone
  while(setz<=ztwo)
    'set z 'setz
    'd qv'
  setz=setz+1
  endwhile
  setz=zone
  while(setz<=ztwo)
    'set z 'setz
    'd qr'
  setz=setz+1
  endwhile
  setz=zone
  while(setz<=ztwo)
    'set z 'setz
    'd qg'
  setz=setz+1
  endwhile
  setz=zone
  while(setz<=ztwo)
    'set z 'setz
    'd qhl'
  setz=setz+1
  endwhile
  setz=zone
  while(setz<=ztwo)
    'set z 'setz
    'd dbz'
  setz=setz+1
  endwhile
  setz=zone
  while(setz<=ztwo)
    'set z 'setz
    'define qcloud=qc+qi'
    'd qcloud'
  setz=setz+1
  endwhile
  setz=zone
  while(setz<=ztwo)
    'set z 'setz
    'define qhyd=qr+qg+qhl+qs'
    'd qhyd'
  setz=setz+1
  endwhile

'disable fwrite'
  
sett=sett+1
endwhile

* combine .dat files into one file
'!cat cm1dump[0-9]*.dat > cm1dump.dat'
*'!rm  cm1dump[0-9]*.dat'

* create a .ctl file on the fly
ctlfile='cm1dump.ctl'
result=write(ctlfile,'dset ./cm1dump.dat')
'q undef' 
undefval=subwrd(result,7)
result=write(ctlfile,'undef 'undefval)
result=write(ctlfile,'title cm1 output dump')
'q dims'
xlin=sublin(result,2)
xwest=subwrd(xlin,6)
xeast=subwrd(xlin,8)
ylin=sublin(result,3)
ysouth=subwrd(ylin,6)
dx=(xeast-xwest)/(xtwo-xone)
dx=0.125
dy=dx
result=write(ctlfile,'xdef '1+xtwo-xone' linear 'xwest' 'dx)
result=write(ctlfile,'ydef '1+ytwo-yone' linear 'ysouth' 'dy)
result=write(ctlfile,'zdef '1+ztwo-zone' levels')
setz=zone
while(setz<=ztwo)
  'set z 'setz
  'q dims'
  zlin=sublin(result,4)
  hgt=subwrd(zlin,6)
   result=write(ctlfile,'      'hgt)
setz=setz+1
endwhile
nt=tend-tstart+1
result=write(ctlfile,'tdef 'nt' linear 00:00Z01JAN2000 1MN')
result=write(ctlfile,'vars 16')
result=write(ctlfile,'uinterp '1+ztwo-zone' 99 ** u-wind')
result=write(ctlfile,'vinterp '1+ztwo-zone' 99 ** v-wind')
result=write(ctlfile,'winterp '1+ztwo-zone' 99 ** w-wind')
result=write(ctlfile,'xvort   '1+ztwo-zone' 99 ** xi')
result=write(ctlfile,'yvort   '1+ztwo-zone' 99 ** eta')
result=write(ctlfile,'zvort   '1+ztwo-zone' 99 ** zeta')
result=write(ctlfile,'ow      '1+ztwo-zone' 99 ** ow')
result=write(ctlfile,'thpert  '1+ztwo-zone' 99 ** theta perturbation')
result=write(ctlfile,'prs     '1+ztwo-zone' 99 ** pressure perturbation')
result=write(ctlfile,'qv      '1+ztwo-zone' 99 ** water vapor mixing ratio')
result=write(ctlfile,'qr      '1+ztwo-zone' 99 ** rain mixing ratio')
result=write(ctlfile,'qg      '1+ztwo-zone' 99 ** graupel mixing ratio')
result=write(ctlfile,'qhl     '1+ztwo-zone' 99 ** hail mixing ratio')
result=write(ctlfile,'dbz     '1+ztwo-zone' 99 ** reflectivity')
result=write(ctlfile,'qcloud  '1+ztwo-zone' 99 ** total cloud mixing ratio')
result=write(ctlfile,'qhyd    '1+ztwo-zone' 99 ** total hyd. mixing ratio')
result=write(ctlfile,'endvars')
result=close(ctlfile)
  
