* Script to plot vertical velocity, wind vectors, and vertical vorticity.
* Author:  Brice Coffer, NCSU
* Last modified:  12 Mar 2014

prompt 'Plot wind vectors? 1=yes 0=no  '
pull wind
if (wind=1)
prompt 'How many wind vectors do you want to skip?   '
pull skip
endif
'c'
'set datawarn off'
'set mproj off'
'set grads off'
'set clab off'
'set arrlab on'
'set parea 1 10 2 8'
'set gxout shaded'
'/data/bricec/grads/color.gs -20 20 .2 -kind bluered'
'd winterp'
*'/data/bricec/grads/cbarm.gs 1'
'/data/bricec/grads/xcbar.gs -fs 25 -lc 1'
if (wind=1)
'set gxout vector'
'set ccolor 1'
'set arrscl .25 15'
'd skip(uinterp(z=1),'skip','skip');vinterp(z=1)'
endif
'set gxout contour'
'set cthick 20'
'set cstyle 3'
'set ccolor 1'
'set clevs 20'
'set csmooth on'
'd dbz(z=1)'
'set cmin .05'
'set cint .01'
'set cthick 12'
'set ccolor 15'
'/data/bricec/grads/ow.gs'
'd ow'
'draw title VORTEX2 Tornadic: W, 20dBZ, Surface Vortex'
'draw string 5.5 0.5 vertical velocity (m/s)'
'draw xlab x (km)'
'draw ylab y (km)'
