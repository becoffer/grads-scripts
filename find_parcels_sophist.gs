*----------------------------------------------------------------------------
* Source code for GrADS script find_parcels.gs
*----------------------------------------------------------------------------

'REINIT'

*----------------------------------------------------------------------------
* Purpose:
*  Find parcels obtained from CM1 in a user-defined space-time window and 
*  write them to ASCII files (one for each trajectory).  
*
* Method:
*  The strategy is to use GrADS' intrindic funtions to effeciently define 
*  a binary array (containing zeros and ones),
*  used to filter out parcels of interest.  This is a very efficient way
*  because only a single loop through all parcels is required.  Note that
*  in Fortran, if the parcel number exceeds some 2E6, no direct access
*  to individual elements in the file is possible, so that nested loops
*  over all parcels are required.  The current code is about 100 (!)
*  time faster than Fortran, because of the efficient way that GrADS
*  accesses gridded data.  Analyzing 2E6 parcels which contain data
*  ever 2 s for 20 min and 14 variables, only takes about 1.5 h.
*
*  The binary filter ('flag') array is created by a succession of 'reduction
*  operations', where properties of each flag array are projected onto the
*  others.  The reduction operations are, depending on the desired properties,
*  of the form 'missing o good = missing' or 'missing o good = good' ('o' is
*  the reduction operator, e.g., multiplication).  Since only the first
*  operation can be realized in GrADS, 'good' and 'missing' values need to
*  be swapped a few times, using the 'const' and 'maskout' functions.  The final
*  form of the flag array is that whenever a flag element equals zero, the 
*  corresponding parcel is within the window of interest (and has
*  all the desired properties) and is written out.
*
*  To keep the indices (parcel IDs) small enough to be represented
*  without integer overflow, (talking about many (!) millions here), 
*  the array may be 'de-vectorized'.
*  Rather than going lexicographically through all indices, they can be
*  split up into (i,j,k).  Instead of one long loop, we use three
*  short nested loops.  Performance-wise this shouldn't make much
*  of a difference.  You may use the i,j,k indices that were used 
*  in the CM1 code where the parcels' initial conditions are defined.  
*
* Notes:
*  1) The parcels that the output files pertain to, are different for
*     the 1D vs. 3D representation of xp, yp, etc., because the order in
*     which the parcels are written is changed.
*
* Input (to be defined below)
* ---------------------------
*
*  1) ctlfname:  Path and name of the GrADS configuration file
*  2) outpath:   Path of the output files (no slash '/' at the end!) 
*  3) printprog: If set to 1, the parcel numbers are written out in
*                the loop over all parcels.  This will slow down
*                the program but you can follow the progression.
*                This option is suggested mainly for debugging purposes.   
*  4) nmax:      Number of time steps
*  5) dimx, dimy, dimz:
*                Must be selected such that their product = nparcels.
*                Also, must be consistent with the dimensions in the
*                ctl-file (xdim, ydim, zdim).
*  6) dt:        Timestep of parcel output
*  7) nparcels:  Number of parcels
*  8) t0:        When parcels were released (in s)
*  9) time1:     Beginning of time window (in s)
* 10) time2:     End of time window (in s)
* 11) h1, h2:    Height interval (including the boundaries; in s)
* 12) x1, x2:    Interval in x-direction
* 13) y1, y2:    Interval in z direction
*
* Output
* ------
*
* 1) Output files in ASCII format, named parcel.nnnnn, 
*    where nnnnn is the parcel ID.
*
*  Authors: Original code/idea by M. Parker, modified by J. Dahl 
*          (Contact jmdahl@ncsu.edu if you find a bug) 
*----------------------------------------------------------------------------

*----------------------------------------------------------------------------
* I. User adjustments
*----------------------------------------------------------------------------

* Stop after telling us how many parcels fulfill the criteria

justhowmany = 1

* configuration-file name

