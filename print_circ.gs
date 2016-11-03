t1=2
t2=61

n=t1
while(n<=t2)
'set t 'n
'/data/bricec/grads/circulations.gs'
'c'
'set grads off'
'set grid off'
'set timelab off'
*'set clevs -0.005 -0.004 -0.003 -0.001 0 0.001 0.002 0.003 0.004 0.005'
'/data/bricec/grads/color.gs -.003 .003 .00003 -kind BuYe'
'd circulation'
'/data/bricec/grads/xcbar.gs -fs 50 -lc 1'
'draw title Idealized VORTEX2 Tornadic: 1 km Circulation t='n-1' min'
'set gxout contour'
'set clevs 10'
'set ccolor 1'
'set cthick 12'
'set clab off'
*'d dbz'
'set clevs 10'
'set ccolor 2'
'set cthick 12'
'set clab off'
'd winterp'
'set gxout vector'
'set ccolor 1'
'set cthick 4'
'set arrscl .25 15'
'd skip(uinterp-uinterp(t=1),2,2);(vinterp-vinterp(t=1))'
'printim circ_torV2_n'n'_1km.png'

n=n+1
endwhile
