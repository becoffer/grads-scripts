* Script to output the needed sounding info for M. Parker's capecalc program.
* Author:  Brice Coffer, NCSU
* Last modified:  14 May 2014

'reinit'

**** USER SETTINGS ****
* desired x index for sounding dump (this is x point, not physical position)
setx=1
* desired y index for sounding dump (this is y point, not physical position)
sety=1
* dessired t index for sounding dump
sett=1
* umove from your run (to convert winds to ground relative)
umove=15.835
* vmove from your run (to convert winds to ground relative)
vmove=17.586

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
setz=1
while(setz<zmax+1)
'set z 'setz
'define t=th*pow(prs/100000,(287.04/1005.7))'
'define tc=t-273.15'
'define e=qv*prs/(qv+0.622)'
'define tdc=1/(0.07257/log(e/611.2)-0.004107)'
'define esl=611.2*exp(17.67*(t-273.15 )/(t-29.65))'
'define qvs=0.6219718*esl/(prs-esl)'
'define rh=100.0*qv/qvs'
'd prs/100.0'
dlin=sublin(result,8)
pres=subwrd(dlin,4)
'd tc'
dlin=sublin(result,8)
temp=subwrd(dlin,4)
'd tdc'
dlin=sublin(result,8)
dewp=subwrd(dlin,4)
'd rh'
dlin=sublin(result,8)
rh=subwrd(dlin,4)
'd uinterp+'umove
dlin=sublin(result,8)
u=subwrd(dlin,4)
'd vinterp+'vmove
dlin=sublin(result,8)
v=subwrd(dlin,4)
'd lev*1000.0'
dlin=sublin(result,8)
hght=subwrd(dlin,4)
result=write(outf'.gradsound',pres' 'temp' 'dewp' 'rh' 'u' 'v' 'hght)
setz=setz+1
endwhile

