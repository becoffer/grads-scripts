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
'define gmptendx = cdiff(mptend,x) \ (2*'dx')'
exit
'define gmptendy = cdiff(mptend,y) \ (2*'dx')'
'define gmptendz = mptend(z='zwrd+1') - mptend(z='zwrd-1')) / ('height2'-'height1')'

'define pvdiabatic = (xvort*gmptendx+yvort*gmptendy+zvort*gmptendz)/rho'
