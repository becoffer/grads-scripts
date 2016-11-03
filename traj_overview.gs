*----------------------------------------------------------------------------
* Source code for GrADS script traj_6panel.gs
*
* Purpose:
*   Create a six-panel plot showing trajectories.
* 
* Adjust the parts in the first section as well as in the first WHILE-loop.
*
*----------------------------------------------------------------------------

'REINIT'

'set display color white'
'clear'

'set grads off'
'set grid off'

* width of trajectories (only shows up in ps file)

lwidth = 1

*============================================================================
* Start script (adjust file paths in the first WHILE loop)
*============================================================================

* 'enable print traj_overview_2panel.mf'

trajone = 1

icase = 1

WHILE (icase <= 1)
  IF (icase = 1 | icase = 2)

    trajint = 1
     numtraj = 1000

     'open /data/bricec/BSS_ET/Goshen/ptype2/bss2/cm1out_s.ctl'

*    * toffset (set below) is needed because the line of the ascii file (tstep)
*    * is not the same as the file index.  In this case, 4980 s
*    * has a file index of 36 but is contained in line 31 (backward)
*    * and line 36 (fwd) of the
*    * trajectory file.  Hence, toffset = file index minus line in traj file

    lona    = -60
    lonb    = 60
    lata    = -60
    latb    = 60


*    lona    = 60.5
*    lonb    = 70
*    lata    = 60
*    latb    = 75


    title = 'Trajectories BSS2'

    leva  = 0
*    levb  = 3000
    levb = 50
    uskip = 3

*    trajdir = '/data/jdawg/exp28/030s/parcels/'
     trajdir = '/data/brice/BSS_ET/Goshen/ptype2/bss2/parcel/zvort/'
*    fname = 'filtered.0'
     fname = 'bss2_parcels.0'

* plotting parameters (edges/sizes of the plots)

    xyhght = 4.0
    zhght  = 1.2
    space  = 0.17
    paba   = 2.3
    pala   = 1.0
    para   = 8.0

* timestep is the line in the file


   timestep = 2
   toffset  = 54

**    timestep = 126
**    toffset  = 40

*    timestep = 111
*    toffset  = 52

* timestep = 121
* toffset = 41


    xl = 49.25
    xr = 49.75
    yt = 82.5
    yb = 81.0

  ENDIF

*============================================================================
* No more adjustments below this line
*============================================================================

  'q file'

  pata = paba + xyhght
  pabb = pata + space
  patb = pabb + zhght

  palb = para + space
  parb = palb + zhght

*  xywdth = 5.0
*
*  IF (parb > 10)
*    para = pala + xywdth
*    palb = para + space
*    parb = palb + zhght
*    pata = paba + xywdth * (latb-lata) / (lonb-lona)
*    pabb = pata + space
*    patb = pabb + zhght
*  ENDIF

*----------------------------------------------------------------------------
* Draw (x,y)-plot
*----------------------------------------------------------------------------

  'set mproj latlon'

  'set xaxis 'lona' 'lonb
  'set yaxis 'lata' 'latb
  'set ylopts 1'
  'set xlint '2
  'set ylint '2
  'set xyrev off'
  'set xlpos 0 b'
  'set ylpos 0 l'

  say
  say 'Line in traj file ' timestep
  IF (icase = 1)
    say 'File index W96: ' timestep + toffset
  ELSE
    say 'File index Del City: ' timestep + toffset + 1
  ENDIF
  say

  'set t 'timestep + toffset

  'set mproj off'

  'set parea 'pala' 'para' 'paba' 'pata
  'set lat 'lata' 'latb
  'set lon 'lona' 'lonb
  'set lev 'leva

  'set z 1'

** SFC vorticity **

  'zeta = (cdiff(vinterp,x) - cdiff(uinterp,y)) / 500'

*  'set xlopts 1'
*  'set ylopts 1'
*  'color -5.0 5.0 0.2 -kind blue->green->white->yellow->red'
*  'd 1.0E2 * zeta'
*  'cbar_joda2 1 1 0.2 9.5'


* Will plot one field to create the color bar

  'set gxout shaded'
  'set clevs  1.55 1.6 1.65 1.7 1.75 1.8 1.85 1.9'
  'set ccols  14  4   11  5   13  3   12  8   2  '
  'set clab on'
  'd 1.0E2 * zeta'
  'cbar.newer_inverted 0.5 0 4.5 1.79'

