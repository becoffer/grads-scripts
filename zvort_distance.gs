* Script to calculate output the location of the 0.5 and 3.0 km maximum
* vertical vorticity.
* Author:  Brice Coffer, NCSU
* Last modified:  30 June 2014

*Enter domain to restrict trackvar
lon1= 50 
lon2= 100
lat1= 50
lat2= 100

*Enter grid-spacing in m
dx = 250.0

*Enter times to take mean
initialtime = 36
maxtime = 121

*****************************************************************
* END OF USER SETTINGS
*****************************************************************
*Current version created 022714 by Brice Coffer

*open file
'reinit'
'open cm1out_s'
'set mproj off'
x1= lon1*1000/dx
x2= lon2*1000/dx
y1= lat1*1000/dx
y2= lat2*1000/dx

sett=initialtime
while(sett<=maxtime)
*
* find 0.5 Vertical Vorticity Maximum within box area (x1,x2), (y1,y2)...
*
'set lev 0.5'
'set t 'sett
'set x 'x1
'set y 'y1
'set gxout print'
nxp = x2-x1+1
nyp = y2-y1+1
'd maxloc(max(zvort,y='y1',y='y2'),x='x1',x='x2')'
rec=sublin(result,nxp+3)
xc=subwrd(rec,1)
'd maxloc(max(zvort,x='x1',x='x2'),y='y1',y='y2')'
rec=sublin(result,nyp+3)
yc=subwrd(rec,1)
say 'T='sett
say 'location of maximum 0.5 km Vertical Vorticity...'
say
say ' (xc,yc) = ('xc','yc')'
*
* find "world" coordinates of (xc,yc) and convert "world" coordinates
*
      'set x 'xc
      lonval = subwrd(result,4)
      'set y 'yc
      latval = subwrd(result,4)
      say ' (lonval,latval) = ('lonval','latval')'
*

data=write('zvort_distance.txt',lonval)
data=write('zvort_distance.txt',latval)

*
* find 2.0 Vertical Velocity Maximum within box area (x1,x2), (y1,y2)...
*
'set lev 2.0'
'set t 'sett
'set x 'x1
'set y 'y1
'set gxout print'
nxp = x2-x1+1
nyp = y2-y1+1
'd maxloc(max(winterp,y='y1',y='y2'),x='x1',x='x2')'
rec=sublin(result,nxp+3)
xc=subwrd(rec,1)
'd maxloc(max(winterp,x='x1',x='x2'),y='y1',y='y2')'
rec=sublin(result,nyp+3)
yc=subwrd(rec,1)
say 'T='sett
say 'location of maximum 2.0 km Vertical Velocity...'
say
say ' (xc,yc) = ('xc','yc')'
*
* find "world" coordinates of (xc,yc) and convert "world" coordinates
*
      'set x 'xc
      lonval = subwrd(result,4)
      'set y 'yc
      latval = subwrd(result,4)
      say ' (lonval,latval) = ('lonval','latval')'
*

data=write('zvort_distance.txt',lonval)
data=write('zvort_distance.txt',latval)

sett=sett+1
endwhile


