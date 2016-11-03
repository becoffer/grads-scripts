* Script to let the user animate grads output and advance through the images in 4 panels
* by clicking on the screen.
* Author:  Brice Coffer, NCSU
* Last modified:  18 Feb 2016

*prompt 'enter first output time...    '
*pull t1
*prompt 'enter last output time...    '
*pull t2
*prompt 'enter plot variable...    '
*pull var
t1 = 73
t2 = 91
var  = dbz
zvar = 1
var2 = thpert
zvar2= 1
var3 = surge
zvar3=1
var4 = zvort
zvar4=1
umove=8.5
vmove=0.5
'q dims'
zlin  = sublin(result,4)
zwrd  = subwrd(zlin,9)
*'set dbuff on'
t = t1
'set datawarn off'
'set mproj off'
'set grads off'
while (t <= t2)
  '/data/bricec/grads/subplot.gs 4 1'
  'set gxout shaded'
  'set ylab off'
  'set grads off'
  'set grid off'
  'set t 't
  'set z 'zvar
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
  '/data/bricec/grads/color.gs -10 10 .5 -kind BrBG'
  endif
  if (var=thpert)
  'define thpert=th-th(t=1)'
*  'set clevs -9 -8 -7 -6 -5 -4 -3 -2 -1 0'
*  'set ccols 9 14 4 11 5 13 3 7 8 2 6'
  '/data/bricec/grads/rgb_temp.gs'
  endif
  if (var=thrhopert)
  '/data/bricec/grads/thrho.gs'
*  '/data/bricec/grads/color.gs -10 0 .05 -kind darkmagenta->darkslateblue->slateblue->steelblue->cyan->lawngreen->yellow->orange->red'
  '/data/bricec/grads/rgb_temp.gs'
  'thrhopert = thrho-thrho0'
  endif
  if (var=dbz)
*  '/data/bricec/grads/nowrad.gs'
  '/data/bricec/grads/color.gs 10 70 .5 -kind nowrad'
  endif
  if (var=conv)
  '/data/bricec/grads/conv.gs'
  '/data/bricec/grads/color -.1 .1 .01 -kind BuRd'
  endif
  if (var=ow)
  '/data/bricec/grads/ow.gs'
  '/data/bricec/grads/color 0 .1 .0005 -kind rainbow' 
  endif
  if (var=surge)
  'define surge=sqrt((uinterp-uinterp(t=1))*(uinterp-uinterp(t=1)) + (vinterp-vinterp(t=1))*(vinterp-vinterp(t=1)))'
  '/data/bricec/grads/color 5 45 .2 -kind rainbow'
  endif
  if (var=zvort)
  '/data/bricec/grads/color -1 1 .05 -kind BuRd' 
  '/data/bricec/grads/zvort'
  'd  1E2 * zvort' 
  else
  'd 'var
  endif
  '/data/bricec/grads/xcbar.gs 1.3 1.5 1.5 7.1 -fs 10 -fx -.6'
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
*  'd ow'
  endif
  'set gxout vector'
  'set ccolor 1'
  'set cthick 4'
  'set arrscl .2 20'
*  'd skip(uinterp,2,2);vinterp'
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
  'draw title 'var

  '/data/bricec/grads/subplot.gs 4 2'
  'set gxout shaded'
  'set ylab off'
  'set grads off'
  'set grid off'
  'set t 't
  'set z 'zvar2
  'q time'
  time = subwrd(result,3)
  say time ',' t
  if (var2=qr | var2=qv)
  'set clevs 0 0.00025 .0005 .001 .0015 .002 .0025 .003 .0035 .004 .0045 .005 .0055 .006'
  endif
  if (var2=qg | var2=qhl)
  'set clevs 0 0.0001 .0002 .0003 .0004 .0005 .0006 .0007 .0008 .0009 .001 0.0011.0012'
  endif
  if (var2=winterp)
