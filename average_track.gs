* Script to calculate average values in a box following another variable
* Author:  Brice Coffer, NCSU
* Last modified:  14 May 2014

*Enter data file (1=cm1out_s, 2=presretrieval)
filenum=2

*Enter variable that you want to track/place box around
trackvar = w

*Enter height of variable you want to track/place box around
tracklev = 2

*Track max/min of trackvar
trackstat=max

*Enter domain to restrict trackvar
lon1= 65
lon2= 105
lat1= 65
lat2= 105

*Enter size of box in km (must be greater than and a multiple of dx)
box = 20.0

*Enter average variable to output to text file
outputvar = dpdz

*Enter height of outputvar
*If outputvar = dpdz or dpbz, enter depth in km of of VPPGA integration (assumes bottom point is ~0km)
level = 1

*Enter grid-spacing in m
dx = 125.0

*Enter times to take mean
initialtime = 1
maxtime = 121
*If needed, enter timestep of first pressure retrieval combined into allpresretrievals.dat
t0pres=1

*****************************************************************
* END OF USER SETTINGS
*****************************************************************
*Current version created 022714 by Brice Coffer

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
'set lev 'tracklev
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

* calculate thpert if needed
if (outputvar=thpert)
'define thpert=th-th(t=1)'
'define thpert=maskout(thpert,0.0-thpert)'
endif

* calculate upward vertical velocity if needed
if (outputvar=winterp)
'define winterp=maskout(winterp,winterp-0.0)'
endif

* calculate positive accd if needed
if (outputvar=accd)
'define accd=maskout(accd,accd-0.0)'
endif

* calculate positive dynamic VPPGA if needed
if (outputvar=dpdz)
'q dims'
zlin  = sublin(result,4)
zwrd  = subwrd(zlin,9)
'define dpdz = (-1/rhobar)*(((pprt(z='zwrd+1')-pprt(z=1))-(pb(z='zwrd+1')-pb(z=1)))/(1000*(lev(z='zwrd+1')-lev(z=1))))'
'define dpdz = maskout(dpdz,dpdz-0.0)'
endif

* calculate positive buoyant VPPGA if needed
if (outputvar=dpbz)
'q dims'
zlin  = sublin(result,4)
zwrd  = subwrd(zlin,9)
'define dpbz = (-1/rhobar)*(((pb(z='zwrd+1')-pb(z=1)))/(1000*(lev(z='zwrd+1')-lev(z=1))))'
'define dpbz = maskout(dpbz,dpbz-0.0)'
endif

* calculate positive vertical stretching of vorticity if needed
* comment out set lev and d in wstrech script
if (outputvar=wstretch)
'/data/bricec/grads/wstretch.gs'
'define wstretch = maskout(wstretch,wstretch-0.0)'
endif
* calculate positive vertical tilting of vorticity if needed
* comment out set lev and d in wstrech script
if (outputvar=wtilt)
'/data/bricec/grads/wtilt.gs'
'define wtilt = maskout(wtilt,wtilt-0.0)'
endif

if (outputvar=div)
'/data/bricec/grads/divergence.gs'
endif

'set gxout shaded'
'c'
if (outputvar=div)
'/data/bricec/grads/color.gs -.1 .1 .01 -kind red->white->blue'
endif
'd 'outputvar
'/data/bricec/grads/cbarm.gs'

'd ave(ave('outputvar',lon='lonbox1',lon='lonbox2'),lat='latbox1',lat='latbox2')'

valuelin=sublin(result,lastlin)
value=subwrd(valuelin,4)
say
say 'Mean 'outputvar' = 'value
say '-----------------------------------------------'

data=write(outputvar'_average_'level'km.txt',value)

if (outputvar=thpert)
'undefine thpert'
endif
if (outputvar=winterp)
'undefine winterp'
endif
if (outputvar=accd)
'undefine accd'
endif
if (outputvar=dpdz)
*'undefine dpdz'
endif
if (outputvar=dpbz)
'undefine dpbz'
endif
if (outputvar=wstretch)
'undefine wstretch'
endif
if (outputvar=wtilt)
'undefine wtilt'
endif
if (outputvar=div)
'undefine div'
endif

sett=sett+1
endwhile