ctlfname = '/data/bricec/no_slip/torV2/parcels/cm1out_pdata.ctl'
outpath  = '/data/bricec/no_slip/torV2/parcels/selected/1kmUpdraft_n41'
fname    = 'torV2_parcels'

* print progression of script execution (1: yes, else no)

printprog = 0

* parcel data

nmax     = 91
dimx     = 4984831
dimy     = 1
dimz     = 1
dt       = 20.0
nparcels = 4984831

* time window (units are seconds and meters, respectively)

t0     =  1800.0
time1  =  2700.0
time2  =  3600.0

h1 =         5.0
h2 =        15.0

x1  =    78000.0
x2 =     80000.0

y1 =     80000.0
y2 =     82000.0

*zetathrdd = 0.01 
*wthrdd    = 20.0
*umin      = 0.0
*vmax      = 0.0
thmin      = -0.5

* vorticity (only considered if vort == 1)

vort      =    0

timeend   =  3600.0
zetathr   =     0.1
hzetathr  =    50.0

* vertical velocity (only conisdered if winterp == 1)

winterp   =     0

timeend2  =  3600.0
wthr      =    10.0
hwthr     =  2000.0

*============================================================================
* II. Start script
*============================================================================

'set undef -999'

* Sanity checks
IF (dimx * dimy * dimz != nparcels)
  say 'Parcel indices inconsistent ... aborting.'
  EXIT
ENDIF

'OPEN 'ctlfname

'set x 1 'dimx
'set y 1 'dimy
'set z 1 'dimz

t1   = (time1   - t0) / dt + 1
t2   = (time2   - t0) / dt + 1
tend = (timeend - t0) / dt + 1
tend2 = (timeend2 - t0) / dt + 1

'set t 1'

* initialize flags with ones

'iflags = const('xp', 1)'
'iflagv = const('xp', 1)'
'iflagw = const('xp', 1)'

*----------------------------------------------------------------------------
* Section 1.1: Find parcels of interest 
*----------------------------------------------------------------------------

tcount  = t1
ttcount = t1

say
say '      *** You are running the GrADS script FIND_PARCELS ***'
say

*----------------------------------------------------------------------------
* First loop to check if parcels' vorticity exceeds threshold
* at some later point (this vorticity needs to be achieved while
* the parcel is below hzetathr, to avoid them being 5 km up
* in the updraft).  Parcels outside the regime of interest: undefined
*

IF (vort = 1)

  counter = 0

  WHILE (ttcount <= tend)

    counter = counter + 1

    'set t 'ttcount

    say 'Checking for max vorticity, step: 'ttcount' ('counter' of 'tend - t1 + 1')'

*   altitude window (zp < hzthr retained as defined = 1)

    'flag01 = maskout(1.0 + 0.0 * zp, 'hzetathr' - zp)'

*    zeta threshold (retaining zeta > zetathr as defined = 1)

    'flag02 = maskout(1.0 + 0.0 * zeta, zeta - 'zetathr')'

    'flag0  = flag01 * flag02'

*   Swap defined and undefined (parcels of interest undefined
*   after this procedure)

    'flagswap = const('flag0', 3, -u)'
    'flagswap = maskout('flagswap','flagswap' - 2)'
    'flagswap = const('flagswap', 1)'

    'iflagv = iflagv * flagswap'

    ttcount = ttcount + 1

  ENDWHILE
ENDIF

