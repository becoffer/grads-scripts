* Script to output the needed sounding info for SHARPpy from CM1.
* Author:  Brice Coffer, NCSU
* Last modified:  20 Jun 2015

'reinit'

**** USER SETTINGS ****
* desired x index for sounding dump (this is x point, not physical position)
setx=1
* desired y index for sounding dump (this is y point, not physical position)
sety=1
* dessired t index for sounding dump
sett=1
* umove from your run (to convert winds to ground relative)
umove=2.4768
* vmove from your run (to convert winds to ground relative)
vmove=3.2868

***********************
'open cm1out_s.ctl'
'set x 'setx
'set y 'sety
'set t 'sett
say 'output file name prefix? (.gradsound automatically appended)'
pull outf
'q file'
zlin=sublin(result,5)
zmax=subwrd(zlin,9)
'set gxout stat'
* HGHT  = Height above MSL (m; terrain + model height)
* WSPD  = Wind speed (m/s)
* WDIR  = Wind direction (deg)
setz=1
while(setz<zmax+1)
'set z 'setz
'd lev*1000.0'
dlin=sublin(result,8)
hght=subwrd(dlin,4)
'd mag(uinterp+'umove',vinterp+'vmove')'
dlin=sublin(result,8)
wspd=subwrd(dlin,4)
'd 270 - atan2(vinterp+'vmove',uinterp+'umove')*57.29578'
dlin=sublin(result,8)
wdir=subwrd(dlin,4)
if (wdir > 360.0) ; wdir = wdir - 360.0 ; endif
result=write(outf'.fourDDsound', hght' 'wspd' 'wdir)
setz=setz+1
endwhile

