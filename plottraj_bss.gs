***physical dimensions for the 3-D plot space***
lona=65
lonb=105
lata=65
latb=105
leva=0
levb=1500

***first trajectory file (number) to open***
trajone=1 

***maximum number of trajectories (last file opened will be trajone+numtraj-1)**
numtraj=31

***interval between trajectories (plot a subset of every n-th traj)***
trajint=1

******'<------------title to draw at top of plot---------------->'***
title='TORV2 Trajectories'

***mark a specific time on the plot?  which time (in seconds)?***
markon=1
mrktim=10200.0
markstart=1

***color (=1) or b/w line styles (=0)***
color=1

***plotting parameters (edges/sizes of the plots)***
xyhght=4.65
xywdth=7.75
zhght=1.0
space=0.25
paba=1.0
pala=1.0

pata=paba + xyhght
pabb=pata + space
patb=pabb + zhght
para=pala + xyhght*(lonb-lona)/(latb-lata)
palb=para + space
parb=palb + zhght

if(parb>10)
para=pala + xywdth
palb=para + space
parb=palb + zhght
pata=paba + xywdth*(latb-lata)/(lonb-lona)
pabb=pata + space
patb=pabb + zhght
endif

**************************************************

'open cm1out_s'
'set mpdraw off'
'set grads off'

**************************************************

***draw the x vs. y plot***

'set mproj scaled'
'set parea 'pala' 'para' 'paba' 'pata
'set lat 'lata' 'latb
'set lon 'lona' 'lonb
'set lev 'leva

'set gxout fgrid'
*'set xaxis 'lona-300' 'lonb-300
'set xaxis 'lona' 'lonb
'set yaxis 'lata' 'latb
'set xlint '20
'set ylint '20
'd uinterp*0'

colnum=1
widnum=1
if(color=1)
widnum=3
endif

trajno=trajone

while(trajno<trajone+numtraj)

xold=123456789

if(trajno<10)
   trajfil='selected/bss_parcels.0000'trajno
endif
if(trajno>9)
  if(trajno<100)
     trajfil='selected/bss_parcels.000'trajno
  endif
  if(trajno>99)
     trajfil='selected/bss_parcels.00'trajno
  endif
  if(trajno>999)
     trajfil='selected/bss_parcels.0'trajno
  endif
  if(trajno>9999)
     trajfil='selected/bss_parcels.'trajno
  endif
endif

*  read header
result=read(trajfil)

readnum=1
while(readnum<601)

result=read(trajfil)

statusop=sublin(result,1)

if(statusop=0)

**** added for production plot for Parker and Johnson 2003 Part I
if(trajno=1)
widnum=1
endif
if(trajno=2)
widnum=1
endif
if(trajno=3)
widnum=1
endif
if(trajno=4)
widnum=4 
endif
if(trajno=5)
widnum=4 
endif
if(trajno=6)
widnum=4 
endif
if(trajno=7)
widnum=7 
endif
if(trajno=8)
widnum=7 
endif
if(trajno=9)
widnum=7 
endif
****

rec=sublin(result,2)
time=subwrd(rec,1)
xloc=subwrd(rec,2)
yloc=subwrd(rec,3)
zloc=subwrd(rec,4)

plotx=xloc/1000
ploty=yloc/1000

'q w2xy 'plotx' 'ploty
rec=sublin(result,1)
xnew=subwrd(rec,3)
ynew=subwrd(rec,6)

if(color=1)
'set line 'colnum' 1 'widnum
endif
if(color=0)
'set line 1 1 'widnum
endif

if(xnew>=pala)
if(xnew<=para)
if(ynew>=paba)
if(ynew<=pata)
if(xold=123456789)
if(startmark=1)
'draw mark 2 'xnew' 'ynew' 0.15'
endif
endif
if(xold!=123456789)
foo=math_abs(ynew-yold)
if(foo<0.5)
'draw line 'xold' 'yold' 'xnew' 'ynew
endif
endif
if(time=mrktim)
if(markon=1)
'draw mark 5 'xnew' 'ynew' 0.10'
endif
endif
endif
endif
endif
endif

