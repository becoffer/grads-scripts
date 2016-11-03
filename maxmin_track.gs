* Script to calculate a maximum value in a box following another variable.
* Author:  Brice Coffer, NCSU
* Last modified:  14 May 2014

*Enter data file (1=cm1out_s, 2=presretrieval)
filenum=1

*Enter variable that you want to track/place box around
trackvar = zvort

*Enter height of variable you want to track/place box around
tracklev = 1

*Track max/min of trackvar
trackstat=max

*Enter domain to restrict trackvar
lon1= 70
lon2= 95
lat1= 70
lat2= 95

*Enter size of box in km (must be greater than and a multiple of dx)
box = 1.0

*Enter whether you desire max (1) or min (0) output to text file
max = 1

*Enter max/min variable output to text file
outputvar = zvort

*Enter height of outputvar
*If outputvar = dpdz dpbz, enter depth in km of of VPPGA integration (assumes bottom point is ~0km)
level = 0

*Enter grid-spacing in m
dx = 125.0

*Enter times to take max/min
initialtime = 52
maxtime = 52
*Enter timestep of first pressure retrieval combined into allpresretrievals.dat
t0pres=36

*****************************************************************
* END OF USER SETTINGS
*****************************************************************

*open file
'reinit'
if (filenum=1)
'open cm1out_s'
x1= lon1*1000/dx
x2= lon2*1000/dx
y1= lat1*1000/dx
y2= lat2*1000/dx
endif
if (filenum=2)
'open presretrieval.ctl'
preslonlin=sublin(result,3)
preslatlin=sublin(result,4)
preslon=subwrd(preslonlin,4)
preslat=subwrd(preslatlin,4)
lontrack1=lon1-preslon
lontrack2=lon2-preslon
lattrack1=lat1-preslat
lattrack2=lat2-preslat
initialtime=initialtime-t0pres+1
maxtime=maxtime-t0pres+1
x1= lontrack1*1000/dx
x2= lontrack2*1000/dx
y1= lattrack1*1000/dx
y2= lattrack2*1000/dx
endif
'set mproj off'

sett=initialtime
while(sett<=maxtime)
*
* find trackvar within box area (x1,x2), (y1,y2)...
*
'set x 'x1' 'x2
'set y 'y1' 'y2
'set z 'tracklev
'set t 'sett
if (filenum=2)
if (trackvar=zvort)
'define zvort = (cdiff(v,x) - cdiff(u,y)) / (2*'dx')'
endif
endif
'set x 'x1
'set y 'y1
'set gxout print'
nxp = x2-x1+1
nyp = y2-y1+1
'd 'trackstat'loc('trackstat'('trackvar',y='y1',y='y2'),x='x1',x='x2')'
if (filenum=1)
rec=sublin(result,nxp+3)
endif
if (filenum=2)
rec=sublin(result,nxp+2)
endif
xc=subwrd(rec,1)
'd 'trackstat'loc('trackstat'('trackvar',x='x1',x='x2'),y='y1',y='y2')'
if (filenum=1)
rec=sublin(result,nyp+3)
endif
if (filenum=2)
rec=sublin(result,nyp+2)
endif
yc=subwrd(rec,1)
say 'T='sett
say 'location of 'trackstat' 'trackvar'...'
say
say ' (xc,yc) = ('xc','yc')'
*
* find "world" coordinates of (xc,yc) and convert "world" coordinates
* to "xy" coordinates for plotting track of hurricane center...
*
      'set x 'xc
      lonval = subwrd(result,4)
      'set y 'yc
      latval = subwrd(result,4)
      say ' (lonval,latval) = ('lonval','latval')'
*

lonbox1=lonval-(box/2)
lonbox2=lonval+(box/2)
latbox1=latval-(box/2)
latbox2=latval+(box/2)

lastlin = 3 + (1000/dx) * math_abs(math_abs(latbox1) - math_abs(latbox2))

'set gxout shaded'
'set lon 'lonbox1' 'lonbox2
'set lat 'latbox1' 'latbox2
'set lev 'level

* calculate strech if needed, comment out set lev and d in script
if (outputvar=wstretch)
'/data/bricec/grads/wstretch.gs'
endif

* calculate wtilt if needed, comment out set lev and d in script
if (outputvar=wtilt)
'/data/bricec/grads/wtilt.gs'
endif

* calculate dynamic VPPGA if needed
if (outputvar=dpdz)
'q dims'
zlin  = sublin(result,4)
zwrd  = subwrd(zlin,9)
'dpdz = (-1/rhobar)*(((pprt(z='zwrd+1')-pprt(z=1))-(pb(z='zwrd+1')-pb(z=1)))/(1000*(lev(z='zwrd+1')-lev(z=1))))'
endif

* calculate buoyant VPPGA if needed
if (outputvar=dpbz)
'q dims'
zlin  = sublin(result,4)
zwrd  = subwrd(zlin,9)
'dpbz = (-1/rhobar)*(((pb(z='zwrd+1')-pb(z=1)))/(1000*(lev(z='zwrd+1')-lev(z=1))))'
endif

* calculate thpert if needed
if (outputvar=thpert)
'thpert=th-th(t=1)'
if (mask=1)
'define thpert=maskout(thpert,0.0-thpert)'
endif
endif

'set gxout shaded'
'c'
'd 'outputvar
'/data/bricec/grads/cbarm.gs'
if (max=1)
'd max(max('outputvar',lon='lonbox1',lon='lonbox2'),lat='latbox1',lat='latbox2')'
else
'd min(min('outputvar',lon='lonbox1',lon='lonbox2'),lat='latbox1',lat='latbox2')'
endif
valuelin=sublin(result,lastlin)
value=subwrd(valuelin,4)
say
say 'Max 'outputvar' = 'value
say '-----------------------------------------------'

if (max=1)
data=write(outputvar'_max_'level'km.txt',value)
else
data=write(outputvar'_min_'level'km.txt',value)
endif

sett=sett+1
endwhile