* ... now overwrite this field with white color

  'set gxout shaded'
  'set clevs  2 4'
  'set ccols  0 0'
  'set clab on'
  'd  zeta'

* now plot the vorticity

  'set gxout contour' 
  'set clevs 2 4 6 8 '
  'set cthick 8'
  'set ccolor 2 ' 
  'set clab on' 
  'd 1.0E2 * zeta' 

* now plot the vorticity

  'set gxout contour'
  'set clevs -8 -6 -4 -2'
  'set cstyle 3'
  'set cthick 8'
  'set ccolor 2 '
  'set clab on'
  'd 1.0E2 * zeta'

** downdraft **

  'set z 5'

  'set gxout contour'
  'set clevs  -3.0 '
  'set cthick 6'
  'set cstyle 3'
  'set ccolor 1'
  'set clab on'
  'd winterp'

** 'Reflectivity'

   'set z 5'

  'set gxout contour'
  'set clevs  20.0 '
  'set cthick 8'
  'set cstyle 1'
  'set ccolor 1'
  'set clab on'
  'd 10*(log(qr+qg+qs)+11)'


** outflow boundary **


  'set z 1'
  'set gxout contour'
  'set clevs -1'
  'set cthick 8'
  'set cstyle 1'
  'set ccolor 4'
  'set clab on'
  'd thpert'


** Horiz. velocity vectors 

  'set z 1'

  IF (icase = 1)
    'set gxout vector'
    len = 0.25
    scale = 25
    xrit = 8.7
    ybot = 7.35
    rc = arrow(xrit-0.25,ybot+0.2,len,scale)
  ELSE
    'set gxout vector'
    len = 0.25
    scale = 25
    xrit = 7.55
    ybot = 3.35
    rc = arrow(xrit-0.25,ybot+0.2,len,scale)
  ENDIF
  
  'set ccolor 1'
  'set cthick 2'
  'set arrscl 0.25 25'
  'set arrlab off'
  'd skip(uinterp,'uskip','uskip');vinterp'

*----------------------------------------------------------------------------
* Loop over parcels
*----------------------------------------------------------------------------

  trajno = trajone

  WHILE (trajno < trajone + numtraj)

    xold = 123456789

    IF (trajno < 10)
      IF (icase < 1)
        trajfil = trajdir fname '000' trajno '.txt'
      ENDIF 
      IF (icase >= 1)
        trajfil = trajdir fname '000' trajno
      ENDIF
    ENDIF
  
    IF(trajno > 9)
      IF (trajno < 100)
        IF (icase < 1)
          trajfil = trajdir fname'00'trajno'.txt'
        ENDIF
        IF (icase >= 1) 
          trajfil = trajdir fname'00'trajno
        ENDIF
      ENDIF  
  
      IF (trajno > 99)
        IF (icase < 1)
          trajfil = trajdir fname'0'trajno'.txt'
        ENDIF
        IF (icase >= 1) 
          trajfil= trajdir fname'0'trajno
        ENDIF
      ENDIF
      
      IF (trajno > 999)
        IF (icase < 1)
          trajfil=trajdir fname trajno'.txt'
        ENDIF
        IF (icase >= 1)
          trajfil=trajdir fname trajno
        ENDIF
      ENDIF 
    ENDIF

