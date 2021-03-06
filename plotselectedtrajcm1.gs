***SEARCH FOR AND PLOT ONLY TRAJECTORIES WITHIN A GIVEN SPACE/TIME WINDOW***
***these have physical units (seconds, meters)
twindowmin=1
twindowmax=2700
xwindowmin=-60000
xwindowmax=60000
ywindowmin=-40000
ywindowmax=40000
zwindowmin=0
zwindowmax=7000

***times to plot (seconds)***
timebegin=9900
timeend=12600

***time interval in the data file (for conversion to times in seconds)***
dtreal=60

***physical dimensions for the 3-D plot space***
lona=-60 
lonb=60
lata=-60  
latb=60
leva=0
levb=15000

***first trajectory file to plot***
firsttraj=1

***maximum number of trajectories (last trajectory will be trajone+numtraj-1)**
totaltraj=1000 

***interval between trajectories (plot a subset of every n-th traj)***
trajint=1

******'<------------title to draw at top of plot---------------->'***
title='RANDOM TITLE STRING'

***mark a specific time on the plot?  which time (in seconds)?***
markon=0
mrktim=9900
markstart=0

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

tbegin=1+(timebegin/dtreal)
tend=1+(timeend/dtreal)

**************************************************

'reinit'
'c'
'set mpdraw off'
'set grads off'

**************************************************

***start the loops of 40 trajectories (any more causes seg faults)***
fortycount=0
numforties=1+math_int((totaltraj-1)/40)

while(fortycount<numforties)
trajone=firsttraj+40*fortycount
numtraj=40 

******'<------------title to draw at top of plot---------------->'***
**************************************************

***figure out which trajectories are in our window***

'open cm1out_pdata.ctl'
trajno=trajone

while(trajno<trajone+numtraj)

hit.trajno=0
'set x 'trajno

readnum=tbegin
while(readnum<tend)

if(hit.trajno=0)
'set t 'readnum

time=dtreal*(readnum)
'd x'
vlin=sublin(result,1)
xloc=subwrd(vlin,4)
'd y'
vlin=sublin(result,1)
yloc=subwrd(vlin,4)
'd z'
vlin=sublin(result,1)
zloc=subwrd(vlin,4)

if(time>=twindowmin)
if(time<=twindowmax)
if(xloc>=xwindowmin)
if(xloc<=xwindowmax)
if(yloc>=ywindowmin)
if(yloc<=ywindowmax)
if(zloc>=zwindowmin)
if(zloc<=zwindowmax)
hit.trajno=1
say 'traj#'trajno' hits!'
endif
endif
endif
endif
endif
endif
endif
endif

endif

readnum=readnum+1
endwhile

trajno=trajno+trajint
endwhile

'close 1'

**************************************************

***draw the x vs. y plot***

'open cm1out_s.ctl'
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
'd u*0'

'close 1'
'open cm1out_pdata.ctl'

colnum=1
widnum=1
if(color=1)
widnum=3
endif

trajno=trajone

while(trajno<trajone+numtraj)

if(hit.trajno=1)

'set x 'trajno

xold=123456789

readnum=tbegin
while(readnum<tend)

'set t 'readnum

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

time=dtreal*(readnum)
'd x'
vlin=sublin(result,1)
xloc=subwrd(vlin,4)
'd y'
vlin=sublin(result,1)
yloc=subwrd(vlin,4)
'd z'
vlin=sublin(result,1)
zloc=subwrd(vlin,4)

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
*say foo
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

readnum=readnum+1
endwhile

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

endif

trajno=trajno+trajint
endwhile

'close 1'

*********************************************

***draw the x vs. z plot***

'open cm1out_s.ctl'
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
'd u*0'

'close 1'
'open cm1out_pdata.ctl'

colnum=1
widnum=1
if(color=1)
widnum=3
endif

trajno=trajone

while(trajno<trajone+numtraj)

if(hit.trajno=1)

'set x 'trajno

xold=123456789

readnum=tbegin
while(readnum<tend)

'set t 'readnum

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

time=dtreal*(readnum)
'd x'
vlin=sublin(result,1)
xloc=subwrd(vlin,4)
'd y'
vlin=sublin(result,1)
yloc=subwrd(vlin,4)
'd z'
vlin=sublin(result,1)
zloc=subwrd(vlin,4)

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

*say 'GOT HERE 'readnum

readnum=readnum+1
endwhile

*say 'Got Here'

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

*say 'got here'

endif

trajno=trajno+trajint
endwhile

*say 'got here'

'close 1'

'set xlopts 1'
'set xlpos 0 b'
'set ylpos 0 r'

*********************************************

***draw the y vs. z plot***

*say 'got here'

'open cm1out_s.ctl'
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
'd u*0'

'close 1'
'open cm1out_pdata.ctl'

colnum=1
widnum=1
if(color=1)
widnum=3
endif

trajno=trajone

while(trajno<trajone+numtraj)

if(hit.trajno=1)

'set x 'trajno

xold=123456789

readnum=tbegin
while(readnum<tend)

'set t 'readnum

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

time=dtreal*(readnum)
'd x'
vlin=sublin(result,1)
xloc=subwrd(vlin,4)
'd y'
vlin=sublin(result,1)
yloc=subwrd(vlin,4)
'd z'
vlin=sublin(result,1)
zloc=subwrd(vlin,4)

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
*say foo
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

readnum=readnum+1
endwhile

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

endif

trajno=trajno+trajint
endwhile

'set ylopts 1'
'set xlpos 0 b'
'set ylpos 0 l'

fortycount=fortycount+1
endwhile



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
'draw string 'xlabx' 'xlaby' x (km)'
'set string 1 c 3 90'
ylabx=pala-0.55
ylaby=(paba+pata)/2
'draw string 'ylabx' 'ylaby' y (km)'
zlabx=pala-0.55
zlaby=(pabb+patb)/2
'draw string 'zlabx' 'zlaby' z (km)'
'set string 1 c 3 0'
zlabx=(palb+parb)/2
zlaby=pata+0.35
'draw string 'zlabx' 'zlaby' z (km)'


