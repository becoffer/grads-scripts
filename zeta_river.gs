* Script to plot various vertical vorticity plots described below.
* Author:  Brice Coffer, NCSU
* Last modified:  14 May 2014

* enter options to display
* 1 = surface vertical vorticity (shaded), 20dbz reflectivity contour (black), -.5K density Theta perturbation contour (purple), and surface velocity vectors
* 2 = surface vertical vorticity (zoom shaded), -5m/s downdraft contour @ 1km (black), -.5K density Theta perturbation contour (purple), and surface velocity vectors
* 3 = surface vertical vorticity (shaded), 20dbz reflectivity contour (black), 10m/s updraft contour @ 1km (magenta), and surface velocity vectors
* 4 = same as 3, except surface vertical vorticity zoom shaded (as in 2)
* 5 = surface vertical vorticity (shaded), 20dbz reflectivity contour (black), 10 m/s updraft contour @ 1km (magenta), -.5K density Theta perturbation contour (purple), Obkubu-Weiss parameter (gray blob), and surface velocity (vectors white)
* 6 = same as 5, except surface vertical vorticity zoom shaded (as in 4)
display=2

*Enter domain
lon1=65
lon2=90 
lat1=65
lat2=90

* loop? 1=yes, 0-no 
loop=0
* enter first time (or only time) to display
initialtime=40
* if looping, enter final time to display
maxtime=61

* print? 1=yes, 0=no
print=0

'reinit'
'open cm1out_s'
'set datawarn off'
'set grads off'
'set mproj off'
'set parea 1 10 2 8'
'set display color white'
'd th'
'c'

*************************************** 
************** Display 1 **************
***************************************

if (display=1)
if (loop=0)
'c'
'set t 'initialtime
'q dims'
xlin  = sublin(result,2)
xwrd  = subwrd(xlin,8)
ylin  = sublin(result,3)
ywrd  = subwrd(ylin,8)
'set lon 0 'xwrd
'set lat 0 'ywrd

'/data/bricec/grads/color -20 20 1 -kind blue->green->yellow->red'
'/data/bricec/grads/zvort.gs'
'set lon 'lon1' 'lon2
'set lat 'lat1' 'lat2
'set z 1'
'd  1E2 * zvort'
'/data/bricec/grads/cbarm.gs'
'draw string 5.5 0.5 Vertical Vorticity 1E2 (s^-1)'

'set gxout contour'
'set clab off'
'set cthick 12'
'set ccolor 1'
'set clevs 20'
'd dbz'

'set cthick 12'
'set ccolor 14'
'set clevs -.5'
'set cstyle 1'
'set csmooth on'
'/data/bricec/grads/thrho.gs'
'd thrho-thrho0'

'set gxout vector'
'set ccolor 0'
'set cthick 5'
'set arrscl .25 25'
'd skip(uinterp,5,5);vinterp'

'draw xlab x(km)'
'draw ylab y(km)'
*Enter title string 
titlestring = '`3f`0`bsfc`n , 20dBZ, 0.5K `3z`b`3r`0`n'
'draw title 'titlestring

*print out images if required
if (print=1)
'printim zeta_river'sett'.png'
endif
endif

********************************************* 
************** Display 1 Loop  **************
*********************************************

if (loop=1)
sett=initialtime
while(sett<=maxtime)
*'c'
'set t 'sett
'q dims'
zlin1  = sublin(result,2)
zwrd1  = subwrd(zlin1,8)
zlin2  = sublin(result,3)
zwrd2  = subwrd(zlin2,8)
'set lon 0 'zwrd1
'set lat 0 'zwrd2

'/data/bricec/grads/color -20 20 1 -kind blue->green->yellow->red'
'/data/bricec/grads/zvort.gs'
'set lon 'lon1' 'lon2
'set lat 'lat1' 'lat2
'set z 1'
'd  1E2 * zvort'
'/data/bricec/grads/cbarm.gs'
'draw string 5.5 0.5 Vertical Vorticity 1E2 (s^-1)'

'set gxout contour'
'set clab off'
'set cthick 12'
'set ccolor 1'
'set clevs 20'
'd dbz'

'set cthick 12'
'set ccolor 14'
'set clevs -.5'
'set cstyle 1'
'set csmooth on'
'/data/bricec/grads/thrho.gs'
'd thrho-thrho0'

'set gxout vector'
'set ccolor 0'
'set cthick 5'
'set arrscl .25 25'
'd skip(uinterp,5,5);vinterp'

