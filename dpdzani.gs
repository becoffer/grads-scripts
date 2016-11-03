* Script to let the user animate grads output and advance through the images
* by clicking on the screen.
* Author:  Brice Coffer, NCSU
* Last modified:  20 Oct 2015

prompt 'enter first output time...    '
pull t1
prompt 'enter last output time...    '
pull t2
*prompt 'enter plot variable...    '
*pull var
var=dpdz
'q dims'
zlin  = sublin(result,4)
zwrd  = subwrd(zlin,9)
'set dbuff on'
t = t1
'set datawarn off'
'set mproj off'
'set grads off'
'set string 1 c 5 0'
'set parea 1 10 2 8'
while (t <= t2)
  'set gxout shaded'
  'set t 't
  'q time'
  time = subwrd(result,3)
  say time ',' t
  if (var=dpdz)
  'define dpdz = (-1/rhobar)*(((pprt(z='zwrd+1')-pprt(z=1))-(pb(z='zwrd+1')-pb(z=1)))/(1000*(lev(z='zwrd+1')-lev(z=1))))'
  'set clevs -0.1 -0.05 0 0.05 0.1 0.15 0.2 0.25 0.3'
  endif
  'd 'var
  'set dfile 2'
  '/data/bricec/grads/cbarm.gs'
*  if (var=thrhopert | var=zvort | var=winterp)
  'set gxout contour'
  'set clevs 20'
   'set clab off'
  'set cthick 12'
  'd dbz(z=1)'
  'set cmin 0.03'
  'set cint 0.01'
  'set ccolor 15'
  'set z 1'
  '/data/bricec/grads/ow.gs'
  'd ow'
  'set gxout vector'
  'set ccolor 1'
  'set cthick 4'
  'set arrscl .25 15'
  'd skip(uinterp,10,10);vinterp'
  'set gxout shaded'
  'set z 'zwrd
  'set dfile 1'
  'swap'
  'q pos'
  t = t + 1
endwhile
