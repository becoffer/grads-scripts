* Script to calculate Okubo-Weiss parameter.
* Forumaltion opposite to original forumation (highlights vorticity)
* Author:  Brice Coffer, NCSU
* Last modified:  11 Mar 2015

* enter grid spacing
dx = 125.0

'define zvort = (cdiff(vinterp,x) - cdiff(uinterp,y)) / (2*'dx')'
*'define zvort = maskout(zvort,zvort-0.01)'
'define def1 = (cdiff(uinterp,x) - cdiff(vinterp,y)) / (2*'dx')'
'define def2 = (cdiff(vinterp,x) + cdiff(uinterp,y)) / (2*'dx')'

'define D = sqrt(def1*def1 + def2*def2)'

'define ow = zvort*zvort - D*D'
'define ow2 = D*D - zvort*zvort'

*'undefine zvort'
*'undefine def1'
*'undefine def2'


