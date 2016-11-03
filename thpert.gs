* Script to plot density potential temperature perturbation, winds, and dbz.
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
*'set clevs -9 -8 -7 -6 -5 -4 -3 -2 -1 0'
*'set ccols 9 14 4 11 5 13 3 7 8 2 6'
'/data/bricec/grads/color.gs -10 0 .05 -kind darkmagenta->darkslateblue->slateblue->steelblue->cyan->lawngreen->yellow->orange->red'
'/data/bricec/grads/thrho.gs'
'd thrho-thrho0'
*'/data/bricec/grads/cbarm.gs 1'
'/data/bricec/grads/xcbar.gs -fs 20 -lc 1'
if (wind=1)
'set gxout vector'
'set ccolor 0'
'set arrscl .25 15'
'd skip(uinterp,'skip','skip');vinterp'
endif
'set gxout contour'
'set cthick 20'
'set cstyle 3'
'set ccolor 1'
'set clevs 20'
'set csmooth on'
'd dbz'
'set cmin .05'
'set cint .01'
'set cthick 12'
'set ccolor 15'
'/data/bricec/grads/ow.gs'
'd ow'
'draw title VORTEX2 Non-tornadic: `3z`b`3r`0`n deficit, 20dBZ, Surface Vortex'
'draw string 5.5 0.5 density potential temperature perturbation (K)'
'draw xlab x (km)'
'draw ylab y (km)'
