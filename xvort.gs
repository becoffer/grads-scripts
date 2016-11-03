* Script to calculate the x-component of horizontal vorticity.
* Author:  Brice Coffer, NCSU
* Last modified:  14 Mar 2015

* enter grid spacing
dx = 125.0

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
if (zwrd=1)
'define xvort = cdiff(winterp,y) / (2*'dx') - (vinterp(z='zwrd+1')) / ('height2')'
else
'define xvort = cdiff(winterp,y) / (2*'dx') - (vinterp(z='zwrd+1') - vinterp(z='zwrd-1')) / ('height2'-'height1')'
endif

