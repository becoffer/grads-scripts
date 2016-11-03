* Script to animate custom CM1 fields slowly
* Author:  Brice Coffer, NCSU
* Last modified:  14 May 2014

* open file
'reinit'
'open cm1out_s'
'set display color white'

*Enter variable 1 (shaded)
var1 = pv2
*Height of variable 1
lev1 = 6.01

*Enter variable 2 (contoured white)
var2 = dbz
*Height of variable 2
lev2 = 0.01

*Enter variable 3 (contoured black)
var3 = 1
*Height of variable 3
lev3 = 0.01

*Enter title string
*titlestring = 'VORTEX2 Tornadic: `3z`b`3r`0`n deficit, 20dBZ, Surface Vortex'
*titlestring = 'VORTEX2 Tornadic: Vertical Vorticity, 20dBZ, Surface Vortex'
titlestring = 'PV and winds @ 6 km, 20dBZ @ 10 m'
*Print? 1=yes 0=no
print = 1
gif = 0

* enter final time to display
initialtime = 51
maxtime = 100
*enter timestep for labeling purposes
dt = 60

* enter domain (km)
lon1 = 70
lon2 = 130
lat1 = 70
lat2 = 130

*****************************************************************
* END OF USER SETTINGS
*****************************************************************
* Current version created 022713 by Brice Coffer
* Only modify what you see below if you want to customize your plots'
'c'
'set datawarn off'
'set mproj off'
'set grads off'
'set string 1 c 5 0'
'set parea 1 10 2 8'

prompt 'Plot wind vectors? 1=yes 0=no  '
pull wind
if (wind=1)
prompt 'How many wind vectors do you want to skip?   '
pull skip
endif

sett=initialtime
time=(initialtime-2)*dt
while(sett<=maxtime)
'set t 'sett
label=sett + 100
if (sett=1)
time = 0
else
time = time + dt
endif

*plot variable 1
'set lon 'lon1' 'lon2
'set lat 'lat1' 'lat2
'set gxout shaded'
'set lev 'lev1
'c'
'set datawarn off'
'set grads off'
*'set grid off'
*'set frame off'
*'set xlab off'
*'set ylab off'
*'set annot 0'
if (var1=dbz) 
*'/data/bricec/grads/dbz.gs'
'/data/bricec/grads/nowrad.gs'
endif
if (var1=winterp)
'/data/bricec/grads/color -10 45 .275 -kind grainbow'
endif
if (var1=thpert)
*'set clevs -9 -8 -7 -6 -5 -4 -3 -2 -1 0'
*'set ccols 9 14 4 11 5 13 3 7 8 2 6'  
'/data/bricec/grads/color.gs -5 0 .025 -kind darkmagenta->darkslateblue->slateblue->steelblue->cyan->lawngreen->yellow->orange->red'
*'thpert = th-th(t=1)'
*'thpert = th-306.31'
'thpert = th-308.224'
endif
if (var1=th)
'set clevs 318 320 322 324 326 328 330 332 334'
endif 
if (var1=mptend)
'set clevs -.1 -.05 0 0.05 .1 .15 .2 .25 .3'
endif
if (var1=thrhopert)
*'/data/bricec/grads/thrho.gs'
'define thrho=th*((1+(qv/0.622))/(1+(qv+qhyd)))'
'define thrho0=306.31*((1+(0.0138797/0.622))/(1+(0.0138797)))'
*'define thrho0=308.224*((1+(0.0117235/0.622))/(1+(0.0117235)))'
*'/data/bricec/grads/color.gs -5 0 .025 -kind darkmagenta->slateblue->steelblue->cyan->lawngreen->yellow->red'
'/data/bricec/grads/rgb_temp.gs'
'thrhopert = thrho-thrho0'
endif
if (var1=zvort)
'/data/bricec/grads/color -0.02 0.02 .0002 -kind BuRd'
endif
if (var1=pv | var1=pv2)
'/data/bricec/grads/pv.gs'
'/data/bricec/grads/color -1e-4 1e-4 1e-6 -kind PuOj'
endif
if (var1=dpdz)
'q dims'
zlin  = sublin(result,4)
zwrd  = subwrd(zlin,9)
'/data/bricec/grads/color -0.3 0.3 0.003 -kind PuOj'
'dpdz = (-1/rhobar)*(((pprt(z='zwrd+1')-pprt(z=1))-(pb(z='zwrd+1')-pb(z=1)))/(1000*(lev(z='zwrd+1')-lev(z=1))))'
endif
xaxis=lon2-lon1
yaxis=lat2-lat1
'set xaxis 0 'xaxis' 5'
'set yaxis 0 'yaxis' 5'
'd smth9('var1')'
if (var1=uh)
* only works with updrafthelicity.gs option 1
* must comment out reinit, open, set t, cbarm.gs, etc
'/data/bricec/grads/updrafthelicity.gs'
endif
'/data/bricec/grads/cbarm.gs 1'
*'/data/bricec/grads/xcbar.gs -fs 25 -lc 1'

*plot variable 2
'set gxout contour'
'set clab off'
'set lev 'lev2
if (var2=zvort)
*'/data/bricec/grads/zvort.gs'
'set cmin .08'
'set cint .02'
endif
if (var2=dbz)
*'open cm1dump'
*'set dfile 2'
*'set t 'sett-30
'set clevs 10'
'set cthick 10'
endif
if (var2=winterp)
'set clab off'
'set cthick 10'
'set clevs 20'
endif
'set ccolor 1'
'd 'var2
*'close 2'

*plot variable 3
'set lev 'lev3
if (var3=dbz)
*'/data/bricec/grads/dbz.gs'
'set cmin 5'
'set cint 20'
endif
if (var3=zvort)
'set cmin .1'
'set cint .02'
'set cthick 12'
'/data/bricec/grads/zvort.gs'
endif
if (var3=ow)
'set cmin .05'
'set cint .01'
'/data/bricec/grads/ow.gs'
'/data/bricec/grads/color.gs .05 .1 .00025 -gxout contour -kind darkslategray->darkslategray'
'set cthick 12'
'set csmooth on'
endif
*'set ccolor 15'
'd 'var3

if (wind=1)
'set gxout vector'
'set ccolor 1'
'set cthick 4'
'set arrscl .25 15'
'set lev 'lev1
'd skip(uinterp,'skip','skip');vinterp'
endif

*draw title & axes
'draw title 'titlestring '  n='sett
*'draw title 'titlestring
*'draw string 5.5 0.5 reflectivity (~dbz)'
*'draw string 5.5 0.5 vorticity (1/s)'
*'draw string 5.5 0.5 density potential temperature deficit (K)'
'draw xlab x (km)'
'draw ylab y (km)'

*delay looping
*'!sleep 0.5'

*print out images if required
if (print=1)
'print -o 'var1 label'.eps'
'!convert +antialias -density 300 'var1 label'.eps 'var1 label'.gif'
'!rm 'var1 label'.eps'
endif

sett=sett+1
endwhile

*create loop if required
if (gif=1)
'!convert +antialias -loop 0 -density 300 -delay 75 -dispose Background 'var1'*.gif 'var1'_loop.gif'
'!rm 'var1'[1-9]*.gif'
endif







