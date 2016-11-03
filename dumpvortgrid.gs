'reinit'
'open vortgrids.ctl'

*********************** USER SETTINGS ************************************
* first time to output
tstart=1
* last time to output
tend=1

* domain to output
xone=25
xtwo=826
yone=25
ytwo=826
zone=1
ztwo=116

***************************************************************************
sett=tstart
while(sett<=tend)

tdirname=sett
if(sett<100)
tdirname='0'sett
endif
if(sett<10)
tdirname='00'sett
endif

'set fwrite vortdump'tdirname'.dat'
'set gxout fwrite'

'set x 'xone' 'xtwo
'set y 'yone' 'ytwo
'set z 'zone' 'ztwo
'set t 'sett

  setz=zone
  while(setz<=ztwo)
    'set z 'setz
    'd u'
  setz=setz+1
  endwhile
  setz=zone
  while(setz<=ztwo)
    'set z 'setz
    'd v'
  setz=setz+1
  endwhile
  setz=zone
  while(setz<=ztwo)
    'set z 'setz
    'd w'
  setz=setz+1
  endwhile
  setz=zone
  while(setz<=ztwo)
    'set z 'setz
    'd vortx'
  setz=setz+1
  endwhile
  setz=zone
  while(setz<=ztwo)
    'set z 'setz
    'd vorty'
  setz=setz+1
  endwhile
  setz=zone
  while(setz<=ztwo)
    'set z 'setz
    'd vortz'
  setz=setz+1
  endwhile

'disable fwrite'
  
sett=sett+1
endwhile

* combine .dat files into one file
'!cat vortdump[0-9]*.dat > vortdump.dat'
'!rm  vortdump[0-9]*.dat'
exit

* create a .ctl file on the fly
ctlfile='vortdump.ctl'
result=write(ctlfile,'dset ./vortdump.dat')
'q undef' 
undefval=subwrd(result,7)
result=write(ctlfile,'undef 'undefval)
result=write(ctlfile,'title vortgrids output dump')
'q dims'
xlin=sublin(result,2)
xwest=subwrd(xlin,6)
xeast=subwrd(xlin,8)
ylin=sublin(result,3)
ysouth=subwrd(ylin,6)
dx=(xeast-xwest)/(xtwo-xone)
dy=dx
result=write(ctlfile,'xdef '1+xtwo-xone' linear 'xwest' 'dx)
result=write(ctlfile,'ydef '1+ytwo-yone' linear 'ysouth' 'dy)
result=write(ctlfile,'zdef '1+ztwo-zone' levels')
setz=zone
while(setz<=ztwo)
  'set z 'setz
  'q dims'
  zlin=sublin(result,4)
  hgt=subwrd(zlin,6)
   result=write(ctlfile,'      'hgt)
setz=setz+1
endwhile
nt=tend-tstart+1
result=write(ctlfile,'tdef 'nt' linear 00:00Z01JAN2000 60MN')
result=write(ctlfile,'vars 6')
result=write(ctlfile,'u     '1+ztwo-zone' 99 ** u-wind')
result=write(ctlfile,'v     '1+ztwo-zone' 99 ** v-wind')
result=write(ctlfile,'w     '1+ztwo-zone' 99 ** w-wind')
result=write(ctlfile,'xvort '1+ztwo-zone' 99 ** xi')
result=write(ctlfile,'yvort '1+ztwo-zone' 99 ** eta')
result=write(ctlfile,'zvort '1+ztwo-zone' 99 ** zeta')
result=write(ctlfile,'endvars')
result=close(ctlfile)
  