*  'set clevs -1.5 -1 -0.75 -0.5 -0.25 0 0.25 0.5 0.75 1 1.5'
*  'set clevs -30 -25 -20 -15 -10 -5 0 5 10 15 20 25 30'
  '/data/bricec/grads/color.gs -10 10 .2 -kind BrBG'
  endif
  if (var2=thpert)
  'define thpert=th-th(t=1)'
*  'set clevs -9 -8 -7 -6 -5 -4 -3 -2 -1 0'
*  'set ccols 9 14 4 11 5 13 3 7 8 2 6'
  '/data/bricec/grads/rgb_temp.gs'
  endif
  if (var2=thrhopert)
  '/data/bricec/grads/thrho.gs'
*  '/data/bricec/grads/color.gs -10 0 .05 -kind darkmagenta->darkslateblue->slateblue->steelblue->cyan->lawngreen->yellow->orange->red'
  '/data/bricec/grads/rgb_temp.gs'
  'thrhopert = thrho-thrho0'
  endif
  if (var2=dbz)
  '/data/bricec/grads/nowrad.gs'
  endif
  if (var2=conv)
  '/data/bricec/grads/conv.gs'
  '/data/bricec/grads/color -.1 .1 .01 -kind BuRd'
  endif
  if (var2=ow)
  '/data/bricec/grads/ow.gs'
  '/data/bricec/grads/color 0 .1 .0005 -kind rainbow' 
  endif
  if (var2=surge)
  'define surge=sqrt((uinterp-uinterp(t=1)-'umove')*(uinterp-uinterp(t=1)-'umove') + (vinterp-vinterp(t=1)-'vmove')*(vinterp-vinterp(t=1)-'vmove'))'
  '/data/bricec/grads/color 5 45 1 -kind rainbow'
  endif
  if (var2=zvort)
  '/data/bricec/grads/color -10 10 2 -kind BuRd' 
  '/data/bricec/grads/zvort'
  'd  1E2 * zvort' 
  else
  'd 'var2
  endif
  '/data/bricec/grads/xcbar.gs 1.3 1.5 1.4 7.0 -fx -1.1 -fs 40'
*  if (var2=thrhopert | var=zvort | var=winterp)
*  'set dfile 2'
  'set gxout contour'
  'set clevs 10'
   'set clab off'
  'set cthick 12'
  if (var2=ow)
  'set ccolor 0'
  else
  'set ccolor 1'
  endif
  if (var2!=dbz)
  'd dbz(z=1)'
  endif
  'set cmin 0.05'
  'set cint 0.01'
  'set ccolor 15'
  'set z 1'
  '/data/bricec/grads/ow.gs'
  if (var2!=ow)
*  'd ow'
  endif
  'set gxout vector'
  'set ccolor 1'
  'set cthick 4'
  'set z 5'
  'set arrscl .2 40'
  'd skip(uinterp,5,5);vinterp'
  'set z 'zvar2
  'set gxout shaded'
  'set dfile 1'
*  endif
*  if (var2=thpert)
*  'set z 1'
*  'set ccolor 0'
*  'd skip(uinterp,10,10);vinterp'
*  'set gxout contour'
*  'set cmin 20'
*  'set ccolor 1'
*  'd dbz'
*  endif
  'set z 'zwrd
  'draw title 'var2

  '/data/bricec/grads/subplot.gs 4 3'
  'set grads off'
  'set gxout shaded'
  'set grid off'
  'set t 't
  'set z 'zvar3
  'q time'
  time = subwrd(result,3)
  say time ',' t
  if (var3=qr | var3=qv)
  'set clevs 0 0.00025 .0005 .001 .0015 .002 .0025 .003 .0035 .004 .0045 .005 .0055 .006'
  endif
  if (var3=qg | var3=qhl)
  'set clevs 0 0.0001 .0002 .0003 .0004 .0005 .0006 .0007 .0008 .0009 .001 0.0011.0012'
  endif
  if (var3=winterp)
