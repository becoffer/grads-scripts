*Enter desired pressure perturbation (shaded) 
*accb = buoyant 
*accd = dynamic
*acct  = total 
var1 = accd
*Calculate mean VPPGF (1=yes)?
mean = 1
*If mean = 1, enter depth in km of VPPGF integration (assumes bottom point is ~0km)
*Else, enter level in km to display (must be above lev = 0 due to vertical differencing)
lev1 = 1.0

*Enter variable 2 (contoured white)
var2 = dbz

*Enter variable 3 (contoured black)
var3 = zvort

*Enter time of analysis for cm1out
t  = 60
*Enter output timestep
dt = 60

*Enter title string
titlestring = '0-3km Mean Dynamic VPPGF & BREF'
*Print? 1=yes 0=no
print = 0

*****************************************************************
* END OF USER SETTINGS
*****************************************************************
* Current version created 101713 by Brice Coffer
* Only modify what you see below if you want to customize your plots'
* Assumes retrieved pressure ctl file already exists

*set grads 
'reinit'
'c'
'set datawarn off'
'set mproj off'
'set grads off'
'set arrlab off'
'set clab off'
'set string 1 c 5 0'
'set parea 1 10 2 8'
'set display color white'

*open files
'open presretrieval'
'd w'
'c' 
'open ../cm1out_s'

*calculate acct and mean accb, accd, and acct if needed
'set lev ' lev1
'q dims'
zlin  = sublin(result,4)
zwrd  = subwrd(zlin,9)
if(var1=acct)
'define acct=accb+accd'
endif
if (mean=1)
if (var1=accb)
'accb = accb(z='zwrd+1')-accb(z=2)'
endif
if (var1=accd)
'accd = accd(z='zwrd+1')-accd(z=2)'
endif
if (var1=acct)
'acct  = (accb(z='zwrd+1')-accb(z=1))+(accd(z='zwrd+1')-accd(z=1))'
endif
endif

*plot variables 
'set lon 70 95'
'set lat 70 95'
'set dfile 1'
'set t 1'
'set lev 'lev1
'set gxout shaded'
'set clevs -.5 -.4 -.3 -.2 -.1 0 .1 .2 .3 .4 .5'
'set ccols 9 14 4 11 5 13 10 7 12 8 2 6'
'd 'var1
'/data/bricec/grads/cbarm.gs'
'set dfile 2'
'set z 1'
'set t 't
'set gxout contour'
'set ccolor 1'
if (var2=dbz | var2=cref)
'set clevs 20'
'set cthick 12'
endif
'd ' var2
'set z 1'
'set ccolor 15'
if (var3=zvort)
'/data/bricec/grads/zvort.gs'
'set cmin .1'
'set cint .01'
endif
'd ' var3

*draw title, axes, & labels
time=(t-1)*dt
'draw title 'titlestring '  n='t ', t='time
'draw xlab x (km)'
'draw ylab y (km)'
'draw string 10.3 .9 m/s2'

*print out images if required
if (print=1)
'printim 'var1 var2 time'.png'
endif



