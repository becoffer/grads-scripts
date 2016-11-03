* Script to plot composite values in a box following another variable.
* Author:  Brice Coffer, NCSU
* Last major modified: 6 July 2015

* Enter variable that you want to track/place box around
trackvar = w

* Enter height of variable you want to track/place box around
tracklev = 6.0

* Enter track max/min
trackstat=max

* Enter domain to restrict trackvar
lon1= 20
lon2= 40
lat1= 20
lat2= 40

* Enter size of composite box in km (must be greater than and a multiple of dx)
box = 40.0

* Enter composite variable output to plot
outputvar = dpdz

* Enter height of outputvar
level = 1.01

* Enter grid-spacing in m
dx = 125.0

* Enter simulation umove,vmove in m/s
umove = 9.5
vmove = -0.5

* Enter title and label string and image name
titlestring = 'Composite 0-1 km Dynamic Lifting - VORTEX2 Tornadic'
labelstring = 'acceleration (m/s2)'
imagename = 'composite_torV2'

* Print image? 1=yes 0=no
print = 0

* Enter desired time frame from cm1out
initialtime = 43
maxtime = 58

*****************************************************************
* END OF USER SETTINGS
*****************************************************************

*open file
'reinit'
'set display color white'
'open allpresretrievals'
'd w'
'c'
'set mproj off'

* get x & y points
x1= lon1*1000/dx
x1=math_int(x1)
x2= lon2*1000/dx
x2=math_int(x2)
y1= lat1*1000/dx
y1=math_int(y1)
y2= lat2*1000/dx
y2=math_int(y2)

* get commonly used time variables
nt=maxtime-initialtime+1
midt=initialtime+(maxtime-initialtime)/2

* time loop
sett=initialtime
while(sett<=maxtime)

* find trackvar within box area (x1,x2), (y1,y2)...
'set lev 'tracklev
'set t 'sett
'set x 'x1
'set y 'y1
'set gxout print'
nxp = x2-x1+1
nyp = y2-y1+1
'd 'trackstat'loc('trackstat'('trackvar',y='y1',y='y2'),x='x1',x='x2')'
rec=sublin(result,nxp+3)
xc=subwrd(rec,1)
'd 'trackstat'loc('trackstat'('trackvar',x='x1',x='x2'),y='y1',y='y2')'
rec=sublin(result,nyp+3)
yc=subwrd(rec,1)
say 'T='sett
say 'location of 'trackstat' 'trackvar'...'
say
say ' (xc,yc) = ('xc','yc')'

* find "world" coordinates of (xc,yc) and convert "world" coordinates
* to "xy" coordinates for plotting purposes...
      'set x 'xc
      lonval = subwrd(result,4)
      'set y 'yc
      latval = subwrd(result,4)
      say ' (lonval,latval) = ('lonval','latval')'
*

* get dimensions of 1.5x desired box centered on max/min trackvar
lonbox1=lonval-(box*0.75)
lonbox2=lonval+(box*0.75)
latbox1=latval-(box*0.75)
latbox2=latval+(box*0.75)

'set lon 'lonbox1' 'lonbox2
'set lat 'latbox1' 'latbox2
'set lev 'level

* add up composite in 1.5x box centered on max/min trackvar
if(sett=initialtime)
if (outputvar=dpdz)
'q dims'
zlin  = sublin(result,4)
zwrd  = subwrd(zlin,9)
*'dpdz = (-1/rhobar)*(((pprt(z='zwrd+1')-pprt(z=1))-(pb(z='zwrd+1')-pb(z=1)))/(1000*(lev(z='zwrd+1')-lev(z=1))))'
'dpdz = dnlpvpga(z='zwrd') - dnlpvpga(z=1)'
endif

'define compvar='outputvar

'set z 1'
*'define compdbz=dbz.2'
*'define compzvort=zvort.2'
'define compuinterp=u'
'define compvinterp=v'
'set lev 1.0'
'define compwinterp=w'

'set t 'sett
'set lev 'level