xold=xnew
yold=ynew

endif
 
readnum=readnum+1
endwhile

result=close(trajfil)

if(color=1)
colnum=colnum+1
if(colnum>15)
colnum=1
widnum=11-widnum
endif
endif
if(color=0)
widnum=widnum+2
if(widnum>10)
widnum=1
endif
endif

widnum=1

trajno=trajno+trajint
endwhile

*********************************************

***draw the x vs. z plot***

'set mproj scaled'
'set parea 'pala' 'para' 'pabb' 'patb
'set lat 'lata
'set lon 'lona' 'lonb
'set lev 'leva' 'levb

'set gxout fgrid'
'set xaxis 'lona' 'lonb
'set yaxis 'leva/1000' 'levb/1000
'set xlopts 0'
'set xlint '20
'set ylint '4  
'set xlpos 0 t'
'set ylpos 0 l'
'd uinterp*0'

colnum=1
widnum=1
if(color=1)
widnum=3
endif

trajno=trajone

while(trajno<trajone+numtraj)

xold=123456789

if(trajno<10)
   trajfil='selected/bss_parcels.0000'trajno
endif
if(trajno>9)
  if(trajno<100)
     trajfil='selected/bss_parcels.000'trajno
  endif
  if(trajno>99)
     trajfil='selected/bss_parcels.00'trajno
  endif
  if(trajno>999)
     trajfil='selected/bss_parcels.0'trajno
  endif
  if(trajno>9999)
     trajfil='selected/bss_parcels.'trajno
  endif
endif

**** added for production plot for Parker and Johnson 2003 Part I
if(trajno=1)
widnum=1
endif
if(trajno=2)
widnum=1
endif
if(trajno=3)
widnum=1
endif
if(trajno=4)
widnum=4 
endif
if(trajno=5)
widnum=4 
endif
if(trajno=6)
widnum=4 
endif
if(trajno=7)
widnum=7 
endif
if(trajno=8)
widnum=7 
endif
if(trajno=9)
widnum=7 
endif
****

*  read header
result=read(trajfil)

readnum=1
while(readnum<601)

result=read(trajfil)

statusop=sublin(result,1)

if(statusop=0)

rec=sublin(result,2)
time=subwrd(rec,1)
xloc=subwrd(rec,2)
yloc=subwrd(rec,3)
zloc=subwrd(rec,4)

plotx=xloc/1000
ploty=zloc

'q w2xy 'plotx' 'ploty
rec=sublin(result,1)
xnew=subwrd(rec,3)
ynew=subwrd(rec,6)

if(color=1)
'set line 'colnum' 1 'widnum
endif
if(color=0)
'set line 1 1 'widnum
endif

if(xnew>=pala)
if(xnew<=para)
if(ynew>=pabb)
if(ynew<=patb)
if(xold=123456789)
if(startmark=1)
'draw mark 2 'xnew' 'ynew' 0.15'
endif
endif
if(xold!=123456789)
'draw line 'xold' 'yold' 'xnew' 'ynew
endif
if(time=mrktim)
if(markon=1)
'draw mark 5 'xnew' 'ynew' 0.10'
endif
endif
endif
endif
endif
endif

xold=xnew
yold=ynew

endif
 
readnum=readnum+1
endwhile

result=close(trajfil)

if(color=1)
colnum=colnum+1
if(colnum>15)
colnum=1
widnum=11-widnum
endif
endif
if(color=0)
widnum=widnum+2
if(widnum>10)
widnum=1
endif
endif

widnum=1

trajno=trajno+trajint
endwhile

'set xlopts 1'
'set xlpos 0 b'
'set ylpos 0 r'

*********************************************

***draw the y vs. z plot***

'set mproj scaled'
'set parea 'palb' 'parb' 'paba' 'pata
'set lat 'lata' 'latb
'set lon 'lona
'set lev 'leva' 'levb

