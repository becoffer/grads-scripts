* Script to let the user animate grads output and advance through the images
* by clicking on the screen.
* Author:  Brice Coffer, NCSU
* Last modified:  20 Oct 2015

*prompt 'enter first output time...    '
*pull t1
*prompt 'enter last output time...    '
*pull t2
*prompt 'enter plot variable...    '
*pull var
t1 = 61
t2 = 91
var = xvort
umove=9.5
vmove=-0.5
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
  if (var=qr | var=qv)
  'set clevs 0 0.00025 .0005 .001 .0015 .002 .0025 .003 .0035 .004 .0045 .005 .0055 .006'
  endif
  if (var=qg | var=qhl)
  'set clevs 0 0.0001 .0002 .0003 .0004 .0005 .0006 .0007 .0008 .0009 .001 0.0011.0012'
  endif
  if (var=winterp)
*  'set clevs -1.5 -1 -0.75 -0.5 -0.25 0 0.25 0.5 0.75 1 1.5'
*  'set clevs -30 -25 -20 -15 -10 -5 0 5 10 15 20 25 30'
*  '/data/bricec/grads/color.gs -20 20 .5 -kind BrBG'
  'set clevs 10'
  endif
  if (var=thpert)
  'define thpert=th-th(t=1)'
*  'set clevs -9 -8 -7 -6 -5 -4 -3 -2 -1 0'
*  'set ccols 9 14 4 11 5 13 3 7 8 2 6'
  '/data/bricec/grads/color.gs -10 0 .5 -kind darkmagenta->darkslateblue->slateblue->steelblue->cyan->lawngreen->yellow->orange->red'
*  '/data/bricec/grads/rgb_temp.gs'
  endif
  if (var=thrhopert)
  '/data/bricec/grads/thrho.gs'
*  '/data/bricec/grads/color.gs -10 0 .05 -kind darkmagenta->darkslateblue->slateblue->steelblue->cyan->lawngreen->yellow->orange->red'
  '/data/bricec/grads/rgb_temp.gs'
  'thrhopert = thrho-thrho0'
  endif
  if (var=dbz)
  '/data/bricec/grads/color.gs 10 70 2 -kind nowrad'
  endif
  if (var=conv)
  '/data/bricec/grads/conv.gs'
  '/data/bricec/grads/color -.1 .1 .01 -kind BuRd'
  endif
  if (var=ow)
  '/data/bricec/grads/ow.gs'
  '/data/bricec/grads/color 0 .1 .0005 -kind rainbow' 
  endif
  if (var=stream | var = cross)
  '/data/bricec/grads/xvort.gs'
  '/data/bricec/grads/yvort.gs'
  '/data/bricec/grads/zvort.gs'
  '/data/bricec/grads/streamwise.gs'
  '/data/bricec/grads/color -.5 .5 .05 -kind BuRd'
  endif
  if (var=surge)
*  'define surge=sqrt((uinterp-uinterp(t=1)-'umove')*(uinterp-uinterp(t=1)-'umove') + (vinterp-vinterp(t=1)-'vmove')*(vinterp-vinterp(t=1)-'vmove'))'
  'define surge=sqrt((uinterp-uinterp(t=1))*(uinterp-uinterp(t=1)) + (vinterp-vinterp(t=1))*(vinterp-vinterp(t=1)))'
  '/data/bricec/grads/color 5 45 .2 -kind rainbow'
  endif
  if (var=pprt)
  '/data/bricec/grads/color -400 400 5 -kind BuRd'
  endif
  if (var=zvort)
  '/data/bricec/grads/color -1 1 .1 -kind BuRd' 
  '/data/bricec/grads/zvort'
  'd  1E2 * zvort' 
  else
  'd 'var
  endif
  '/data/bricec/grads/cbarm.gs'
*  if (var=thrhopert | var=zvort | var=winterp)
*  'set dfile 2'
  'set gxout contour'
  'set clevs 10'
   'set clab off'
  'set cthick 12'
  if (var=ow)
  'set ccolor 0'
  else
  'set ccolor 1'
  endif
  if (var!=dbz)
  'd dbz(z=1)'
  endif
  'set cmin 0.05'
  'set cint 0.01'
  'set ccolor 15'
  'set z 1'
  '/data/bricec/grads/ow.gs'
  if (var!=ow)
  'd ow'
  endif
  'set gxout vector'
  'set ccolor 1'
  'set cthick 4'
  'set arrscl .2 20'
  'd skip(uinterp,3,3);vinterp'
*  '/data/bricec/grads/xvort.gs'
*  '/data/bricec/grads/yvort.gs'
*  'set arrscl .5 2'
*  'd skip(xvort,5,5);yvort'
  'set gxout shaded'
  'set dfile 1'
*  endif
*  if (var=thpert)
*  'set z 1'
*  'set ccolor 0'
*  'd skip(uinterp,10,10);vinterp'
*  'set gxout contour'
*  'set cmin 20'
*  'set ccolor 1'
*  'd dbz'
*  endif
  'set z 'zwrd
  'swap'
  'q pos'
  t = t + 1
endwhile
