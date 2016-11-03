* Script to calculate updraft stretching term for the vorticity tendency
* Author:  Brice Coffer, NCSU
* Last modified:  14 May 2014

* enter grid spacing
dx = 500.0

* maskout? 1=yes,0=no
mask=0
* set winterp threshold
wthresh = 1.0

'define wstretch = -zvort*(cdiff(uinterp,x) + cdiff(vinterp,y)) / (2*'dx')'

if (mask=1)
'define w=maskout(winterp,winterp-'wthresh')'
'define wstretch=w*wstretch/w'
*'d wstretch'
else
*'d wstretch'
endif



