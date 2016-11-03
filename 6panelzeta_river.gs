* plotting options
* directory for left side
dirL = '/data/bricec/BSS_ET/Goshen/control/cm1out_s.ctl'
* directory for right side
dirR = '/data/bricec/BSS_ET/Goshen/bss/cm1out_s.ctl'
* times for plotting
t1 = 76
t2 = 86
t3 = 96
* time step for labeling
dt=120

* open file for left side
'reinit'
'open 'dirL
'set display color white'

*modify what you see below if you want to customize your plots'
'c'
'set datawarn off'
'set mproj off'
'set grid off'
'set grads off'
'set arrlab off'
'set string 1 c 5 0'
'set lon 55 70'
'set xlint 10'
'set lat 55 70'
'set ylint 10'

*first panel
'set parea 1 5 6 8'
'set t 't1
'set lev 0'
'set gxout shaded'
'/data/bricec/grads/color -10 10 1 -kind blue->green->yellow->red'
'd  1E2 * zvort'
'set gxout contour'
'set clab off'
'set cthick 10'
'set ccolor 0'
'set clevs 20'
'd dbz'
'set cthick 15'
'set ccolor 4'
'set clevs  10'
'set cstyle 1'
'set lev 1'
'd winterp'
'set string 1 l 5 0'
'draw string 1 8.15 CONTROL t=9000s'

*third panel
'set parea 1 5 3.33 5.33'
'set t 't2
'set lev 0'
'set gxout shaded'
'/data/bricec/grads/color -10 10 1 -kind blue->green->yellow->red'
'd  1E2 * zvort'
'set gxout contour'
'set clab off'
'set cthick 10'
'set ccolor 0'
'set clevs 20'
'd dbz'
'set cthick 15'
'set ccolor 4'
'set clevs  10'
'set cstyle 1'
'set lev 1'
'd winterp'
'set string 1 l 5 0'
'draw string 1 5.48 CONTROL t=10200s'

*fifth panel
'set parea 1 5 .66 2.66'
'set t 't3
'set lev 0'
'set gxout shaded'
'/data/bricec/grads/color -10 10 1 -kind blue->green->yellow->red'
'd  1E2 * zvort'
'set gxout contour'
'set clab off'
'set cthick 10'
'set ccolor 0'
'set clevs 20'
'd dbz'
'set cthick 15'
'set ccolor 4'
'set clevs  10'
'set cstyle 1'
'set lev 1'
'd winterp'
'set string 1 l 5 0'
'draw string 1 2.81 CONTROL t=11400s'
'set string 1 c 5 90'
'draw string 0.5 1.66 z (km)'
'set string 1 c 5 0'
'draw string 3 0.3 x (km)'

*open file for right side
'close 1'
'open 'dirR
'set lon 55 70'
'set xlint 10'
'set lat 55 70'
'set ylint 10'
'set lev 0'

*second panel
'set parea 6 10 6 8'
'set t 't1
'set lev 0'
'set gxout shaded'
'/data/bricec/grads/color -10 10 1 -kind blue->green->yellow->red'
'd  1E2 * zvort'
'set gxout contour'
'set clab off'
'set cthick 10'
'set ccolor 0'
'set clevs 20'
'd dbz'
'set cthick 15'
'set ccolor 4'
'set clevs  10'
'set cstyle 1'
'set lev 1'
'd winterp'
'set string 1 l 5 0'
'draw string 6 8.15 BSS t=9000s (End of BSS)'

*fourth panel
'set parea 6 10 3.33 5.33'
'set t 't2
'set lev 0'
'set gxout shaded'
'/data/bricec/grads/color -10 10 1 -kind blue->green->yellow->red'
'd  1E2 * zvort'
'set gxout contour'
'set clab off'
'set cthick 10'
'set ccolor 0'
'set clevs 20'
'd dbz'
'set cthick 15'
'set ccolor 4'
'set clevs  10'
'set cstyle 1'
'set lev 1'
'd winterp'
'set string 1 l 5 0'
'draw string 6 5.48 BSS t=10200s (End of BSS + 20 min)'

*sixth panel
'set parea 6 10 .66 2.66'
'set t 't3
'set lev 0'
'set gxout shaded'
'/data/bricec/grads/color -10 10 1 -kind blue->green->yellow->red'
'd  1E2 * zvort'
'set gxout contour'
'set clab off'
'set cthick 10'
'set ccolor 0'
'set clevs 20'
'd dbz'
'set cthick 15'
'set ccolor 4'
'set clevs  10'
'set cstyle 1'
'set lev 1'
'd winterp'
'set string 1 l 5 0'
'draw string 6 2.81 BSS t=11400s (End of BSS + 40 min)'

*colorbar
'/data/bricec/grads/jdwag/cbar.newer.gs .55 0 7.95 .2'
'draw string 8.5 .46 Vert. Vorticity 1E2'

