* Script to output the needed sounding info for M. Parker's capecalc program.
* Author:  Brice Coffer, NCSU
* Last modified:  14 May 2014

'reinit'

**** USER SETTINGS ****
* desired x index for sounding dump (this is x point, not physical position)
setx=5
* desired y index for sounding dump (this is y point, not physical position)
sety=5
* dessired t index for sounding dump
sett=1
* umove from your run (to convert winds to ground relative)
umove=9.5
* vmove from your run (to convert winds to ground relative)
vmove=-0.5

***********************
'open cm1out_s.ctl'
'set x 'setx
'set y 'sety
'set t 'sett
'q file'
zlin=sublin(result,5)
zmax=subwrd(zlin,9)
'set gxout stat'
setz=1
while(setz<zmax+1)
'set z 'setz
'd prs/100.0'
dlin=sublin(result,8)
pres=subwrd(dlin,4)
'd th'
dlin=sublin(result,8)
theta=subwrd(dlin,4)
'd qv*1000'
dlin=sublin(result,8)
vapor=subwrd(dlin,4)
'd uinterp+'umove
dlin=sublin(result,8)
u=subwrd(dlin,4)
'd vinterp+'vmove
dlin=sublin(result,8)
v=subwrd(dlin,4)
'd lev*1000.0'
dlin=sublin(result,8)
hght=subwrd(dlin,4)
if(setz=1)
result=write('input_sounding_n'sett,pres' 'theta' 'vapor)
endif
result=write('input_sounding_n'sett,hght' 'theta' 'vapor' 'u' 'v)
setz=setz+1
endwhile

