* open file
'reinit'
'open cm1out_s'
'set display color white'
'd th'
'c'

*print image?
print = 1

*timestep for first, second, and third panel
prompt 'Time1?  '
pull time1
prompt 'Time2?  '
pull time2
prompt 'Time3?  '
pull time3

*set simulation
prompt 'Simulation Name?   '
pull sim

*modify what you see below if you want to customize your plots'
'set datawarn off'
'set mproj off'
'set grads off'
'set arrlab off'
'set gxout shaded'
'set string 1 c 5 0'
'set lon 70 95'
'set lat 70 95'
'set z 1'

*first panel
'set parea 1 5 5 8'
'set t 'time1
'grads/nowrad.gs'
'd dbz'
'draw string 3 8.25 'sim'  t = 'time1' min'
'set string 1 c 5 90'
'draw string 0.65 6.5 y (km)'
'set string 1 c 5 0'
'draw string 3 4.7 x (km)'

*second panel
'set parea 6 10 5 8'
'set t 'time2
'grads/nowrad.gs'
'd dbz'
'draw string 8 8.25 'sim' t = 'time2' min'
'set string 1 c 5 90'
'draw string 5.65 6.5 y (km)'
'set string 1 c 5 0'
'draw string 8 4.7 x (km)'

*third panel
'set parea 1 5 .75 3.75'
'set t 'time3
'grads/nowrad.gs'
'd dbz'
'grads/cbarm.gs'
'draw string 3 4 'sim' t = 'time3' min'
'set string 1 c 5 90'
'draw string 0.65 2.25 y (km)'
'set string 1 c 5 0'
'draw string 3 0.45 x (km)'

*print
if (print = 1)
'printim dbz_3panel_'sim'.png'
endif

