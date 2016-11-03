* Script to calculate the max/min for a variable at every model level. This
* can be used with timeheight_cm1.m in order to make a shaded time/height plot.
* Author:  Brice Coffer, NCSU
* Last modified:  30 June 2014

* enter data file (1=cm1out_s, 2=presretrieval)
filenum=1

* enter whether you desire max (1) or min (0)
max = 1

* enter variable
var = pvmass

* number of vertical levels
nz = 115

* enter domain (km)
lon1 = 70
lon2 = 130
lat1 = 70
lat2 = 130

* enter grid-spacinig (m)
dx = 500.0

* enter desired time frame from cm1out
initialtime = 1
maxtime = 121 
* enter timestep of first pressure retrieval combined into allpresretrievals.dat
t0pres=1

****************************************************************
* END OF USER SETTINGS
*****************************************************************

*open file
'reinit'
if (filenum=1)
'open cm1out_s'
endif
if (filenum=2)
'open presretrieval.ctl'
initialtime=initialtime-t0pres+1
maxtime=maxtime-t0pres+1
endif

'set lon 'lon1' 'lon2
'set lat 'lat1' 'lat2

lastlin = 2 + (1000/dx) * math_abs(lat1 - lat2)

setz=1
while(setz<=nz)
sett=initialtime
while(sett<=maxtime)
'set z 'setz
'set t 'sett

*if (var=zvort)
*'/data/bricec/grads/zvort.gs'
*endif

if (var=conv)
'/data/bricec/grads/conv.gs'
endif

if (var=pvmass)
'/data/bricec/grads/masssink.gs'
endif

if (max=1)
'd max(max('var',lon='lon1',lon='lon2'),lat='lat1',lat='lat2')'
else
'd min(min('var',lon='lon1',lon='lon2'),lat='lat1',lat='lat2')'
endif

valuelin=sublin(result,lastlin)
value=subwrd(valuelin,4)

if (max=1)
data=write(var'_max_timeheight.txt',value)
else
data=write(var'_min_timeheight.txt',value)
endif

sett=sett+1
endwhile
setz=setz+1
endwhile