*-----------
* Read data
*-----------

    result  = read(trajfil)
    readnum = 1

    WHILE (readnum <= timestep)

      result   = read  (trajfil)
      statusop = sublin(result,1)

      IF (statusop = 0)

        rec  = sublin(result,2)
        time = subwrd(rec,1)
        xloc = subwrd(rec,2)
        yloc = subwrd(rec,3)
        zloc = subwrd(rec,4)

        IF (readnum = 1)
          x0arr.trajno = xloc
          y0arr.trajno = yloc
          z0arr.trajno = zloc
        ENDIF

        plotx = xloc/1000
        ploty = yloc/1000

        'q w2xy 'plotx' 'ploty
        rec  = sublin(result,1)
        xnew = subwrd(rec,3)
        ynew = subwrd(rec,6)

          if (z0arr.trajno >= 1500 & z0arr.trajno < 1550)
            colnum = 14 
          endif 
          if (z0arr.trajno >= 1550 & z0arr.trajno < 1600)
            colnum = 4 
          endif 
          if (z0arr.trajno >= 1600 & z0arr.trajno < 1650)
            colnum = 11 
          endif 
          if (z0arr.trajno >= 1650 & z0arr.trajno < 1700)
            colnum = 5 
          endif 
          if (z0arr.trajno >= 1700 & z0arr.trajno < 1750)
            colnum = 13 
          endif 
          if (z0arr.trajno >= 1750 & z0arr.trajno < 1800)
            colnum = 3 
          endif 
          if (z0arr.trajno >= 1800 & z0arr.trajno < 1850)
            colnum = 12
          endif 
          if (z0arr.trajno >= 1850 & z0arr.trajno < 1900)
            colnum = 8
          endif 
          if (z0arr.trajno >= 1900)
            colnum = 2
          endif 


        IF (1 = 1)

          if (z0arr.trajno >= 0 & z0arr.trajno < 300)
            colnum = 9
          endif
          if (z0arr.trajno >= 300 & z0arr.trajno < 600)
           colnum = 14
          endif
          if (z0arr.trajno >= 600 & z0arr.trajno < 900)
            colnum = 4
          endif
          if (z0arr.trajno >= 900 & z0arr.trajno < 1200)
            colnum = 11
          endif
          if (z0arr.trajno >= 1200 & z0arr.trajno < 1500)
            colnum = 5
          endif
          if (z0arr.trajno >= 1500 & z0arr.trajno < 1800)
            colnum = 13
          endif
          if (z0arr.trajno >= 1800 & z0arr.trajno < 2100)
            colnum = 3
          endif
          if (z0arr.trajno >= 2100 & z0arr.trajno < 2400)
            colnum = 10
          endif
          if (z0arr.trajno >= 2400 & z0arr.trajno < 2700)
            colnum = 7
          endif
          if (z0arr.trajno >= 2700 & z0arr.trajno < 3000)
            colnum = 12
          endif
          if (z0arr.trajno >= 3000 & z0arr.trajno < 3300)
            colnum = 8
          endif
          if (z0arr.trajno >= 3300 & z0arr.trajno < 3600)
            colnum = 2
          endif
          if (z0arr.trajno >= 3600)
            colnum = 6
          endif

        ENDIF

*        IF (z0arr.trajno <= zmin  & y0arr.trajno < ymin & x0arr.trajno > xmin)
*          colnum = 2
*        ELSE
*          colnum = 4
*        ENDIF

       'set line 'colnum' 1 'lwidth

        IF (xold >= pala & xold <= para)
          IF (yold >= paba & yold <= pata)

* -----------------------------------------------
* Plot trajectory segment
* -----------------------------------------------

            IF (xold = 123456789)
              IF (startmark = 1)
                'draw mark 2 'xnew' 'ynew' 0.15'
              ENDIF
            ENDIF

            IF (xold != 123456789)
              foo = math_abs(ynew-yold)
              IF (foo < 0.5)
                'draw line 'xold' 'yold' 'xnew' 'ynew
              ENDIF
            ENDIF

            if (time = mrktim & markon = 1)
            'draw mark 5 'xnew' 'ynew' 0.10'
            endif

          ENDIF
        ENDIF

        xold = xnew
        yold = ynew

      ENDIF

      readnum = readnum + 1

    ENDWHILE
    
    result=close(trajfil)

    trajno = trajno + trajint

  ENDWHILE

* Draw box where we looked for parcels

  'q w2xy 'xl' 'yb
  rec  = sublin(result,1)
  xlp = subwrd(rec,3)
  ybp = subwrd(rec,6)

  'q w2xy 'xr' 'yt
  rec  = sublin(result,1)
  xrp = subwrd(rec,3)
  ytp = subwrd(rec,6)

*  'set line 1 1 6'
*  'draw line 'xlp' 'ybp' 'xrp' 'ybp
*  'draw line 'xrp' 'ybp' 'xrp' 'ytp
*  'draw line 'xlp' 'ytp' 'xrp' 'ytp
*  'draw line 'xlp' 'ytp' 'xlp' 'ybp