'draw xlab x(km)'
'draw ylab y(km)'
*Enter title string 
titlestring = '`3f`0`bsfc`n , 20dBZ, 0.5K `3z`b`3r`0`n'
'draw title 'titlestring

*print out images if required
if (print=1)
'printim zeta_river'sett'.png'
endif

'!sleep .5'

sett=sett+1
endwhile
endif
endif

***************************************
************** Display 2 **************
***************************************

if (display=2)
if (loop=0)
'c'
'set t 'initialtime
'q dims'
zlin1  = sublin(result,2)
zwrd1  = subwrd(zlin1,8)
zlin2  = sublin(result,3)
zwrd2  = subwrd(zlin2,8)
'set lon 0 'zwrd1
'set lat 0 'zwrd2

'/data/bricec/grads/color -20 20 1 -kind blue->green->yellow->red'
'/data/bricec/grads/zvort.gs'
'set lon 'lon1' 'lon2
'set lat 'lat1' 'lat2
'set z 1'
'd  1E3 * zvort'
'/data/bricec/grads/cbarm.gs'
'draw string 5.5 0.5 Vertical Vorticity 1E3 (s^-1)'

'set gxout contour'
'set clab off'
'set cthick 12'
'set ccolor 1'
'set clevs -5'
'set cstyle 1'
'set lev 1'
'd winterp'

'set cthick 15'
'set ccolor 14'
'set clevs -.5'
'set cstyle 1'
'set csmooth on'
'set z 1'
'/data/bricec/grads/thrho.gs'
'd thrho-thrho0'

'set cmin 0.05'
'set cint 0.01'
'set ccolor 15'
'/data/bricec/grads/ow.gs'
'd ow'

'set gxout vector'
'set ccolor 0'
'set cthick 5'
'set arrscl .25 25'
'd skip(uinterp,5,5);vinterp'

'draw xlab x(km)'
'draw ylab y(km)'
*Enter title string 
titlestring = '`3f`0`bsfc`n , 20dBZ, 0.5K `3z`b`3r`0`n, -3 m/s W`b 1km`n, and Surface Vortex'
'draw title 'titlestring
 
*print out images if required
if (print=1)
'printim zeta_river'sett'_zoom.png'
endif
endif

********************************************* 
************** Display 2 Loop  **************
*********************************************

if (loop=1)
sett=initialtime
while(sett<=maxtime)
*'c'
'set t 'sett
'q dims'
zlin1  = sublin(result,2)
zwrd1  = subwrd(zlin1,8)
zlin2  = sublin(result,3)
zwrd2  = subwrd(zlin2,8)
'set lon 0 'zwrd1
'set lat 0 'zwrd2

'/data/bricec/grads/color -20 20 1 -kind blue->green->yellow->red'
'/data/bricec/grads/zvort.gs'
'set lon 'lon1' 'lon2
'set lat 'lat1' 'lat2
'set z 1'
'd  1E3 * zvort'
'/data/bricec/grads/cbarm.gs'
'draw string 5.5 0.5 Vertical Vorticity 1E3 (s^-1)'

'set gxout contour'
'set clab off'
'set cthick 12'
'set ccolor 1'
'set clevs -5'
'set cstyle 1'
'set lev 1'
'd winterp'

'set cthick 12'
'set ccolor 14'
'set clevs -.5'
'set cstyle 1'
'set csmooth on'
'set z 1'
'/data/bricec/grads/thrho.gs'
'd thrho-thrho0'

'set gxout vector'
'set ccolor 0'
'set cthick 5'
'set arrscl .25 25'
'd skip(uinterp,5,5);vinterp'

'draw xlab x(km)'
'draw ylab y(km)'
*Enter title string
titlestring = '`3f`0`bsfc`n , 20dBZ, 0.5K `3z`b`3r`0`n, -3 m/s W`b 1km`n, and Surface Vortex'
'draw title 'titlestring
 
*print out images if required
if (print=1)
'printim zeta_river'sett'_zoom.png'
endif

'!sleep .5'

sett=sett+1
endwhile
endif
endif

*************************************** 
************** Display 3 **************
***************************************

if (display=3)
if (loop=0)
'c'
'set t 'initialtime
'q dims'
xlin  = sublin(result,2)
xwrd  = subwrd(xlin,8)
ylin  = sublin(result,3)
ywrd  = subwrd(ylin,8)
'set lon 0 'xwrd
'set lat 0 'ywrd

