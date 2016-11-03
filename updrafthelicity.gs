* GrADS script that calculates updraft helicity in a certain layer
*
* Can do any of the following:
* 1. Display plot of updraft helicity for a layer
* 2. Calculate maximum over a layer
* 3. Calculate average over a layer
* 4. Calculate the footprint area above a certain threshold
*
* Outputted values are written to specified text files
* Note that negative values of wbar, zetabar are masked out before UH calculation
*
* Created by Chris MacIntosh, Modified by Brice Coffer
* Last modified 28 Oct 2013

*'reinit'
*'open cm1out_s'
*'set mproj off'

* Display or output text file? (1=display,2=max value,3=average,4=footprint)
option=4

* Set time if display option chosen
t=61

* Specify the layer you want to use (lev2 > lev1); applies to all options
lev1=2
lev2=5

* Set time for max/average/footprint
maxti=1
maxtf=121

* Set lat/lon for max/average/footprint
lon1=70
lon2=130
lat1=70
lat2=130

* wbar threshold for average calculation
wbarthresh=5.0

* Updraft helicity threshold for footprint
footthresh=250.0

* Grid spacing
dx=500.0

********** End user settings **********

* display
'c'
if(option=1)
*'set t 't
*'set lon 'lon1' 'lon2
*'set lat 'lat1' 'lat2
'set gxout shaded'

'define wbar=ave(winterp,lev='lev1',lev='lev2')'
*'/data/bricec/grads/zvort.gs'
'define zetabar=ave(zvort,lev='lev1',lev='lev2')'
'define uh=maskout(wbar,wbar)*maskout(zetabar,zetabar)*('lev2'-'lev1')*1000'
'set ccols   0  14   4   11    5    3   10    7   12    8    2   6'
'set clevs 400 600 800 1000 1200 1400 1600 1800 2000 2200 2400'
'd uh'

*'/data/bricec/grads/cbarm.gs'

else

sett=maxti
while(sett<=maxtf)

'set t 'sett

'define wbar=ave(winterp,lev='lev1',lev='lev2')'
'define zetabar=ave(zvort,lev='lev1',lev='lev2')'
'define uh=maskout(wbar,wbar)*maskout(zetabar,zetabar)*('lev2'-'lev1')*1000'

* max
if(option=2)
'd max(max(uh,lon='lon1',lon='lon2'),lat='lat1',lat='lat2')'
valuelin=sublin(result,2+(1000/dx)*(math_abs(lat1)+math_abs(lat2)))
value=subwrd(valuelin,4)
data=write('uh_'lev1'to'lev2'km_max.txt',value)
endif

* average
if(option=3)
'd aave(maskout(uh,wbar-'wbarthresh'),lon='lon1',lon='lon2',lat='lat1',lat='lat2')'
value=subwrd(result,4)
data=write('uh_'lev1'to'lev2'km_aave.txt',value)
endif

* footprint
if(option=4)
'set gxout stat'
'd maskout(uh,uh-'footthresh')'
valuelin=sublin(result,7)
value=subwrd(valuelin,8)
data=write('uh_'lev1'to'lev2'km_footprint.txt',value*dx*dx)
endif

sett=sett+1
endwhile
endif

