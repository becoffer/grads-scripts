* Script to calculate density potential temperature
* (the) from cm1 GrADS-format output
* Author:  Brice E. Coffer
* Last modified:  27 Feb 2015

'define thrho=th*((1+(qv/0.622))/(1+(qv+qc+qr+qi+qs+qg+qhl)))'
'define thrho0=th(t=1)*((1+(qv(t=1)/0.622))/(1+(qv(t=1)+qc(t=1)+qr(t=1)+qi(t=1)+qs(t=1)+qg(t=1)+qhl(t=1))))'
'define thrhopert=thrho-thrho0'
