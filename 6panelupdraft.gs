* Script to plot reflectivity in 6 panels
* Author:  Brice Coffer, NCSU
* Last modified:  14 May 2014

* plotting options

* directory for left side
dirL = '/data/bricec/ntV2/cm1out_s.ctl'
* directory for right side
dirR = '/data/bricec/torV2/cm1out_s.ctl'
* times for plotting
t1 = 66
t2 = 76
t3 = 86
* time step for labeling
dt=60

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
'set strsiz .05'
'set lon 75 95'
'set xlint 10'
'set lat 70 90'
'set ylint 10'
'set lev 1'
'set xlopts 1 3 .05'
'set ylopts 1 3 .05'
'q dims'
zlin  = sublin(result,4)
zwrd  = subwrd(zlin,9)

*first panel
'set parea 3 5 6 8'
'set t 't1
'set gxout shaded'
'/data/bricec/grads/color -25 25 0.25 -kind BrBG'
'd winterp'
'set grid off'
'set string 1 l 5 0'
'set strsiz .05'
'draw string 3 8.15 Non-tornadic V2 t=65min'

*third panel
'set parea 3 5 3.33 5.33'
'set t 't2
'set gxout shaded'
'/data/bricec/grads/color -25 25 0.25 -kind BrBG'
'd winterp'
'set grid off'
'set string 1 l 5 0'
'set strsiz .05'
'draw string 3 5.48 Non-tornadic V2 t=75min'

*fifth panel
'set parea 3 5 .66 2.66'
'set t 't3
'set gxout shaded'
'/data/bricec/grads/color -25 25 0.25 -kind BrBG'
'd winterp'
'set grid off'
'set string 1 l 5 0'
'set strsiz .05'
'draw string 3 2.81 Non-tornadic V2 t=85min'
'set string 1 c 5 90'
'set strsiz .05'
'draw string 2.5 1.66 y (km)'
'set string 1 c 5 0'
'set strsiz .05'
'draw string 4 0.3 x (km)'

*open file for right side
'close 1'
'open 'dirR
* times for plotting
t1 = 46
t2 = 56
t3 = 66
'set lon 70 90'
'set xlint 10'
'set lat 70 90'
'set ylint 10'
'set lev 1'

*second panel
'set parea 6 8 6 8'
'set t 't1
'set gxout shaded'
'/data/bricec/grads/color -25 25 0.25 -kind BrBG'
'd winterp'
'set grid off'
'set string 1 l 5 0'
'set strsiz .05'
'draw string 6 8.15 Tornadic V2 t=46min'

*fourth panel
'set parea 6 8 3.33 5.33'
'set t 't2
'set gxout shaded'
'/data/bricec/grads/color -25 25 0.25 -kind BrBG'
'd winterp'
'set grid off'
'set string 1 l 5 0'
'set strsiz .05'
'draw string 6 5.48 Tornadic V2 t=56min'

*sixth panel
'set parea 6 8 .66 2.66'
'set t 't3
'set gxout shaded'
'/data/bricec/grads/color -25 25 0.25 -kind BrBG'
'd winterp'
'set grid off'
'set string 1 l 5 0'
'set strsiz .05'
'draw string 6 2.81 Tornadic V2 t=66min'

*colorbar
'set strsiz .05'
*'/data/bricec/grads/old/jdwag/cbar.newer.gs .45 0 6.35 .25'
'set strsiz .05'
'draw string 8.2 .43 m/s'

