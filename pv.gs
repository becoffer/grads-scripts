* Script to calculate dry potential vorticity.
* Author:  Brice Coffer, NCSU
* Last modified:  4 Oct 2016

* enter grid spacing
dx = 500.0

'q dims'
zlin=sublin(result,4)
zwrd=subwrd(zlin,9)

'set z 'zwrd+1
'q dims'
zlin=sublin(result,4)
height2=subwrd(zlin,6)*1000

if (zwrd>1)
'set z 'zwrd-1
'q dims'
zlin=sublin(result,4)
height1=subwrd(zlin,6)*1000
endif

'set z 'zwrd
* assume dry adiabatic between z=0 to first model level
if (zwrd=1)
'define gthz = 0'
else
'define gthz = th(z='zwrd+1') - th(z='zwrd-1')) / ('height2'-'height1')'
endif

'define gthx = cdiff(th,x) / (2*'dx')'
'define gthy = cdiff(th,y) / (2*'dx')'

'define pv2  = (gthx*xvort+gthy*yvort+gthz*zvort)/rho'
