* Script to output the needed sounding info the the NCL skewt script
* Author:  Brice Coffer, NCSU
* Last modified:  14 May 2014

**** SET UMOVE,VMOVE ****
umove=9.5
vmove=-0.5
*************************

say 'DID YOU SET X AND Y TO FIXED VALUES?'
say '************************************'
say 'output file name prefix? (.gradsound automatically appended)'
pull outf
'q file'
zlin=sublin(result,5)
zmax=subwrd(zlin,9)
'set gxout stat'
setz=1
while(setz<zmax+1)
'set z 'setz
*'define t=pt*pow(p/100000,0.286)'
*'define tc=t-273.15'
*'define e=qv*p/(qv+0.622)'
*'define tdc=1/(0.07257/log(e/611.2)-0.004107)'
*'define wspd=mag(u,v)'
*'define wdir=270.0 - ( atan2(V,U) * 180.0/3.1416 )'
'define t=th*pow(prs/100000,0.286)'
'define tc=t-273.15'
'define e=qv*prs/(qv+0.622)'
'define tdc=1/(0.07257/log(e/611.2)-0.004107)'
'define wspd=mag(uinterp+'umove',vinterp+'vmove')'
'define wdir=270.0 - ( atan2(vinterp+'vmove',uinterp+'umove') * 180.0/3.1416 )'
*'d lev'
'd lev*1000.0'
dlin=sublin(result,8)
hght=subwrd(dlin,4)
*'d p/100.0'
'd prs/100.0'
dlin=sublin(result,8)
pres=subwrd(dlin,4)
'd tc'
dlin=sublin(result,8)
temp=subwrd(dlin,4)
'd tdc'
dlin=sublin(result,8)
dewp=subwrd(dlin,4)
'd wspd'
dlin=sublin(result,8)
sped=subwrd(dlin,4)
'd wdir'
dlin=sublin(result,8)
azim=subwrd(dlin,4)
result=write(outf'.gradsound',hght' 'pres' 'temp' 'dewp' 'sped' 'azim)
setz=setz+1
endwhile