*----------------------------------------------------------------------------
* Second loop to check if parcels' vertical velocity  exceeds threshold
* at some later point (this velocity needs to be achieved while
* the parcel is above hwthr, in order to look for parcels that entered the overlying updraft. 
* Parcels outside the regime of interest: undefined

IF (winterp = 1)

  ttcount = t1
  counter = 0

  WHILE (ttcount <= tend2)

    counter = counter + 1

    'set t 'ttcount

    say 'Checking for max velocity, step: 'ttcount' ('counter' of 'tend - t1 + 1')'

*   altitude window (zp > hwthr retained as defined = 1)

*    'flag001 = maskout(1.0 + 0.0 * zp, zp - 'hwthr')'
     'flag001 = maskout(1.0 + 0.0 * zp, 'hwthr' - zp)'

*   w threshold (retaining w > wthr as defined = 1)

     'flag002 = maskout(1.0 + 0.0 * w, w - 'wthr')'
*     'flag002 = maskout(1.0 + 0.0 * w, 'wthr' - th)'

    'flag00  = flag001 * flag002'

*   Swap defined and undefined (parcels of interest undefined
*   after this procedure)

    'flagswap = const('flag00', 3, -u)'
    'flagswap = maskout('flagswap','flagswap' - 2)'
    'flagswap = const('flagswap', 1)'

    'iflagw = iflagw * flagswap'

    ttcount = ttcount + 1

  ENDWHILE
ENDIF

* iflagv will be 'reduced' onto iflags (and its zeros and
* ones will be swapped of both arrays, iflagv and iflags)
* below. 
*
* Third loop to check for properties in prescribed time window
*----------------------------------------------------------------------------

counter = 0

WHILE (tcount <= t2)

  counter = counter + 1

  say 'Checking time window, step: 'tcount' ('counter' of 't2 - t1 + 1')'

  'set t 'tcount 

* First, set all parcels outside the window of interest to undefined

* altitude window

  'define flag1 = maskout(1.0 + 0.0 * zp, zp - 'h1')'
  'define flag2 = maskout(1.0 + 0.0 * zp, 'h2' - zp)'

* x-window

  'define flag3 = maskout(1.0 + 0.0 * xp, xp - 'x1')'
  'define flag4 = maskout(1.0 + 0.0 * xp, 'x2' - xp)'

* y-window

  'define flag5 = maskout(1.0 + 0.0 * yp, yp - 'y1')'
  'define flag6 = maskout(1.0 + 0.0 * yp, 'y2' - yp)'

* vertical vorticity (>= threshold)

 'define flag7 = maskout(1.0 + 0.0 * zeta, zeta - 'zetathrdd')'

* vertical speed (>0)

 'define flag8 = maskout(1.0 + 0.0 * w, w - 'wthrdd')'

* u-component of velocity
*
* 'define flag9 = maskout(1.0 + 0.0 * u, u - 'umin')'
*
* v-component of velocity
*
* 'define flag10 = maskout(1.0 + 0.0 * v, 'vmax' - v)'
*
* potential temperature perturbation
*
* 'define flag11 = maskout(1.0 + 0.0 * th, th - 'thmin')'

* Reduction of geometric (and other properties) at the given time step
* (logical AND)

  'flag = flag1 * flag2 * flag3 * flag4 * flag5 * flag6 * flag7 * flag8'

* Swap missing values and good values (array elements (= parcel IDs) of
* interest are now set to 'undefined'); logical OR

  'tflag = const('flag', 3, -u)'
  'flags = maskout('tflag','tflag' - 2)'
  'flags = const('flags', 1)'

* Reduction of all flags from previous times

  'iflags = iflags * flags'

  tcount = tcount + 1

ENDWHILE 


IF (vort = 1 | winterp = 1)
*   Swapping iflag (so that parcels of interest are assigned a 1 again) 
*   all others are undefined, to do a final reduction operation
*   (parcels need to fulfill both criteria (AND) not either one (XOR)

  'flagswap = const('iflags', 3, -u)'
  'flagswap = maskout('flagswap','flagswap' - 2)'
  'flagswap = const('flagswap', 1)'

  'flagswap2 = const('iflagv', 3, -u)'
  'flagswap2 = maskout('flagswap2','flagswap2' - 2)'
  'flagswap2 = const('flagswap2', 1)'

  'flagswap3 = const('iflagw', 3, -u)'
  'flagswap3 = maskout('flagswap3','flagswap3' - 2)'
  'flagswap3 = const('flagswap3', 1)'

*   final reduction
  if (vort=1 & winterp=0)
    'iflags = flagswap * flagswap2'
  endif
  if (vort=0 & winterp=1)
    'iflags = flagswap * flagswap3'
  endif
  if (vort=1 & winterp=1)
    'iflags = flagswap * flagswap2 * flagswap3'
  endif

* ... and swap back, so that parcels of interest are undefined again

  'iflags = const('iflags', 3, -u)'
  'iflags = maskout('iflags','iflags' - 2)'
  'iflags = const('iflags', 1)'

ENDIF

*----------------------------------------------------------------------------
* Section 1.2 Find out how many parcels of interest there are
*            (Counting undefined values)
*----------------------------------------------------------------------------

izcount = 1
isums = 0

WHILE (izcount <= dimz) 

  'set z 'izcount
  'set gxout stat'
  'd iflags'
  dummy = sublin(result,7)
  temp = subwrd(dummy, 4)
  isums = isums + temp

  izcount = izcount + 1

ENDWHILE

say 'Found 'isums' parcels!'

IF (isums = 0)
  say 'Sorry, no parcels found.'
  EXIT
ENDIF

IF (justhowmany = 1)
  EXIT
ENDIF

* Now setting undefined values to zero, so that now
* parcels of interest are assigned a zero, all others a one.

'iflags = const('iflags', 0, -u)'

*----------------------------------------------------------------------------
* Sectio 2: Parcel loop
*----------------------------------------------------------------------------

pcountx  = 0
foundone = 0

say

WHILE (pcountx < dimx)

  pcountx = pcountx + 1
  pcounty = 0

  WHILE (pcounty < dimy)
    pcounty = pcounty + 1
    pcountz = 0

    IF (printprog = 1)
      say '(x,y) = ('pcountx','pcounty') of ('dimx','dimy'); currently 'foundone' parcels.'
    ENDIF

    WHILE (pcountz < dimz)
      pcountz = pcountz + 1

      'set x 'pcountx
      'set y 'pcounty
      'set z 1' 
      
* Scanning through the flag array to check whether the parcel is
* undefined (= in the window of interest)
  
      'set gxout print'

      'set prnopts %12.2f 1 2'
      'd iflags'
      dummy     = sublin(result, 2)
      flagcheck = subwrd(dummy, 1)
       
      IF (flagcheck = 0.0) 



        foundone = foundone + 1

        say 'Found parcel number 'foundone'.  Original ID: 'pcountx

        filename = fname'.0000'foundone
      
        IF (foundone > 9)
          filename = fname'.000'foundone
        ENDIF

        IF (foundone > 99)
          filename = fname'.00'foundone
        ENDIF

        IF (foundone > 999)
          filename = fname'.0'foundone
        ENDIF

        IF (foundone > 9999)
          filename = fname'.'foundone
        ENDIF

*----------------------------------------------------------------------------
* Section 2.1: Time loop
*----------------------------------------------------------------------------

        tcount = 1

        WHILE (tcount <= nmax)

          'set t 'tcount

*----------------------------------------------------------------------------
* Section 2.2: write variables to file
*----------------------------------------------------------------------------

           IF (tcount = 1)
             header1 = '   t        xp       yp       zp    '
             header2 = '   dudx        dudy      dudz     '
             header3 = '   dvdx      dvdy      dvdz     '
             header4 = '  dwdx      dwdy      dwdz      '
             header5 = '  xi         eta      zeta       '
             header6 = 'u       v       w     rho     '    
             header7 = 'th     prs        b'
             headerstring = header1 header2 header3 header4 header5 header6 header7
             dummy  = write(outpath'/'filename, headerstring)
           ENDIF

          'set gxout print'
    
          'set prnopts %12.2f 1 2'
          'd xp'
          xxt = sublin(result, 2)
          xx = subwrd(xxt,1)

          'set prnopts %12.2f 1 2'
          'd yp' 
          yyt = sublin(result, 2)
          yy = subwrd(yyt,1)

          'set prnopts %12.2f 1 2'
          'd zp' 
          zzt = sublin(result, 2)
          zz = subwrd(zzt,1)

* u-derivatives

          'set prnopts %12.6f 1 2'
          'd dudx'
          dummy = sublin(result, 2)
          wdudx = subwrd(dummy,1)

          'd dudy'
          dummy = sublin(result, 2)
          wdudy = subwrd(dummy,1)

          'd dudz'
          dummy = sublin(result, 2)
          wdudz = subwrd(dummy,1)

* v-derivatives

          'd dvdx'
          dummy = sublin(result, 2)
          wdvdx = subwrd(dummy,1)

         'd dvdy'
          dummy = sublin(result, 2)
          wdvdy = subwrd(dummy,1)

         'd dvdz'
          dummy = sublin(result, 2)
          wdvdz = subwrd(dummy,1)

* w-derivatives

          'd dwdx'
          dummy = sublin(result, 2)
          wdwdx = subwrd(dummy,1)

         'd dwdy'
          dummy = sublin(result, 2)
          wdwdy = subwrd(dummy,1)

         'd dwdz'
          dummy = sublin(result, 2)
          wdwdz = subwrd(dummy,1)

* vorticity

         'd xi'
          dummy = sublin(result, 2)
          wxi = subwrd(dummy,1)
 
         'd eta'
          dummy = sublin(result, 2)
          weta = subwrd(dummy,1)
 
         'd zeta'
          dummy = sublin(result, 2)
          wzeta = subwrd(dummy,1)

* velocities

        'set prnopts %12.2f 1 2'

          'd u'
          dummy = sublin(result, 2)
          zu = subwrd(dummy,1)


          'd v'
          dummy = sublin(result, 2)
          zv = subwrd(dummy,1)

          'd w'
          dummy = sublin(result, 2)
          zw = subwrd(dummy,1)

* scalars
         'd rho'
          dummy = sublin(result, 2)
          zrho = subwrd(dummy,1)

         'd th'
          dummy = sublin(result, 2)
          zth = subwrd(dummy,1)

         'd prs'
          dummy = sublin(result, 2)
          zprs = subwrd(dummy,1)

         'd b'
          dummy = sublin(result, 2)
          zb = subwrd(dummy,1)

* time

          timesec = t0 + (tcount - 1) * dt

          'set prnopts %8.1f 1 2'
          'd 'timesec
          ttt = sublin(result, 2)
          tt = subwrd(ttt,1)

          string1 = tt'  'xx'  'yy'  'zz'   '
          string2 = wdudx'  'wdudy'  'wdudz'  '
          string3 = wdvdx'  'wdvdy'  'wdvdz'  '
          string4 = wdwdx'  'wdwdy'  'wdwdz'  ' 
          string5 = wxi'  'weta'  'wzeta'    '   
          string6 = zu'   'zv'   'zw'   'zrho'  '
          string7 = zth'  'zprs'  'zb

          string = string1 string2 string3 string4 string5 string6 string7

          dummy  = write(outpath'/'filename, string)

*----------------------------------------------------------------------------
* end write variables
*----------------------------------------------------------------------------

          tcount = tcount + 1

        ENDWHILE

* Close the file ... else, strange things happen.

        istat = close(outpath'/'filename)
        IF (istat != 0)
          say 'Error while trying to close the file ... aborting.'
          EXIT
        ENDIF          

      ENDIF 

      IF (foundone = foundparcels)
        say
        say 'Done.  Dumped 'foundone' parcels in 'outpath'.'
        EXIT
      ENDIF
 
    ENDWHILE
  ENDWHILE
ENDWHILE

*============================================================================
* End script
*============================================================================


