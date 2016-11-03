* Script to calculate the average value of CM1 output in a specified box.
* Author:  Brice Coffer, NCSU
* Last modified:  14 May 2014

* enter data file (1=cm1out_s, 2=presretrieval)
data=2

* enter variable
var = dpdz

* height of variable (km)
level = 3

* enter domain (km)
lon1 = 75
lon2 = 105
lat1 = 70
lat2 = 100

* enter grid-spacinig (m)
dx = 125.0

* enter desired time frame from cm1out
initialtime = 31
maxtime = 106
* enter timestep of first pressure retrieval combined into allpresretrievals.dat
t0pres=31

****************************************************************
* END OF USER SETTINGS
*****************************************************************
*Current version created 022614 by Brice Coffer

*open file
'reinit'
if (data=1)
'open cm1out_s'
endif
if (data=2)
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

* comment out set lev and d in script
if (var=wstretch)
'/data/bricec/grads/wstretch.gs'
endif

* comment out set lev and d in script
if (var=wtilt)
'/data/bricec/grads/wtilt.gs'
endif

if (var=dpdz)
'q dims'
zlin  = sublin(result,4)
zwrd  = subwrd(zlin,9)
'dpdz = (-1/rhobar)*(((pprt(z='zwrd+1')-pprt(z=1))-(pb(z='zwrd+1')-pb(z=1)))/(1000*(lev(z='zwrd+1')-lev(z=1))))'
endif

* calculate thpert if needed
if (var=thpert)
'define thpert=th-th(t=1)'
'define thpert=maskout(thpert,0.0-thpert)'
endif
 
if (max=1)
'd ave(ave('var',lon='lon1',lon='lon2'),lat='lat1',lat='lat2')'
else
'd ave(ave('var',lon='lon1',lon='lon2'),lat='lat1',lat='lat2')'
endif

valuelin=sublin(result,lastlin)
value=subwrd(valuelin,4)

data=write(var'_ave_'level'km.txt',value)

sett=sett+1

if (var=thpert)
'undefine thpert'
endif

endwhile