*  'set clevs -1.5 -1 -0.75 -0.5 -0.25 0 0.25 0.5 0.75 1 1.5'
*  'set clevs -30 -25 -20 -15 -10 -5 0 5 10 15 20 25 30'
  '/data/bricec/grads/color.gs -10 10 .2 -kind BrBG'
  endif
  if (var3=thpert)
  'define thpert=th-th(t=1)'
*  'set clevs -9 -8 -7 -6 -5 -4 -3 -2 -1 0'
*  'set ccols 9 14 4 11 5 13 3 7 8 2 6'
  '/data/bricec/grads/rgb_temp.gs'
  endif
  if (var3=thrhopert)
  '/data/bricec/grads/thrho.gs'
*  '/data/bricec/grads/color.gs -10 0 .05 -kind darkmagenta->darkslateblue->slateblue->steelblue->cyan->lawngreen->yellow->orange->red'
  '/data/bricec/grads/rgb_temp.gs'
  'thrhopert = thrho-thrho0'
  endif
  if (var3=dbz)
  '/data/bricec/grads/nowrad.gs'
  endif
  if (var3=conv)
  '/data/bricec/grads/conv.gs'
  '/data/bricec/grads/color -.1 .1 .01 -kind BuRd'
  endif
  if (var3=ow)
  '/data/bricec/grads/ow.gs'
  '/data/bricec/grads/color 0 .1 .0005 -kind rainbow' 
  endif
  if (var3=surge)
  'define surge=sqrt((uinterp-uinterp(t=1)-'umove')*(uinterp-uinterp(t=1)-'umove') + (vinterp-vinterp(t=1)-'vmove')*(vinterp-vinterp(t=1)-'vmove'))'
  '/data/bricec/grads/color 5 45 1 -kind rainbow'
  endif
  if (var3=zvort)
  '/data/bricec/grads/color -1 1 .1 -kind BuRd' 
  '/data/bricec/grads/zvort'
  'd  1E2 * zvort' 
  else
  'd 'var3
  endif
  '/data/bricec/grads/xcbar.gs 7.8 8.0 1.5 7.1 -fs 5'
*  if (var3=thrhopert | var=zvort | var=winterp)
*  'set dfile 2'
  'set gxout contour'
  'set clevs 10'
   'set clab off'
  'set cthick 12'
  if (var3=ow)
  'set ccolor 0'
  else
  'set ccolor 1'
  endif
  if (var3!=dbz)
  'd dbz(z=1)'
  endif
  'set cmin 0.05'
  'set cint 0.01'
  'set ccolor 15'
  'set z 1'
  '/data/bricec/grads/ow.gs'
  if (var3!=ow)
*  'd ow'
  endif
  'set gxout vector'
  'set ccolor 1'
  'set cthick 4'
  'set arrscl .2 20'
*  'd skip(uinterp,2,2);vinterp'
*  '/data/bricec/grads/xvort.gs'
*  '/data/bricec/grads/yvort.gs'
*  'set arrscl .5 2'
*  'd skip(xvort,5,5);yvort'
  'set gxout shaded'
  'set dfile 1'
*  endif
*  if (var3=thpert)
*  'set z 1'
*  'set ccolor 0'
*  'd skip(uinterp,10,10);vinterp'
*  'set gxout contour'
*  'set cmin 20'
*  'set ccolor 1'
*  'd dbz'
*  endif
  'set z 'zwrd
  'draw title 'var3

  '/data/bricec/grads/subplot.gs 4 4'
  'set grads off'
  'set gxout shaded'
  'set grid off'
  'set t 't
  'set z 'zvar4
  'q time'
  time = subwrd(result,3)
  say time ',' t
  if (var4=qr | var4=qv)
  'set clevs 0 0.00025 .0005 .001 .0015 .002 .0025 .003 .0035 .004 .0045 .005 .0055 .006'
  endif
  if (var4=qg | var4=qhl)
  'set clevs 0 0.0001 .0002 .0003 .0004 .0005 .0006 .0007 .0008 .0009 .001 0.0011.0012'
  endif
  if (var4=winterp)