* ===========================================================================
* draw the x vs. z plot
* ===========================================================================

  'set mproj scaled'
  'set parea 'pala' 'para' 'pabb' 'patb
  'set lat 'lata
  'set lon 'lona' 'lonb
  'set lev 'leva' 'levb

  'set gxout fgrid'
  'set xlopts 1'
  'set ylopts 1'
  'set xaxis 'lona' 'lonb
  'set yaxis 'leva/1000' 'levb/1000
  'set xlint '2
  'set ylint '1
  'set xlpos 0 t'
  'set ylpos 0 l'
  'd uinterp*0'

  colnum = 1
  trajno = trajone

  WHILE (trajno < trajone + numtraj)

    xold = 123456789

    IF (trajno < 10)
      IF (icase < 1)
        trajfil = trajdir fname '000' trajno '.txt'
      ENDIF 
      IF (icase >= 1)
        trajfil = trajdir fname '000' trajno
      ENDIF
    ENDIF
    
    IF(trajno > 9)
      IF (trajno < 100)
        IF (icase < 1)
          trajfil = trajdir fname'00'trajno'.txt'
        ENDIF
        IF (icase >= 1)
          trajfil = trajdir fname'00'trajno
        ENDIF
      ENDIF  

      IF (trajno > 99)
        IF (icase < 1)
          trajfil = trajdir fname'0'trajno'.txt'
        ENDIF
        IF (icase >= 1)
          trajfil= trajdir fname'0'trajno
        ENDIF
      ENDIF

      IF (trajno > 999)
        IF (icase < 1)
          trajfil=trajdir fname trajno'.txt'
        ENDIF
        IF (icase >= 1)
          trajfil=trajdir fname trajno
        ENDIF
      ENDIF
    ENDIF

    result  = read(trajfil)
    readnum = 1

    WHILE (readnum <= timestep)

      result   = read(trajfil)
      statusop = sublin(result,1)

      IF (statusop = 0)

        rec  = sublin(result,2)
        time = subwrd(rec,1)
        xloc = subwrd(rec,2)
        yloc = subwrd(rec,3)
        zloc = subwrd(rec,4)

        if (readnum = 1)
          x0arr.trajno = xloc
          y0arr.trajno = yloc
          z0arr.trajno = zloc
        endif

        plotx = xloc/1000
        ploty = zloc

        'q w2xy 'plotx' 'ploty
        rec  = sublin(result,1)
        xnew = subwrd(rec,3)
        ynew = subwrd(rec,6)

        'set line 'colnum' 1 'lwidth


          if (z0arr.trajno >= 1500 & z0arr.trajno < 1550)
            colnum = 14
          endif
          if (z0arr.trajno >= 1550 & z0arr.trajno < 1600)
            colnum = 4
          endif
          if (z0arr.trajno >= 1600 & z0arr.trajno < 1650)
            colnum = 11
          endif
          if (z0arr.trajno >= 1650 & z0arr.trajno < 1700)
            colnum = 5
          endif
          if (z0arr.trajno >= 1700 & z0arr.trajno < 1750)
            colnum = 13
          endif
          if (z0arr.trajno >= 1750 & z0arr.trajno < 1800)
            colnum = 3
          endif
          if (z0arr.trajno >= 1800 & z0arr.trajno < 1850)
            colnum = 12
          endif
          if (z0arr.trajno >= 1850 & z0arr.trajno < 1900)
            colnum = 8
          endif
          if (z0arr.trajno >= 1900)
            colnum = 2
          endif


        IF (1 = 1) 

        if (z0arr.trajno >= 0 & z0arr.trajno < 300)
          colnum = 9
        endif
        if (z0arr.trajno >= 300 & z0arr.trajno < 600)
          colnum = 14
        endif
        if (z0arr.trajno >= 600 & z0arr.trajno < 900)
          colnum = 4
        endif
        if (z0arr.trajno >= 900 & z0arr.trajno < 1200)
          colnum = 11
        endif
        if (z0arr.trajno >= 1200 & z0arr.trajno < 1500)
          colnum = 5
        endif
        if (z0arr.trajno >= 1500 & z0arr.trajno < 1800)
          colnum = 13
        endif
        if (z0arr.trajno >= 1800 & z0arr.trajno < 2100)
          colnum = 3
        endif
        if (z0arr.trajno >= 2100 & z0arr.trajno < 2400)
          colnum = 10
        endif
        if (z0arr.trajno >= 2400 & z0arr.trajno < 2700)
          colnum = 7
        endif
        if (z0arr.trajno >= 2700 & z0arr.trajno < 3000)
          colnum = 12
        endif
        if (z0arr.trajno >= 3000 & z0arr.trajno < 3300)
          colnum = 8
        endif
        if (z0arr.trajno >= 3300 & z0arr.trajno < 3600)
          colnum = 2
        endif
        if (z0arr.trajno >= 3600)
          colnum = 6
        endif

        ENDIF

