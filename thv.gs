* Script to calculate virtual potential temperature
* (the) from cm1 GrADS-format output
* Author:  George H. Bryan, NCAR/MMM
* Last modified:  8 August 2008

*"define t=th*pow((prs/100000.0),(287.04/1005.7))"
*"define thv=t*(1.0+0.608*qv)*pow((100000.0/prs),(287.04/1005.7))"
'define thv=th*((1+(qv/0.622))/(1+qv))'
'define thv0=th(t=1)*((1+(qv(t=1)/0.622))/(1+qv(t=1)))'
