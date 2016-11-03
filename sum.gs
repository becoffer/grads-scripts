* Script to calculate a the sum of a variable.
* Author:  Brice Coffer, NCSU
* Last modified:  1 Sep 2014

* enter variable
var = qr

* height of variable (km)
level = 0

* enter domain (km)
lon1 = 50
lon2 = 90
lat1 = 50
lat2 = 90

* enter grid-spacinig (m)
dx = 250.0

* enter desired time frame from cm1out
initialtime = 33
maxtime = 121

****************************************************************
* END OF USER SETTINGS
*****************************************************************

*open file
'reinit'
'open cm1out_s'

*set dimensions
'set lon 'lon1' 'lon2
'set lat 'lat1' 'lat2
'set lev 'level

sett=initialtime
while(sett<=maxtime)
'set t 'sett
'q dims'

'd asum('var',lon='lon1',lon='lon2',lat='lat1',lat='lat2')'

value=subwrd(result,4)
say value
data=write(var'_sum_'level'km.txt',value)

sett=sett+1
endwhile