*        IF (z0arr.trajno <= zmin  & y0arr.trajno < ymin & x0arr.trajno > xmin)
*          colnum = 2 
*        ELSE
*          colnum = 4
*        ENDIF


        if (xold >= pala)
          if (xold <= para)
            if (yold >= pabb)
              if (yold <= patb)

                if(xold!=123456789)
                  'draw line 'xold' 'yold' 'xnew' 'ynew
                endif
             
              endif
            endif
          endif
        endif
        
        xold = xnew
        yold = ynew

*        readnum=readnum+1
      
      ENDIF

      readnum = readnum + 1

    ENDWHILE

    result = close(trajfil)

    trajno = trajno + trajint

  ENDWHILE

  'set xlopts 1'
  'set xlpos 0 b'
  'set ylpos 0 r'

* ===========================================================================
* Draw the y vs. z plot
* ===========================================================================

  'set mproj scaled'
  'set parea 'palb' 'parb' 'paba' 'pata
  'set lat 'lata' 'latb
  'set lon 'lona
  'set lev 'leva' 'levb

  'set gxout fgrid'
  'set xaxis 'leva/1000' 'levb/1000
  'set yaxis 'lata' 'latb
  'set ylopts 1'
  'set xlint '1

  'set ylint '2

  'set xyrev on'
  'set xlpos 0 t'
  'set ylpos 0 r'
  'd uinterp*0'

  colnum=1

  trajno = trajone

  WHILE (trajno < trajone+numtraj)

    xold = 123456789

    IF (trajno < 10)
      IF (icase < 1)
        trajfil = trajdir fname '000' trajno '.txt'
      ENDIF
      IF (icase >= 1)
        trajfil = trajdir fname '000' trajno
      ENDIF
    ENDIF
 
    IF(trajno > 9)
      IF (trajno < 100)
        IF (icase > 1)
          trajfil = trajdir fname'00'trajno'.txt'
        ENDIF
        IF (icase >= 1)
          trajfil = trajdir fname'00'trajno
        ENDIF
      ENDIF
 
      IF (trajno > 99)
        IF (icase < 1)
          trajfil = trajdir fname'0'trajno'.txt'
        ENDIF
        IF (icase >= 1)
          trajfil= trajdir fname'0'trajno
        ENDIF
      ENDIF
 
      IF (trajno > 999)
        IF (icase < 1)
          trajfil = trajdir fname trajno'.txt'
        ENDIF
        IF (icase >= 1)
          trajfil=trajdir fname trajno
        ENDIF
      ENDIF
    ENDIF
  
    result  = read(trajfil)
    readnum = 1