'set gxout fgrid'
'set xaxis 'leva/1000' 'levb/1000
'set yaxis 'lata' 'latb
'set ylopts 0'
'set xlint '4 
'set ylint '20 
'set xyrev on'
'set xlpos 0 t'
'set ylpos 0 r'
'd uinterp*0'

colnum=1
widnum=1
if(color=1)
widnum=3
endif

trajno=trajone

while(trajno<trajone+numtraj)

xold=123456789

if(trajno<10)
   trajfil='selected/bss_parcels.0000'trajno
endif
if(trajno>9)
  if(trajno<100)
     trajfil='selected/bss_parcels.000'trajno
  endif
  if(trajno>99)
     trajfil='selected/bss_parcels.00'trajno
  endif
  if(trajno>999)
     trajfil='selected/bss_parcels.0'trajno
  endif
  if(trajno>9999)
     trajfil='selected/bss_parcels.'trajno
  endif
endif

**** added for production plot for Parker and Johnson 2003 Part I
if(trajno=1)
widnum=1
endif
if(trajno=2)
widnum=1
endif
if(trajno=3)
widnum=1
endif
if(trajno=4)
widnum=4 
endif
if(trajno=5)
widnum=4 
endif
if(trajno=6)
widnum=4 
endif
if(trajno=7)
widnum=7 
endif
if(trajno=8)
widnum=7 
endif
if(trajno=9)
widnum=7 
endif
****

*  read header
result=read(trajfil)

readnum=1
while(readnum<601)

result=read(trajfil)

statusop=sublin(result,1)

if(statusop=0)

rec=sublin(result,2)
time=subwrd(rec,1)
xloc=subwrd(rec,2)
yloc=subwrd(rec,3)
zloc=subwrd(rec,4)

plotx=zloc     
ploty=yloc/1000

'q w2xy 'plotx' 'ploty
rec=sublin(result,1)
xnew=subwrd(rec,3)
ynew=subwrd(rec,6)

if(color=1)
'set line 'colnum' 1 'widnum
endif
if(color=0)
'set line 1 1 'widnum
endif

if(xnew>=palb)
if(xnew<=parb)
if(ynew>=paba)
if(ynew<=pata)
if(xold=123456789)
if(startmark=1)
'draw mark 2 'xnew' 'ynew' 0.15'
endif
endif
if(xold!=123456789)
foo=math_abs(ynew-yold)
if(foo<0.5)
'draw line 'xold' 'yold' 'xnew' 'ynew
endif
endif
if(time=mrktim)
if(markon=1)
'draw mark 5 'xnew' 'ynew' 0.10'
endif
endif
endif
endif
endif
endif

xold=xnew
yold=ynew

endif
 
readnum=readnum+1
endwhile

result=close(trajfil)

if(color=1)
colnum=colnum+1
if(colnum>15)
colnum=1
widnum=11-widnum
endif
endif
if(color=0)
widnum=widnum+2
if(widnum>10)
widnum=1
endif
endif

widnum=1

trajno=trajno+trajint
endwhile

'set ylopts 1'
'set xlpos 0 b'
'set ylpos 0 l'

***********************************************

***draw labels and title***

'set string 1 l 6'
'set strsiz 0.2'
'set parea 1 10 1 7.5'
tity=patb+0.3
'draw string 1.0 'tity' 'title

'set string 1 c 3'
'set strsiz 0.125'
xlabx=(pala+para)/2
xlaby=paba-0.35
'draw string 'xlabx' 'xlaby' longitude'
'set string 1 c 3 90'
ylabx=pala-0.75
ylaby=(paba+pata)/2
'draw string 'ylabx' 'ylaby' latitude'
zlabx=pala-0.75
zlaby=(pabb+patb)/2
'draw string 'zlabx' 'zlaby' z (km)'
'set string 1 c 3 0'
zlabx=(palb+parb)/2
zlaby=pata+0.35
'draw string 'zlabx' 'zlaby' z (km)'


