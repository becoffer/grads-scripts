* Script to plot trajectories and a CM1 variable like dbz.
* Author:  Brice Coffer, NCSU
* Last modified:  14 May 2014

'reinit'
'open cm1out_s.ctl'
'set mproj off'
'set grads off'
'set ylab off'
'set xlab off'

***physical dimensions for the 3-D plot space***
*lona=61.86
*lonb=62.86
*lata=64.8
*latb=65.8
lona=64.13
lonb=65.13
lata=64.29
latb=65.29
leva=0
t=88

***draw the x vs. y plot***
'set parea 1 5.65 1 5.65' 
'set lat 'lata' 'latb
'set lon 'lona' 'lonb
'set lev 'leva
'set t 't

'set gxout shaded'
'/data/bricec/grads/color -.1 .1 .01 -kind blue->green->yellow->red'
'd  zvort'
'/data/bricec/grads/cbarm.gs 1 1 7.5 3.3'
'set string 1 c 5 0'
'draw string 7.5 0.9 ZVORT'

'close 1'
*'/data/bricec/grads/plottraj_control.gs'
'/data/bricec/grads/plottraj_bss.gs'
