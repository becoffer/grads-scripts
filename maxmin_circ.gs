* enter domain (km)
lon1 = 75
lon2 = 95
lat1 = 75
lat2 = 95

* height of variable (km)
level = 1.01

* enter grid-spacinig (m)
dx = 125.0

* enter desired time frame from cm1out
initialtime = 1
maxtime = 121

* enter whether you desire max (1) or min (0)
max = 1

'/data/bricec/grads/open.gs'

lastlin = 3 + (1000/dx) * math_abs(lat1 - lat2)

n=initialtime
while(n<=maxtime)
'set t 'n

*set dimensions
'set lon 'lon1' 'lon2
'set lat 'lat1' 'lat2
'set lev 'level

* Script to calculate circulation.
* Author:  Brice Coffer, NCSU
* Last modified:  14 Oct 2015

* enter diameter of ring to calculate circulation (m)
diameter = 2000.0

* get dimensions
'q dims'
x1lin=sublin(result,2)
x1wrd=subwrd(x1lin,11)
x1=math_nint(x1wrd)
x2lin=sublin(result,2)
x2wrd=subwrd(x2lin,13)
x2=math_nint(x2wrd)
y1lin=sublin(result,3)
y1wrd=subwrd(y1lin,11)
y1=math_nint(y1wrd)
y2lin=sublin(result,3)
y2wrd=subwrd(y2lin,13)
y2=math_nint(y2wrd)

pi=3.14159265359
nx=x2-x1+1
ny=y2-y1+1

'q dims'
lonlin=sublin(result,2)
lonwrd=subwrd(lonlin,6)
latlin=sublin(result,3)
latwrd=subwrd(latlin,6)

* calculate vorticity
'set x 'x1+2' 'x2+2
'set y 'y1+2' 'y2+2
'define zvort = (cdiff(vinterp,x) - cdiff(uinterp,y)) / (2*'dx')'
'set x 'x1' 'x2
'set y 'y1' 'y2


* calculate circulation
say 'calculating circulation...'
'set gxout shaded'
j=1
while(j<=ny)
  i=1
  while(i<=nx)
    lonpos=(i-1)*(dx/1000)+lonwrd
    latpos=(j-1)*(dx/1000)+latwrd
    'define radius=sqrt(pow(lon-'lonpos',2)+pow(lat-'latpos',2))'
    'define maskzvort=maskout(zvort,('diameter'/2/1000)-radius)'
    'set gxout stat'
    'd maskzvort'
    zvortlin=sublin(result,11)
    avezvort=subwrd(zvortlin,2)
    circ.i.j=avezvort*pi*(diameter/2)*(diameter/2)
*    say 'i='i' j='j' circ.i.j='circ.i.j
    i=i+1
  endwhile
  j=j+1
endwhile

* writeout .dat file
say 'writing output to circ.dat'
'set gxout fwrite'
'set fwrite circ.dat'
'set x 1'
'set y 1'
j=1
while(j<=ny)
  i=1
  while(i<=nx)
    'd uinterp*0 + 'circ.i.j
  i=i+1
  endwhile
  j=j+1
endwhile
'disable fwrite'
'set gxout shaded'
'set x 'x1' 'x2
'set y 'y1' 'y2

* create a .ctl file on the fly
say 'writing .ctl for circ.dat'
ctlfile='circ.ctl'
result=write(ctlfile,'dset ./circ.dat')
'q undef'
undefval=subwrd(result,7)
result=write(ctlfile,'undef 'undefval)
result=write(ctlfile,'title circulation')
result=write(ctlfile,'xdef 'nx' linear 'lonwrd' 'dx/1000)
result=write(ctlfile,'ydef 'ny' linear 'latwrd' 'dx/1000)
'q dims'
levlin=sublin(result,4)
level2=subwrd(levlin,6)
result=write(ctlfile,'zdef 1 levels ' level2)
result=write(ctlfile,'tdef 1 linear 00:00Z01JAN2000 1MN')
result=write(ctlfile,'vars 1')
result=write(ctlfile,'circ 1 99 ** 1 km circulation')
result=write(ctlfile,'endvars')
result=close(ctlfile)

* display circulation
'q dims'
timelin=sublin(result,5)
time=subwrd(timelin,9)
'open circ'
'set dfile 2'
'set t 1'
'set z 1'
'c'

'q dims'
x1lin=sublin(result,2)
x1wrd=subwrd(x1lin,11)
x1=math_nint(x1wrd)
x2lin=sublin(result,2)
x2wrd=subwrd(x2lin,13)
x2=math_nint(x2wrd)
y1lin=sublin(result,3)
y1wrd=subwrd(y1lin,11)
y1=math_nint(y1wrd)
y2lin=sublin(result,3)
y2wrd=subwrd(y2lin,13)
y2=math_nint(y2wrd)

'd max(max(circ,X='x1+1',X='x2-1'),Y='y1-1',Y='y2-1')'

valuelin=sublin(result,lastlin)
value=subwrd(valuelin,4)

say 'Max Circulation = 'value' @ t = 'time

data=write('circ_max_'level'km.txt',value)

'undefine radius'
'undefine maskzvort'
say 'removing .ctl & .dat files'
'!rm circ.ctl circ.dat'
say 'returning to original file'
'close 2'
'set t 'time
'set lev 'level

n=n+1
endwhile
