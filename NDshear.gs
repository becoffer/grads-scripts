'define upert = uinterp-uinterp(t=1)'
'define vpert =vinterp-vinterp(t=1)'
'define ustar = sqrt(sqrt(upert*winterp*upert*winterp + vpert*winterp*vpert*winterp))'
exit
'q dims'
zlin=sublin(result,4)
zwrd=sublin(zlin,9)
level=subwrd(zlin,6)*1000
'q dims'
zlin=sublin(result,4)
zwrd=subwrd(zlin,9)
'set z 'zwrd+1
'q dims'
zlin=sublin(result,4)
height2=subwrd(zlin,6)*1000
'set z 'zwrd-1
'q dims'
zlin=sublin(result,4)
height1=subwrd(zlin,6)*1000
'set z 'zwrd
'define dudz = (uinterp(z='zwrd+1') - uinterp(z='zwrd-1')) / ('height2'-'height1')'
'define NDshear = (0.4*'level'/ustar)/dudz'

