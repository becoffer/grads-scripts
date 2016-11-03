* Script to calculate a max/min value in a specified box.
* Author:  Brice Coffer, NCSU
* Last modified:  14 May 2014

* enter data file (1=cm1out_s, 2=presretrieval)
filenum=2

* enter whether you desire max (1) or min (0)
max = 1

* enter variable
var = dpdz

* height of variable (km)
level = 0.5

* enter domain (km)
lon1 = 60
lon2 = 100
lat1 = 60
lat2 = 100

* enter grid-spacinig (m)
dx = 125.0

* enter desired time frame from cm1out
initialtime = 1
maxtime = 121
* enter timestep of first pressure retrieval combined into allpresretrievals.dat
t0pres=1

****************************************************************
* END OF USER SETTINGS
*****************************************************************
*Current version created 022614 by Brice Coffer

*open file
'reinit'
if (filenum=1)
'open cm1out_s'
endif
if (filenum=2)
'open allpresretrievals.ctl'
initialtime=initialtime-t0pres+1
maxtime=maxtime-t0pres+1
endif

*set dimensions
'set lon 'lon1' 'lon2
'set lat 'lat1' 'lat2
'set lev 'level

lastlin = 2 + (1000/dx) * math_abs(lat1 - lat2)

sett=initialtime
while(sett<=maxtime)
'set t 'sett
'q dims'
zlin  = sublin(result,4)
zwrd  = subwrd(zlin,9)

* comment out set lev and d in script
if (var=wstretch)
'/data/bricec/grads/wstretch.gs'
endif

* comment out set lev and d in script
if (var=wtilt)
'/data/bricec/grads/wtilt.gs'
endif

if (var=dpdz)
'dpdz = (-1/rhobar)*(((pprt(z='zwrd+1')-pprt(z=1))-(pb(z='zwrd+1')-pb(z=1)))/(1000*(lev(z='zwrd+1')-lev(z=1))))'
*'dpdz = accd(z='zwrd+1')-accd(z=1)'
endif

if (max=1)
'd max(max('var',lon='lon1',lon='lon2'),lat='lat1',lat='lat2')'
else
'd min(min('var',lon='lon1',lon='lon2'),lat='lat1',lat='lat2')'
endif

valuelin=sublin(result,lastlin)
value=subwrd(valuelin,4)

if (max=1)
data=write(var'_max_'level'km.txt',value)
else
data=write(var'_min_'level'km.txt',value)
endif

sett=sett+1
endwhile