else
if (outputvar=dpdz)
'q dims'
zlin  = sublin(result,4)
zwrd  = subwrd(zlin,9)
'dpdz = (-1/rhobar)*(((pprt(z='zwrd+1')-pprt(z=1))-(pb(z='zwrd+1')-pb(z=1)))/(1000*(lev(z='zwrd+1')-lev(z=1))))'
endif

'define compvar='outputvar'+compvar'

'set z 1'
*'define compdbz=dbz.2+compdbz'
*'define compzvort=zvort.2+compzvort'
'define compuinterp=u+compuinterp'
'define compvinterp=v+compvinterp'
'set lev 1.0'
'define compwinterp=w+compwinterp'

'set t 'sett
'set lev 'level
endif

sett=sett+1
endwhile

* find max compwinterp within box area (x1,x2), (y1,y2)...
'set x 'x1
'set y 'y1
'set gxout print'
nxp = x2-x1+1
nyp = y2-y1+1
'd 'trackstat'loc('trackstat'(compwinterp,y='y1',y='y2'),x='x1',x='x2')'
rec=sublin(result,nxp+3)
xc=subwrd(rec,1)
'd 'trackstat'loc('trackstat'(compwinterp,x='x1',x='x2'),y='y1',y='y2')'
rec=sublin(result,nyp+3)
yc=subwrd(rec,1)
say '************************************' 
say 'location of 'trackstat' composite winterp @ 1km...'
say
say ' (xc,yc) = ('xc','yc')'

* find "world" coordinates of (xc,yc) and convert "world" coordinates
* to "xy" coordinates for plotting purposes...
      'set x 'xc
      lonval = subwrd(result,4)
      'set y 'yc
      latval = subwrd(result,4)
      say ' (lonval,latval) = ('lonval','latval')'

* plot composite variable
'set parea 1 10 2 8'
halfbox=box/2
lonbox1=lonval-halfbox
lonbox2=lonval+halfbox
latbox1=latval-halfbox
latbox2=latval+halfbox
'set lon 'lonbox1' 'lonbox2
'set lat 'latbox1' 'latbox2

*redefine axis to be centered upon max compdbz
axis1=(halfbox*-1)
axisint=(halfbox/2)
'set xaxis 'axis1' 'halfbox' 'axisint
'set yaxis 'axis1' 'halfbox' 'axisint

* divide compvar by number of timesteps
'define compvar=compvar/('initialtime-maxtime'+1)*-1'
*'define compdbz=compdbz/('initialtime-maxtime'+1)*-1'
'define compuinterp=compuinterp/('initialtime-maxtime'+1)*-1'
'define compvinterp=compvinterp/('initialtime-maxtime'+1)*-1'
'define compwinterp=compwinterp/('initialtime-maxtime'+1)*-1'
*'define compzvort=compzvort/('initialtime-maxtime'+1)*-1'

* set color scale
'set gxout shaded'
if(outputvar=accd | outputvar=dpdz)
'/data/bricec/grads/color.gs -0.4 0.4 0.004 -kind BrBG'
endif
if(outputvar=accb)
'/data/bricec/grads/color.gs -0.05 0.05 0.0005 -kind BrBG'
endif
* plot compvar
'd compvar'
'/data/bricec/grads/xcbar.gs -fs 25 -lc 1'

* plot ground-relative wind vectors
'set gxout vector'
'set arrscl .25 15'
'set ccolor 1'
*'d skip(compuinterp+'umove',10,10);compvinterp+'vmove
*'d skip(compuinterp,10,10);compvinterp'

* plot winterp outline at 1 km
'set gxout contour'
'set grid off'
'set clab off'
if (outputvar!=winterp)
'set cthick 12'
'set rgb 16 45 181 104'
'set ccolor 16' 
'set clevs  10'
'd compwinterp'
endif

* plot 20dbz outline
'set cthick 12'
'set ccolor 1'
'set clevs 20'
*'d compdbz'

* plot .005s-1 outline at sfc
*'set cstyle 1'
*'set ccolor 15'
*'set clevs .05'
*'d compzvort'

'draw title 'titlestring
'draw string 5.5 0.5 'labelstring

*print out images if required
if (print=1)
	'print -o 'imagename'_'outputvar'.eps'
endif




