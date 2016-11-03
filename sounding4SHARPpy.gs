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
* height of sounding above MSL
zheight=1442.2
* enter station identifer
station='V2N'
* enter data & time
date='100526/002123'

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
result=write(outf'.gradsound', '%TITLE%')
result=write(outf'.gradsound', station' 'date)
result=write(outf'.gradsound', '')
* LEVEL = Pressure (mb)
* HGHT  = Height above MSL (m; terrain + model height)
* TEMP  = Temperature (C)
* DWPT  = Dewpoint temperature (C)
* WDIR  = Wind direction (deg)
* WSPD  = Wind speed (knots)
result=write(outf'.gradsound', 'LEVEL  HGHT  TEMP  DWPT WDIR  WSPD')
result=write(outf'.gradsound', '----------------------------------')
result=write(outf'.gradsound', '%RAW%')
setz=1
while(setz<zmax+1)
'set z 'setz
'define e=qv*prs/(qv+0.622)'
'd prs/100.0'
dlin=sublin(result,8)
pres=subwrd(dlin,4)
'd (th*pow(prs/100000,(287.04/1005.7)))-273.15'
dlin=sublin(result,8)
temp=subwrd(dlin,4)
'd 1/(0.07257/log(e/611.2)-0.004107)'
dlin=sublin(result,8)
dewp=subwrd(dlin,4)
'd 270 - atan2(vinterp+'vmove',uinterp+'umove')*57.29578'
dlin=sublin(result,8)
wdir=subwrd(dlin,4)
if (wdir > 360.0) ; wdir = wdir - 360.0 ; endif
'd mag(uinterp+'umove',vinterp+'vmove')*1.94384'
dlin=sublin(result,8)
wspd=subwrd(dlin,4)
'd lev*1000.0 + 'zheight
dlin=sublin(result,8)
hght=subwrd(dlin,4)
result=write(outf'.gradsound', pres', 'hght', 'temp', 'dewp', 'wdir', 'wspd)
setz=setz+1
endwhile
result=write(outf'.gradsound', '%END%')

