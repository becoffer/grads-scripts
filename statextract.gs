* Script to extract the values from the CM1 stats file.
* Author:  Brice Coffer, NCSU
* Last modified:  14 May 2014

* open file
'reinit'
'open cm1out_stats'

*Enter variable 1
var = vortsfc

*Enter time frame
initialtime = 92
maxtime = 192

*****************************************************************
* END OF USER SETTINGS
*****************************************************************
*Current version created 120613 by Brice Coffer

sett=initialtime
while(sett<=maxtime)
'set t 'sett

'd 'var

value=subwrd(result,4)
data=write(var'.txt',value)

sett=sett+1
endwhile


