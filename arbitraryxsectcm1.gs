*****************************************************************
******  PLOTS ARBITRARY CROSS SECTION OF OUTPUT FROM CM1  *******
****** (assumes a grid where 1 deg lat = 1 deg lon = 1 km) ******
*****************************************************************

*** NOTE ***
*** This does not work especially well unless you have a reasonably large
*** range of longitude values, as it does a loop where it interpolates 
*** one longitude at a time

*** USER DEFINED SETTINGS ***

* variable names to use 
*    (you may also shade or contour twind and pwind, which are the wind 
*    components tangent and perpendicular to the cross section)
shadevar='mptend'
ctourvar='winterp'
uwindvar='uinterp'
vwindvar='vinterp'
wwindvar='winterp'

* cross section dimensions (NOTE: lon2 must be > lon1)
lon1 = 80.0  
lon2 = 120.0
lat1 = 80
lat2 = 120
lev1 = 0.01
lev2 = 12.0
time = 101

* plot these items? (0 or 1)
plotshade=1
plotctour=1
plotvectr=1

* shading settings (manual settings used if autoshade=0)
autoshade=1
shadmin=10.0
shadmax=60.0
shadint=5.0
plotcbar=1
* use 9-point smoother?
shadsmooth=1

* contour settings (manual settings used if autocont=0)
autocont=0
contmin=5
contmax=30
contint=5
contcol=1
contthk=10
* use 9-point smoother?
contsmooth=0

* vector settings (manual settings used if autovect=0)
autovect=0
vectscale=40
vecthskip=1
vectvskip=1
vectcol=1
* use 9-point smoother?
vectsmooth=0

*** END OF SETTINGS ***

*****************************************************************
******                  MAIN DRIVER CODE                   ******
*****************************************************************

*** get set up ***
'reinit'
'open cm1dump.ctl'
'set display color white'
'd th'
'c'
'set grads off'
'set parea 1 10 1 7.5'
'set t 'time

if(lon2<=lon1)
say '*************************************************'
say 'ERROR: lon2 must be larger than lon1... stopping.'
say '*************************************************'
endif
if(lon2>lon1)

*** compute some things that define the plot area ***
'set lev 'lev1
'q dims'
zlin=sublin(result,4)
z1=subwrd(zlin,9)
'set lev 'lev2
'q dims'
zlin=sublin(result,4)
z2=subwrd(zlin,9)
'set z 'z1' 'z2
numz=1+z2-z1

xlab1=0
a=math_pow(lon2-lon1,2);
b=math_pow(lat2-lat1,2);
xlab2=math_sqrt(a+b);
say ' '
say 'CROSS SECTION LENGTH IS 'xlab2' km'

angle=math_atan2(lat2-lat1,lon2-lon1)
say 'CROSS SECTION ANGLE (math, not azimuth) IS 'angle*180/3.1416' degrees'
say ' '

*** compute the wind component tangent to the cross sectio ***
'set lon 'lon1' 'lon2
if(lat2>lat1)
'set lat 'lat1' 'lat2
endif
if(lat1>lat2)
'set lat 'lat2' 'lat1
endif
'define twind=mag('uwindvar','vwindvar')*cos(atan2('vwindvar','uwindvar')-'angle')'
'define pwind=mag('uwindvar','vwindvar')*sin(atan2('vwindvar','uwindvar')-'angle')'


*** do the interpolation ***
'set x 1'
'set y 1'
lon = lon1
'collect 1 free'
while (lon<=lon2)
  lat = lat1 + (lat2-lat1)*(lon-lon1) / (lon2-lon1)
  'collect 1 gr2stn('shadevar','lon','lat')'
  'collect 2 gr2stn('ctourvar','lon','lat')'
  'collect 3 gr2stn(twind,'lon','lat')'
  'collect 4 gr2stn('wwindvar','lon','lat')'
  lon = lon + 1
*  say lat
*  say lon
endwhile

'set x 14 16'
'set xaxis 'xlab1' 'xlab2

if(plotshade=1)
'set gxout shaded'
if(autoshade=0)
'set cmin 'shadmin
'set cmax 'shadmax
'set cint 'shadint
'set rbrange 'shadmin' 'shadmax
endif
*'/data/bricec/grads/rgb_temp.gs'
*'/data/bricec/grads/color -1e-4 1e-4 1e-6 -kind PuOj'
if(shadsmooth=1)
'd smth9(coll2gr(1,'numz'))'
endif
if(shadsmooth=0)
'd coll2gr(1,'numz')'
endif
if(plotcbar=1)
'grads/cbarm.gs 1 1 10.25 4.25'
endif
endif

if(plotctour=1)
'set gxout contour' 
'set ccolor 1'
if(autocont=0)
'set cmin 'contmin
'set cmax 'contmax
'set cint 'contint
'set ccolor 'contcol
'set cthick 'contthk
endif
'set clab forced'
if(contsmooth=1)
'd smth9(coll2gr(2,'numz'))'
endif
if(contsmooth=0)
'd coll2gr(2,'numz')'
endif
endif

if(plotvectr=1)
'set gxout vector'
'set cthick 1'
if(autovect=0)
'set ccolor 'vectcol
'set arrscl 0.5 'vectscale
if(vectsmooth=1)
'd skip(smth9(coll2gr(3,'numz')),'vecthskip','vectvskip');smth9(coll2gr(4,'numz'))'
endif
if(vectsmooth=0)
'd skip(coll2gr(3,'numz'),'vecthskip','vectvskip');coll2gr(4,'numz')'
endif
endif
if(autovect=1)
'set ccolor 1'
if(vectsmooth=1)
'd smth9(coll2gr(3,'numz'));smth9(coll2gr(4,'numz'))'
endif
if(vectsmooth=0)
'd coll2gr(3,'numz');coll2gr(4,'numz')'
endif
endif
endif

'set strsiz 0.17 0.17'
'set string 1 c 5 0'
'draw string 5.5 0.5 Cross-Section Distance (km)'
'set string 1 c 5 90'
'draw string 0.4 4.25 z (km)'
'set string 1 l 5 0'
'draw string 0.5 0.5 t = 100 min'
'set string 1 c 5 0'
'draw string 5.5 8 Potential Temperature Tendency (shaded; K s-1), Vertical Velocity (contour; m/s)'


endif