'/data/bricec/grads/color -20 20 1 -kind blue->green->yellow->red'
'/data/bricec/grads/zvort.gs'
'set lon 'lon1' 'lon2
'set lat 'lat1' 'lat2
'set z 1'
'd  1E2 * zvort'
'/data/bricec/grads/cbarm.gs'
'draw string 5.5 0.5 Vertical Vorticity 1E2 (s^-1)'

'set gxout contour'
'set clab off'
'set cthick 12'
'set ccolor 1'
'set clevs 20'
'd dbz'

'set cthick 12'
'set ccolor 6'
'set clevs  10'
'set cstyle 1'
'set lev 1'
'd winterp'

'set gxout vector'
'set ccolor 0'
'set cthick 5'
'set arrscl .25 25'
'set z 1'
'd skip(uinterp,5,5);vinterp'

'draw xlab x(km)'
'draw ylab y(km)'
*Enter title string
titlestring = '`3f`0`bsfc`n , 20dBZ, 10m/s W`b 1km`n'
'draw title 'titlestring

*print out images if required
if (print=1)
'printim zeta_river'sett'.png'
endif
endif

********************************************* 
************** Display 3 Loop  **************
*********************************************

if (loop=1)
sett=initialtime
while(sett<=maxtime)
*'c'
'set t 'sett
'q dims'
zlin1  = sublin(result,2)
zwrd1  = subwrd(zlin1,8)
zlin2  = sublin(result,3)
zwrd2  = subwrd(zlin2,8)
'set lon 0 'zwrd1
'set lat 0 'zwrd2

'/data/bricec/grads/color -20 20 1 -kind blue->green->yellow->red'
'/data/bricec/grads/zvort.gs'
'set lon 'lon1' 'lon2
'set lat 'lat1' 'lat2
'set z 1'
'd  1E2 * zvort'
'/data/bricec/grads/cbarm.gs'
'draw string 5.5 0.5 Vertical Vorticity 1E2 (s^-1)'

'set gxout contour'
'set clab off'
'set cthick 12'
'set ccolor 1'
'set clevs 20'
'd dbz'

'set cthick 12'
'set ccolor 6'
'set clevs  10'
'set cstyle 1'
'set lev 1'
'd winterp'

'set gxout vector'
'set ccolor 0'
'set cthick 5'
'set arrscl .25 25'
'set z 1'
'd skip(uinterp,5,5);vinterp'

'draw xlab x(km)'
'draw ylab y(km)'
*Enter title string
titlestring = '`3f`0`bsfc`n , 20dBZ, 10m/s W`b 1km`n'
'draw title 'titlestring

*print out images if required
if (print=1)
'printim zeta_river'sett'.png'
endif

'!sleep .5'

sett=sett+1
endwhile
endif
endif

*************************************** 
************** Display 4 **************
***************************************

if (display=4)
if (loop=0)
'c'
'set t 'initialtime
'q dims'
xlin  = sublin(result,2)
xwrd  = subwrd(xlin,8)
ylin  = sublin(result,3)
ywrd  = subwrd(ylin,8)
'set lon 0 'xwrd
'set lat 0 'ywrd

'/data/bricec/grads/color -10 10 1 -kind blue->green->yellow->red'
'/data/bricec/grads/zvort.gs'
'set lon 'lon1' 'lon2
'set lat 'lat1' 'lat2
'set z 1'
'd  1E3 * zvort'
'/data/bricec/grads/cbarm.gs'
'draw string 5.5 0.5 Vertical Vorticity 1E3 (s^-1)'

'set gxout contour'
'set clab off'
'set cthick 12'
'set ccolor 1'
'set clevs 20'
'd dbz'

'set cmin 0.05'
'set cint 0.01'
'set ccolor 15'
'/data/bricec/grads/ow.gs'
'd ow'

'set cthick 12'
'set ccolor 6'
'set clevs  10'
'set cstyle 1'
'set lev 1'
'd winterp'

'set gxout vector'
'set ccolor 0'
'set cthick 5'
'set arrscl .25 25'
'set z 1'
'd skip(uinterp,5,5);vinterp'

'draw xlab x(km)'
'draw ylab y(km)'
*Enter title string
titlestring = '`3f`0`bsfc`n , 20dBZ, 10m/s W`b 1km`n , Surface Vortex'
'draw title 'titlestring

*print out images if required
if (print=1)
'printim zeta_river'sett'.png'
endif
endif

********************************************* 
************** Display 4 Loop  **************
*********************************************

if (loop=1)
sett=initialtime
while(sett<=maxtime)
*'c'
'set t 'sett
'q dims'
zlin1  = sublin(result,2)
zwrd1  = subwrd(zlin1,8)
zlin2  = sublin(result,3)
zwrd2  = subwrd(zlin2,8)
'set lon 0 'zwrd1
'set lat 0 'zwrd2

