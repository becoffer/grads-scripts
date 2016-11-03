* Script to plot CM1 dbz versus NEXRAD created by WCT
* Author:  Brice Coffer, NCSU
* Last modified:  14 May 2014

* plotting options
* directory for right side
dirR = '/data/bricec/no_slip/torV2/cm1out_s.ctl'
* times for plotting
t1 = 52
t2 = 56
t3 = 60
* time step for labeling
dt=60

'reinit'
'set display color white'

*modify what you see below if you want to customize your plots'
'c'
'set datawarn off'
'set mproj off'
'set grid off'
'set grads off'
'set arrlab off'
'set string 1 c 5 0'
'set xlint .1'
'set ylint .1'
'set gxout shaded'

*first panel
'sdfopen /data/bricec/KCYS_V03_20090605_213435.nc'
'set parea 1 5 6 8'
'set lon -104.8 -104.2'
'set lat 41.5 42'
'/data/bricec/grads/nowrad.gs'
'd reflectivity'
'set string 1 l 5 0'
'draw string 1 8.15 KCYS - 21:34 UTC'

*third panel
'close 1'
'sdfopen /data/bricec/KCYS_V03_20090605_220203.nc'
'set parea 1 5 3.33 5.33'
'set lon -104.6 -104'
'set lat 41.5 42'
'/data/bricec/grads/nowrad.gs'
'd reflectivity'
'set string 1 l 5 0'
'draw string 1 5.48 KCYS - 22:02 UTC'

*fifth panel
'close 1'
'sdfopen /data/bricec/KCYS_V03_20090605_223405.nc'
'set parea 1 5 .66 2.66'
'set lon -104.3 -103.7'
'set lat 41.5 42'
'/data/bricec/grads/nowrad.gs'
'd reflectivity'
'set string 1 l 5 0'
'draw string 1 2.81 KCYS - 22:34 UTC'
*'set string 1 c 5 90'
*'draw string 0.5 1.66 z (km)'
*'set string 1 c 5 0'
*'draw string 3 0.3 x (km)'

*open file for right side
'close 1'
'open 'dirR
'set lon 70 95'
'set xlint 5'
'set lat 70 95'
'set ylint 5'
'set z 1'

*second panel
'set parea 6 10 6 8'
'set t 't1
'/data/bricec/grads/nowrad.gs'
'd dbz'
'set string 1 l 5 0'
'draw string 6 8.15 VORTEX2 Tornadic t=51min'

*fourth panel
'set parea 6 10 3.33 5.33'
'set t 't2
'/data/bricec/grads/nowrad.gs'
'd dbz'
'set string 1 l 5 0'
'draw string 6 5.48 VORTEX2 Tornadic t=55min'

*sixth panel
'set parea 6 10 .66 2.66'
'set t 't3
'/data/bricec/grads/nowrad.gs'
'd dbz'
'set string 1 l 5 0'
'draw string 6 2.81 Goshen Low Shear t=59min'

*colorbar
*'/data/bricec/grads/old/jdwag/cbar.newer.gs .55 0 7.95 .2'
'draw string 10.2 .42 ~dBZ'