*  'set clevs -1.5 -1 -0.75 -0.5 -0.25 0 0.25 0.5 0.75 1 1.5'
*  'set clevs -30 -25 -20 -15 -10 -5 0 5 10 15 20 25 30'
  '/data/bricec/grads/color.gs -10 10 .2 -kind BrBG'
  endif
  if (var4=thpert)
  'define thpert=th-th(t=1)'
  'define thpert=th-306.465'
*  'set clevs -9 -8 -7 -6 -5 -4 -3 -2 -1 0'
*  'set ccols 9 14 4 11 5 13 3 7 8 2 6'
  '/data/bricec/grads/rgb_temp.gs'
  endif
  if (var4=thrhopert)
  '/data/bricec/grads/thrho.gs'
*  '/data/bricec/grads/color.gs -10 0 .05 -kind darkmagenta->darkslateblue->slateblue->steelblue->cyan->lawngreen->yellow->orange->red'
  '/data/bricec/grads/rgb_temp.gs'
  'thrhopert = thrho-thrho0'
  endif
  if (var4=dbz)
  '/data/bricec/grads/nowrad.gs'
  endif
  if (var4=conv)
  '/data/bricec/grads/conv.gs'
  '/data/bricec/grads/color -.1 .1 .01 -kind BuRd'
  endif
  if (var4=ow)
  '/data/bricec/grads/ow.gs'
  '/data/bricec/grads/color 0 .1 .0005 -kind rainbow' 
  endif
  if (var4=surge)
  'define surge=sqrt((uinterp-uinterp(t=1)-'umove')*(uinterp-uinterp(t=1)-'umove') + (vinterp-vinterp(t=1)-'vmove')*(vinterp-vinterp(t=1)-'vmove'))'
  '/data/bricec/grads/color 5 45 .2 -kind rainbow'
  endif
  if (var4=zvort)
  '/data/bricec/grads/color -1 1 .05 -kind BuRd' 
  '/data/bricec/grads/zvort'
  'd  1E2 * zvort' 
  else
  'd 'var4
  endif
  '/data/bricec/grads/xcbar.gs 7.8 8.0 1.4 7.0 -fs 4'
*  if (var4=thrhopert | var=zvort | var=winterp)
*  'set dfile 2'
  'set gxout contour'
  'set clevs 10'
   'set clab off'
  'set cthick 12'
  if (var4=ow)
  'set ccolor 0'
  else
  'set ccolor 1'
  endif
  if (var4!=dbz)
  'd dbz(z=1)'
  endif
  'set cmin 0.05'
  'set cint 0.01'
  'set ccolor 15'
  'set z 1'
  '/data/bricec/grads/ow.gs'
  if (var4!=ow)
*  'd ow'
  endif
  'set gxout vector'
  'set ccolor 1'
  'set cthick 4'
  'set z 5'
  'set arrscl .2 .15'
  '/data/bricec/grads/xvort.gs'
  '/data/bricec/grads/yvort.gs'
  'd skip(xvort,5,5);yvort'
  'set z 'zvar4
*  '/data/bricec/grads/xvort.gs'
*  '/data/bricec/grads/yvort.gs'
*  'set arrscl .5 2'
*  'd skip(xvort,5,5);yvort'
  'set gxout shaded'
  'set dfile 1'
*  endif
*  if (var4=thpert)
*  'set z 1'
*  'set ccolor 0'
*  'd skip(uinterp,10,10);vinterp'
*  'set gxout contour'
*  'set cmin 20'
*  'set ccolor 1'
*  'd dbz'
*  endif
  'set z 'zwrd
  'draw title 'var4

  label = t + 100

  'print -o surge'label'.eps'
  '!convert +antialias -density 300 surge'label'.eps surge'label'.gif'
  '!rm surge'label'.eps'

*  'swap'
*  'q pos'
  t = t + 1
endwhile

'!convert +antialias -loop 0 -density 300 -delay 60 -dispose Background surge*.gif surge_loop.gif'
'!rm surge[1-9]*.gif'