'/data/bricec/grads/color -10 10 1 -kind blue->green->yellow->red'
'/data/bricec/grads/zvort.gs'
'set lon 'lon1' 'lon2
'set lat 'lat1' 'lat2
'set z 1'
'd  1E3 * zvort'
'/data/bricec/grads/cbarm.gs'
'draw string 5.5 0.5 Vertical Vorticity 1E3 (s^-1)'

'set gxout contour'
'set clab off'
'set cthick 12'
'set ccolor 1'
'set clevs 20'
'd dbz'

'set cmin 0.05'
'set cint 0.01'
'set ccolor 15'
'/data/bricec/grads/ow.gs'
'd ow'

'set cthick 12'
'set ccolor 6'
'set clevs  10'
'set cstyle 1'
'set lev 1'
'd winterp'

'set gxout vector'
'set ccolor 0'
'set cthick 5'
'set arrscl .25 25'
'set z 1'
'd skip(uinterp,5,5);vinterp'

'draw xlab x(km)'
'draw ylab y(km)'
*Enter title string
titlestring = '`3f`0`bsfc`n , 20dBZ, 10m/s W`b 1km`n , Surface Vortex'
'draw title 'titlestring

*print out images if required
if (print=1)
'printim zeta_river'sett'.png'
endif

'!sleep .5'

sett=sett+1
endwhile
endif
endif

*************************************** 
************** Display 5 **************
***************************************

if (display=5)
if (loop=0)
'c'
'set t 'initialtime
'q dims'
xlin  = sublin(result,2)
xwrd  = subwrd(xlin,8)
ylin  = sublin(result,3)
ywrd  = subwrd(ylin,8)
'set lon 0 'xwrd
'set lat 0 'ywrd

'/data/bricec/grads/color -20 20 2 -kind blue->green->yellow->red'
'/data/bricec/grads/zvort.gs'
'set lon 'lon1' 'lon2
'set lat 'lat1' 'lat2
'set z 1'
'd  1E2 * zvort'
'/data/bricec/grads/cbarm.gs'
'draw string 5.5 0.5 Vertical Vorticity 1E2 (s^-1)'

'set gxout contour'
'set clab off'
'set cthick 12'
'set ccolor 1'
'set clevs 20'
'd dbz'

'set cthick 12'
'set ccolor 14'
'set clevs -.5'
'set cstyle 1'
'set csmooth on'
'/data/bricec/grads/thrho.gs'
'd thrho-thrho0'

'set cthick 12'
'set ccolor 6'
'set clevs  10'
'set cstyle 1'
'set lev 1'
'd winterp'

'set gxout vector'
'set ccolor 0'
'set cthick 5'
'set arrscl .25 25'
'set z 1'
'd skip(uinterp,5,5);vinterp'

'draw xlab x(km)'
'draw ylab y(km)'
*Enter title string
titlestring = '`3f`0`bsfc`n , 20dBZ, 0.5K `3z`b`3r`0`n, 10m/s W`b 1km'
'draw title 'titlestring

*print out images if required
if (print=1)
'printim zeta_river'sett'.png'
endif
endif

********************************************* 
************** Display 5 Loop  **************
*********************************************

if (loop=1)
sett=initialtime
while(sett<=maxtime)
*'c'
'set t 'sett
'q dims'
zlin1  = sublin(result,2)
zwrd1  = subwrd(zlin1,8)
zlin2  = sublin(result,3)
zwrd2  = subwrd(zlin2,8)
'set lon 0 'zwrd1
'set lat 0 'zwrd2

'/data/bricec/grads/color -20 20 2 -kind blue->green->yellow->red'
'/data/bricec/grads/zvort.gs'
'set lon 'lon1' 'lon2
'set lat 'lat1' 'lat2
'set z 1'
'd  1E2 * zvort'
'/data/bricec/grads/cbarm.gs'
'draw string 5.5 0.5 Vertical Vorticity 1E2 (s^-1)'

'set gxout contour'
'set clab off'
'set cthick 12'
'set ccolor 1'
'set clevs 20'
'd dbz'

'set cthick 12'
'set ccolor 14'
'set clevs -.5'
'set cstyle 1'
'set csmooth on'
'/data/bricec/grads/thrho.gs'
'd thrho-thrho0'

'set cthick 12'
'set ccolor 6'
'set clevs  10'
'set cstyle 1'
'set lev 1'
'd winterp'

