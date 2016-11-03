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
'define gqrz = qr(z='zwrd+1') - qr(z='zwrd-1')) / ('height2'-'height1')'
'define gqsz = qs(z='zwrd+1') - qs(z='zwrd-1')) / ('height2'-'height1')'
'define gqgz = qg(z='zwrd+1') - qg(z='zwrd-1')) / ('height2'-'height1')'
'define gvtrz = vtr(z='zwrd+1') - vtr(z='zwrd-1')) / ('height2'-'height1')'
'define gvtsz = vts(z='zwrd+1') - vts(z='zwrd-1')) / ('height2'-'height1')'
'define gvtgz = vtg(z='zwrd+1') - vtg(z='zwrd-1')) / ('height2'-'height1')'

'/data/bricec/grads/pv.gs'

'define pvmass = pv2*(gqrz*gvtrz+gqsz*gvtsz+gqgz*gvtgz)/rho'
