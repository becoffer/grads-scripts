* Script to calculate updraft titling term of the vertical vorticity tendency
* Author:  Brice Coffer, NCSU
* Last modified:  14 May 2014

* enter level
level = 1

* enter grid spacing
dx = 500.0

* maskout? 1=yes,0=no
mask=0
* set winterp threshold if mask=1
wthresh = 1.0
* set updraft/downdraft tilting if mask=1   1=updraft,0=downdraft
tilt=1

*'set lev 'level
'q dims'
zlin  = sublin(result,4)
zwrd  = subwrd(zlin,9)

'dudz = uinterp(z='zwrd+1')-uinterp(z='zwrd-1') / 40.0'
'dvdz = vinterp(z='zwrd+1')-vinterp(z='zwrd-1') / 40.0'
'define wtilt = (cdiff(winterp,y)*dudz - cdiff(winterp,x)*dvdz) / (2*'dx')'
'undefine dudz dvdz'


if (mask=1)
* Updraft tilting
if (tilt=1)
'define w=maskout(winterp,winterp-'wthresh')'
endif
* Downdraft tilting
if (tilt=0)
*'define w=maskout(winterp,'wthresh'-winterp)'
endif
'define wtilt=w*wtilt/w'
*'d wtilt'
else
'd wtilt'
endif