'set gxout vector'
'set ccolor 0'
'set cthick 5'
'set arrscl .25 25'
'set z 1'
'd skip(uinterp,5,5);vinterp'

'draw xlab x(km)'
'draw ylab y(km)'
*Enter title string
titlestring = '`3f`0`bsfc`n , 20dBZ, 0.5K `3z`b`3r`0`n, 10m/s W`b 1km'
'draw title 'titlestring

*print out images if required
if (print=1)
'printim zeta_river'sett'.png'
endif

'!sleep .5'

sett=sett+1
endwhile
endif
endif

*************************************** 
************** Display 6 **************
***************************************

if (display=6)
if (loop=0)
'c'
'set t 'initialtime
'q dims'
xlin  = sublin(result,2)
xwrd  = subwrd(xlin,8)
ylin  = sublin(result,3)
ywrd  = subwrd(ylin,8)
'set lon 0 'xwrd
'set lat 0 'ywrd

'/data/bricec/grads/color -1 1 .1 -kind blue->green->yellow->red'
'/data/bricec/grads/zvort.gs'
'set lon 'lon1' 'lon2
'set lat 'lat1' 'lat2
'set z 1'
'd  1E2 * zvort'
'/data/bricec/grads/cbarm.gs'
'draw string 5.5 0.5 Vertical Vorticity 1E2 (s^-1)'

'set gxout contour'
'set clab off'
'set cthick 12'
'set ccolor 1'
'set clevs 20'
'd dbz'

'set cthick 12'
'set ccolor 14'
'set clevs -.5'
'set cstyle 1'
'set csmooth on'
'/data/bricec/grads/thrho.gs'
'd thrho-thrho0'

'set cmin 0.05'
'set cint 0.01'
'set ccolor 15'
'/data/bricec/grads/ow.gs'
'd ow'

'set cthick 12'
'set ccolor 6'
'set clevs  10'
'set cstyle 1'
'set lev 1'
'd winterp'

'set gxout vector'
'set ccolor 0'
'set cthick 5'
'set arrscl .25 25'
'set z 1'
'd skip(uinterp,5,5);vinterp'

'draw xlab x(km)'
'draw ylab y(km)'
*Enter title string
titlestring = '`3f`0`bsfc`n , 20dBZ, 0.5K `3z`b`3r`0`n, 10m/s W`b 1km`n , Surface Vortex'
'draw title 'titlestring

*print out images if required
if (print=1)
'printim zeta_river'sett'.png'
endif
endif

********************************************* 
************** Display 6 Loop  **************
*********************************************

if (loop=1)
sett=initialtime
while(sett<=maxtime)
*'c'
'set t 'sett
'q dims'
zlin1  = sublin(result,2)
zwrd1  = subwrd(zlin1,8)
zlin2  = sublin(result,3)
zwrd2  = subwrd(zlin2,8)
'set lon 0 'zwrd1
'set lat 0 'zwrd2

'/data/bricec/grads/color -10 10 1 -kind blue->green->yellow->red'
'/data/bricec/grads/zvort.gs'
'set lon 'lon1' 'lon2
'set lat 'lat1' 'lat2
'set z 1'
'd  1E3 * zvort'
'/data/bricec/grads/cbarm.gs'
'draw string 5.5 0.5 Vertical Vorticity 1E3 (s^-1)'

'set gxout contour'
'set clab off'
'set cthick 12'
'set ccolor 1'
'set clevs 20'
'd dbz'

'set cthick 12'
'set ccolor 14'
'set clevs -.5'
'set cstyle 1'
'set csmooth on'
'/data/bricec/grads/thrho.gs'
'd thrho-thrho0'

'set cmin 0.05'
'set cthick 12'
'set cint 0.005'
'set ccolor 15'
'/data/bricec/grads/ow.gs'
'd ow'

'set cthick 12'
'set ccolor 6'
'set clevs  10'
'set cstyle 1'
'set lev 1'
'd winterp'

'set gxout vector'
'set ccolor 0'
'set cthick 5'
'set arrscl .25 25'
'set z 1'
'd skip(uinterp,5,5);vinterp'

'draw xlab x(km)'
'draw ylab y(km)'
*Enter title string
titlestring = '`3f`0`bsfc`n , 20dBZ, 0.5K `3z`b`3r`0`n, 10m/s W`b 1km`n , Surface Vortex'
'draw title 'titlestring

*print out images if required
if (print=1)
'printim zeta_river'sett'.png'
endif

'!sleep .5'

sett=sett+1
endwhile
endif
endif

