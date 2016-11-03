* Script to nicely plot vorticity values from the CM1 output
* Author:  Brice Coffer, NCSU
* Last modified:  14 May 2014

'c'
'set grads off'
'set grid off'
'set vrange -.01 1.201'
'set xaxis 0 2 .25'
'set cmark 2'
'd vortsfc'
'set cmark 4'
'd vort1km'
'set cmark 8'
'd vort3km'
'draw xlab Time (hr)'
'draw ylab Vertical Vorticity (s-1)'
'draw title V2 Tornadic Supercell'
'/data/bricec/grads/cbar_line -x 2.66468 -y 7.04398 -c 1 3 7 -m 2 4 8 -l 1 1 1 -t "Surface" "1km" "3km"'