** Start plotting trajectories

    WHILE (readnum <= timestep)

      result   = read(trajfil)
      statusop = sublin(result,1)

      IF (statusop = 0)

        rec  = sublin(result,2)
        time = subwrd(rec,1)
        xloc = subwrd(rec,2)
        yloc = subwrd(rec,3)
        zloc = subwrd(rec,4)

        IF (readnum = 1)
          x0arr.trajno = xloc
          y0arr.trajno = yloc
          z0arr.trajno = zloc
        ENDIF

        plotx=zloc
        ploty=yloc/1000

        'q w2xy 'plotx' 'ploty
        rec  = sublin(result,1)
        xnew = subwrd(rec,3) / 1
        ynew = subwrd(rec,6)


          if (z0arr.trajno >= 1500 & z0arr.trajno < 1550)
            colnum = 14
          endif
          if (z0arr.trajno >= 1550 & z0arr.trajno < 1600)
            colnum = 4
          endif
          if (z0arr.trajno >= 1600 & z0arr.trajno < 1650)
            colnum = 11
          endif
          if (z0arr.trajno >= 1650 & z0arr.trajno < 1700)
            colnum = 5
          endif
          if (z0arr.trajno >= 1700 & z0arr.trajno < 1750)
            colnum = 13
          endif
          if (z0arr.trajno >= 1750 & z0arr.trajno < 1800)
            colnum = 3
          endif
          if (z0arr.trajno >= 1800 & z0arr.trajno < 1850)
            colnum = 12
          endif
          if (z0arr.trajno >= 1850 & z0arr.trajno < 1900)
            colnum = 8
          endif
          if (z0arr.trajno >= 1900)
            colnum = 2
          endif




        IF (1 = 1)

        if (z0arr.trajno >= 0 & z0arr.trajno < 200)
          colnum = 9
        endif
        if (z0arr.trajno >= 200 & z0arr.trajno < 400)
          colnum = 14
        endif
          if (z0arr.trajno >= 400 & z0arr.trajno < 600)
          colnum = 4
        endif
        if (z0arr.trajno >= 600 & z0arr.trajno < 800)
          colnum = 11
        endif
        if (z0arr.trajno >= 800 & z0arr.trajno < 1000)
           colnum = 5
        endif
        if (z0arr.trajno >= 1000 & z0arr.trajno < 1200)
          colnum = 13
        endif
        if (z0arr.trajno >= 1200 & z0arr.trajno < 1400)
          colnum = 3
        endif
        if (z0arr.trajno >= 1400 & z0arr.trajno < 1600)
          colnum = 10
        endif
        if (z0arr.trajno >= 1600 & z0arr.trajno < 1800)
          colnum = 7
        endif
        if (z0arr.trajno >= 1800 & z0arr.trajno < 2000)
          colnum = 12
        endif
        if (z0arr.trajno >= 2000 & z0arr.trajno < 2200)
          colnum = 8
        endif
        if (z0arr.trajno >= 2200 & z0arr.trajno < 2400)
          colnum = 2
        endif
        if (z0arr.trajno >= 2400)
          colnum = 6
        endif

        ENDIF

*        IF (z0arr.trajno <= zmin  & y0arr.trajno < ymin & x0arr.trajno > xmin)
*          colnum = 2
*        ELSE
*          colnum = 4
*        ENDIF


        'set line 'colnum' 1 'lwidth


        if(xold>=palb)
          if(xold<=parb)

            if(yold>=paba)
              if(yold<=pata)

                if(xold!=123456789)
                  foo=math_abs(ynew-yold)
                  if(foo<0.5)
                    'draw line 'xold' 'yold' 'xnew' 'ynew
                  endif
                endif

              endif
            endif
          endif
        endif

        xold = xnew
        yold = ynew

*        readnum = readnum+1

* status branch

      ENDIF

      readnum = readnum+1

* end time loop    

    ENDWHILE

    result = close(trajfil)

    trajno = trajno + trajint

* end parcel loop

  ENDWHILE

  'set ylopts 1'
  'set xlpos 0 b'
  'set ylpos 0 l'

* ===========================================================================
* Write some information on the chart
* ===========================================================================

  IF (icase = 1)

    'set z 'z1
    'q dims'
    levlin=sublin(result,4)
    levstr=subwrd(levlin,6)

    'set strsiz 0.13'
    'draw string 1.0 8.1 W96'

    'set strsiz 0.13'
    'draw string 7.5 8.1 t = 'time' s'
    'draw string 7.4 7.25 n = 'numtraj


    say
    say '--> ALTITUDE: ' levstr * 1000' m'
    say '--> TIME W96: 'time' s'
    say

  ENDIF

  icase = icase + 1

* end loop over plots

ENDWHILE

* Print all the nice plots into mf-file

'print'
*'disable print'

'printim trajectories.png x1400 y1000'

** apply function gxeps filename.mf in the shell to create an eps.

* ===========================================================================
* Arrow function
* ===========================================================================

function arrow(x,y,len,scale)
'set line 1 1 4'
'draw line 'x-len/2.' 'y' 'x+len/2.' 'y
'draw line 'x+len/2.-0.05' 'y+0.025' 'x+len/2.' 'y
'draw line 'x+len/2.-0.05' 'y-0.025' 'x+len/2.' 'y
'set string 1 c'
'set strsiz 0.1'
'draw string 'x' 'y-0.1' 'scale
return

* ===========================================================================
* The End.
* ===========================================================================


