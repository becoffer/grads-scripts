* Script to plot composite values in a box following another variable.
* Author:  Brice Coffer, NCSU
* Last major modified: 6 July 2015

* Enter variable that you want to track/place box around
trackvar = winterp

* Enter height of variable you want to track/place box around
tracklev = 6.0

* Enter track max/min
trackstat=max

* Enter domain to restrict trackvar
lon1= 85
lon2= 105
lat1= 90
lat2= 110

* Enter size of composite box in km (must be greater than and a multiple of dx)
box = 40.0

* Enter composite variable output to plot
outputvar = pv

* Enter height of outputvar
level =  6.01

* Enter grid-spacing in m
dx = 500.0

* Enter simulation umove,vmove in m/s
umove = 12.5
vmove = 3.0

* Enter title and label string and image name
titlestring = 'Composite Potential Vorticity @ 6 km'
labelstring = 'potential vorticity (K m2 kg-1 s-1)'
imagename = 'composite_torV2'

* Print image? 1=yes 0=no
print = 0

* Enter desired time frame from cm1out
initialtime =101
maxtime = 121

*****************************************************************
* END OF USER SETTINGS
*****************************************************************

*open file
'reinit'
'set display color white'
'open cm1dump'
'd th'
'c'
'set mproj off'

* get x & y points
'set lon 'lon1
'q dims'
rec=sublin(result,2)
x1=subwrd(rec,9)
x1=math_int(x1)
'set lon 'lon2
'q dims'
rec=sublin(result,2)
x2=subwrd(rec,9)
x2=math_int(x2)
'set lat 'lat1
'q dims'
rec=sublin(result,3)
y1=subwrd(rec,9)
y1=math_int(y1)
'set lat 'lat2
'q dims'
rec=sublin(result,3)
y2=subwrd(rec,9)
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
say 'location of 'trackstat' 'trackvar' @ 'tracklev' km...'
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

* get dimensions of 2x desired box centered on max/min trackvar
lonbox1=lonval-box
lonbox2=lonval+box
latbox1=latval-box
latbox2=latval+box

'set lon 'lonbox1' 'lonbox2
'set lat 'latbox1' 'latbox2
'set lev 'level

* add up composite in 2x box centered on max/min trackvar
if(sett=initialtime)
if (outputvar=thpert)
'thpert=th-th(t=1)'
'thpert=th-306.31'
*'thpert=th-308.224'
endif
if (outputvar=thrhopert)
*'/data/bricec/grads/thrho.gs'
'define thrho=th*((1+(qv/0.622))/(1+(qv+qr+qg+qhl)))'
*'define thrho0=306.31*((1+(0.0138797/0.622))/(1+(0.0138797)))'
'define thrho0=308.224*((1+(0.0117235/0.622))/(1+(0.0117235)))'
'thrhopert = thrho-thrho0'
endif
if (outputvar=conv)
'/data/bricec/grads/conv.gs'
endif
if (outputvar=pv2)
'/data/bricec/grads/pv.gs'
endif

'define compvar='outputvar

'set z 1'
'define compdbz=dbz'
'define compzvort=zvort'
'define compuinterp=uinterp'
'define compvinterp=vinterp'
'set lev 1.0'
'define compwinterp=winterp'
'set lev 'level
else
if (outputvar=thpert)
*'thpert=th-th(t=1)'
'thpert=th-306.31'
*'thpert=th-308.224'
endif
if (outputvar=thrhopert)
*'/data/bricec/grads/thrho.gs'
'define thrho=th*((1+(qv/0.622))/(1+(qv+qr+qg+qhl)))'
*'define thrho0=306.31*((1+(0.0138797/0.622))/(1+(0.0138797)))'
'define thrho0=308.224*((1+(0.0117235/0.622))/(1+(0.0117235)))'
'thrhopert = thrho-thrho0'
endif
if (outputvar=conv)
'/data/bricec/grads/conv.gs'
endif
if (outputvar=pv2)
'/data/bricec/grads/pv.gs'
endif

'define compvar='outputvar'+compvar'
'set z 1'
'define compdbz=dbz+compdbz'
'define compzvort=zvort+compzvort'
'define compuinterp=uinterp+compuinterp'
'define compvinterp=vinterp+compvinterp'
'set lev 1.0'
'define compwinterp=winterp+compwinterp'
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
say 'location of 'trackstat' composite 'trackvar' @ 'tracklev' km...'
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
'define compdbz=compdbz/('initialtime-maxtime'+1)*-1'
'define compuinterp=compuinterp/('initialtime-maxtime'+1)*-1'
'define compvinterp=compvinterp/('initialtime-maxtime'+1)*-1'
'define compwinterp=compwinterp/('initialtime-maxtime'+1)*-1'
'define compzvort=compzvort/('initialtime-maxtime'+1)*-1'

* set color scale
'set gxout shaded'
*if (outputvar=qr)
*'/data/bricec/grads/color.gs 5e-6 5.5e-5 2.5e-7 -kind white->purple->blue->teal->green->yellow->red->darkred->magenta'
*endif
if (outputvar=dbz)
'/data/bricec/grads/color.gs 20 70 .25 -kind nowrad'
endif
if(outputvar=winterp)
'/data/bricec/grads/color.gs -10 10 .1 -kind BrBG'
endif
if(outputvar=thpert | outputvar=thrhopert)
'/data/bricec/grads/color.gs -10 0 .05 -kind darkmagenta->darkslateblue->slateblue->steelblue->cyan->lawngreen->yellow->orange->red'
*'/data/bricec/grads/rgb_temp.gs'
endif
if(outputvar=zvort)
'/data/bricec/grads/color -.02 .02 .0002 -kind BuRd'
endif
if(outputvar=pv)
'/data/bricec/grads/color -1e-4 1e-4 1e-6 -kind PuOj'
endif
if(outputvar=pv2)
'/data/bricec/grads/color -1e-4 1e-4 1e-6 -kind PuOj'
endif
if(outputvar=conv)
'/data/bricec/grads/color -0.015 0.015 0.00015 -kind BuRd'
endif
* plot compvar
'd compvar'
*'/data/bricec/grads/xcbar.gs -fs 40 -lc 1'
'/data/bricec/grads/cbarm.gs'

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
'set rgb 16 75 150 0'
'set ccolor 16' 
'set clevs  10'
'd compwinterp'
endif

* plot 20dbz outline
if (outputvar!= dbz)
'set cthick 12'
'set ccolor 1'
'set clevs 10'
'd compdbz'
endif

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




