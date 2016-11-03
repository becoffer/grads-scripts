function colorset(args)

colorset=subwrd(args,1)

if(subwrd(args,1)='')
   help()
   return
endif



if(colorset='vapor' | colorset='v' | colorset='Vapor')
*Greens
   'set rgb 16 0 109 0'
   'set rgb 17 0 129 2'
   'set rgb 18 0 164 0'
   'set rgb 19 5 182 3'
   'set rgb 20 0 211 2'
   'set rgb 21 0 239 0'
   
*Blues
   'set rgb 22 11 232 223'
   'set rgb 23 0 219 217'
   'set rgb 24 9 192 198'
   'set rgb 25 0 162 171'
   'set rgb 26 0 140 142'
   'set rgb 27 0 112 112'
   
*Pinks
   'set rgb 28 112 0 112'
   'set rgb 29 145 0 148'
   'set rgb 30 170 0 167'
   'set rgb 31 193 0 196'
   'set rgb 32 222 2 224'
   'set rgb 33 248 0 255'

*Grays
   'set rgb 34 239 239 239'
   'set rgb 35 221 221 221'
   'set rgb 36 200 200 200'
   'set rgb 37 188 188 188'
   'set rgb 38 160 160 160'
   'set rgb 39 140 140 140'
   'set rgb 40 125 125 125'
   'set rgb 41 105 105 105'
   'set rgb 42 90 90 90'
   'set rgb 43 66 66 66'
   'set rgb 44 45 45 45'
 
*Reds
   'set rgb 45 99 10 0'
   'set rgb 46 170 67 0'
   'set rgb 47 229 108 3'
   'set rgb 48 229 0 5'
   'set rgb 49 184 0 0'
   'set rgb 50 118 3 0'
   'set rgb 51 79 1 1'


   set_plot(-80,-10,2)
   say '-------------------------------'
   say 'Color Scale set to Water Vapor.'
   say '-------------------------------'

endif



if(colorset='IR1' | colorset='Infrared1' | colorset='infrared1')

*Blues
   'set rgb 16 255 255 255'
   'set rgb 17 108 20 156'
   'set rgb 18 77 50 183'
   'set rgb 19 48 83 213'
   'set rgb 20 22 107 236'
   'set rgb 21 0 193 254'
   'set rgb 22 42 166 255'
   'set rgb 23 66 197 249' 
   'set rgb 24 92 226 255'
   'set rgb 25 124 255 249'
   
*Greens
   'set rgb 26 132 252 204'
   'set rgb 27 135 252 145'
   'set rgb 28 151 255 130'
   'set rgb 29 209 255 128'

*Yellows/Reds
   'set rgb 30 255 246 117'
   'set rgb 31 255 189 58'
   'set rgb 32 249 136 6'
   'set rgb 33 241 110 0'
   'set rgb 34 212 93 1'
   'set rgb 35 208 68 0'
   'set rgb 36 182 48 10'
   'set rgb 37 163 29 2'
   'set rgb 38 138 15 0'
   'set rgb 39 255 255 255'


   set_plot(-75,40,5)
   say '-------------------------------'
   say 'Color Scale set to Color Infrared 1.'
   say '-------------------------------'

endif


if(colorset='funktop' | colorset='Funktop' | colorset='IR2' | colorset='Infrared2' | colorset='infrared2')
  
*Grays
  'set rgb 16 23 23 23'
  'set rgb 17 36 36 36'
  'set rgb 18 47 47 47'
  'set rgb 20 66 66 66'
  'set rgb 21 80 80 80'
  'set rgb 22 100 100 100'
  'set rgb 23 118 118 118'
  'set rgb 24 130 130 130'
  'set rgb 25 146 146 146'
  'set rgb 26 160 160 160'
  'set rgb 27 174 174 174'
  'set rgb 28 190 190 190'
  'set rgb 29 203 203 203'
  'set rgb 30 221 221 221'

*Yellows
  'set rgb 31 123 137 51'
  'set rgb 32 124 161 58'
  'set rgb 33 191 188 55'
  'set rgb 34 232 214 28'
  'set rgb 35 244 221 29'

*blues
  'set rgb 36 60 57 144'
  'set rgb 37 2 83 172'
  'set rgb 38 0 132 204'
  'set rgb 39 2 146 217'

*reds
  'set rgb 40 101 40 37'
  'set rgb 41 162 61 51'
  'set rgb 42 204 61 53'
  'set rgb 43 112 123 117'

*Greens
  'set rgb 44 0 142 77'
  'set rgb 45 119 186 143'
  'set rgb 46 189 217 203'

*Whites
  'set rgb 47 225 225 225'
  'set rgb 48 232 232 232'
  'set rgb 49 240 240 240'
  'set rgb 50 255 255 255'

  clevs='-110 -105 -100 -95 -90 -85 -80 -75 -70 -65 -60 -55 -50 -45 -40 -35 -30 -24 -20 -18 -12 -6 0  6  12 18 24 30 36 42 48 54 60' 
  ccols='50   49   48  47  46  45  44  43  42  41  40  39  38  37  36  35  34  33  32  31  30 29 28 27 26 25 24 23 22 21 20 18 17 16'

  say '-------------------------------'
  say 'Contour levels set to: 'clevs
  say 'Color Values set to: 'ccols
  say '-------------------------------'

  'set clevs 'clevs
  'set ccols 'ccols

   say '-------------------------------'
   say 'Color Scale set to Funktop Coloscale.'
   say '-------------------------------'

endif



if(colorset='IR3' | colorset='Infrared3' | colorset='infrared3')
  
*Grays
  'set rgb 40 120 120 120'
  'set rgb 39 143 143 143'   
  'set rgb 38 156 156 156'   
  'set rgb 37 165 165 165'   
  'set rgb 36 176 175 176'  
  'set rgb 35 196 196 196'  
  'set rgb 34 196 196 196'   
  'set rgb 33 204 204 204'   
  'set rgb 32 216 216 216'   
  'set rgb 31 228 228 228'   
  'set rgb 30 235 235 235'   
  'set rgb 29 243 243 243'   
  'set rgb 28 254 254 178'   

*Yellows/Oranges
  'set rgb 27 255 255 1'     
  'set rgb 26 255 229 0'     
  'set rgb 25 255 204 0'
  'set rgb 24 255 179 0'
  'set rgb 23 255 154 0'
  'set rgb 22 255 126 0'

*Reds/Pinks
  'set rgb 21 255 85 0'
  'set rgb 20 255 0 0'
  'set rgb 19 255 69 69'
  'set rgb 18 252 106 106'
  'set rgb 17 254 146 146'
  'set rgb 16 253 178 178'


   set_plot(-90,30,5)
   say '-------------------------------'
   say 'Color Scale set to Infrared 3.'
   say '-------------------------------'

endif



if(colorset='AVN' | colorset='Infrared4' | colorset='infrared4' | colorset='IR4')
  
*Grays
  'set rgb 43 20 20 20'
  'set rgb 42 40 40 40'  
  'set rgb 41 60 60 60' 
  'set rgb 40 80 80 80'  
  'set rgb 39 100 100 100' 
  'set rgb 38 120 120 120'  
  'set rgb 37 140 140 140' 
  'set rgb 36 160 160 160'  
  'set rgb 35 180 180 180' 
  'set rgb 34 200 200 200'  
  'set rgb 33 225 225 225' 
  'set rgb 32 243 243 243'  
  'set rgb 31 254 254 248'  

*Blues
  'set rgb 30 0 137 242'
  'set rgb 29 0 158 245'
  'set rgb 28 0 137 212'
  'set rgb 27 0 132 213'
  'set rgb 26 0 123 175'


*Yellows    
  'set rgb 25 144 168 0'
  'set rgb 24 194 191 0'
  'set rgb 23 221 223 0'
  'set rgb 22 251 254 0'

*Reds/Oranges
  'set rgb 21 255 179 0'
  'set rgb 20 237 161 0'
  'set rgb 19 248 128 0'
  'set rgb 18 173 130 12'
  'set rgb 17 252 0 0'
  'set rgb 16 218 19 0'


   set_plot(-80,50,5)
   say '-------------------------------'
   say 'Color Scale set to Infrared 4 (AVN Color Scale).'
   say '-------------------------------'

endif




if(colorset='Visible' | colorset='Vis' | colorset='visible' | colorset='vis')

*For Brightness >= 0

   'set rgb 16 12 12 12'
   'set rgb 17 45 45 45'
   'set rgb 18 71 71 71'
   'set rgb 19 92 92 92'
   'set rgb 20 102 102 102'
   'set rgb 21 114 114 114'
   'set rgb 22 123 123 123'
   'set rgb 23 139 139 139'
   'set rgb 24 143 143 143'
   'set rgb 25 151 151 151'
   'set rgb 26 165 160 160'
   'set rgb 27 171 171 171'
   'set rgb 28 180 180 180'
   'set rgb 29 184 184 184'
   'set rgb 30 190 190 190'
   'set rgb 31 198 198 198'
   'set rgb 32 204 204 204'
   'set rgb 33 210 210 210'
   'set rgb 34 216 216 216'
   'set rgb 35 226 226 226'
   'set rgb 36 231 231 231'
   'set rgb 37 239 239 239'
   'set rgb 38 242 242 242'
   'set rgb 39 249 249 249'
   'set rgb 40 255 255 255'


   set_plot(3,75,3)
   say '-------------------------------'
   say 'Color Scale set to Visible Satellite (NOAA/UCAR - Note: CLASS visible data will have to be divided by ~175/180 to fit this scale)'
   say '-------------------------------'

endif




if(colorset='Rad1' | colorset='rad1' | colorset='Reflectivity' | colorset='reflectivity')

*For Reflectivity >= 0
   'set rgb 16 100 100 100'
   'set rgb 17 4 233 231'
   'set rgb 18 1 159 244'
   'set rgb 19 3 0 244'
   'set rgb 20 2 253 2'
   'set rgb 21 1 197 1'
   'set rgb 22 0 142 0'
   'set rgb 23 253 248 2'
   'set rgb 24 229 188 0'
   'set rgb 25 253 149 0'
   'set rgb 26 253 0 0'
   'set rgb 27 212 0 0'
   'set rgb 28 188 0 0'
   'set rgb 29 248 0 253'
   'set rgb 30 152 84 198'
   'set rgb 31 255 255 255'


   set_plot(0,75,5)
   say '-------------------------------'
   say 'Color Scale set to Color Radar Reflectivity.'
   say '-------------------------------'

endif




if(colorset='Wrad1' | colorset='wrad1' | colorset='Wunder1' | colorset='wunder1' | colorset='wunder_rain')

*For Reflectivity >= 0

   'set rgb 16 100 100 100'
   'set rgb 17 0 66 11'
   'set rgb 18 2 104 12'
   'set rgb 19 33 152 7'
   'set rgb 20 105 187 7'
   'set rgb 21 176 213 2'
   'set rgb 22 251 253 54'
   'set rgb 23 252 226 2'
   'set rgb 24 255 186 0'
   'set rgb 25 251 136 1'
   'set rgb 26 253 79 3'
   'set rgb 27 245 0 98'
   'set rgb 28 202 12 115'
   'set rgb 29 150 17 145'
   'set rgb 30 115 4 151'
   'set rgb 31 91 1 135'



   set_plot(0,75,5)
   say '-------------------------------'
   say 'Color Scale set to Color Radar Reflectivity (Rain) From Wunderground.'
   say '-------------------------------'

endif



if(colorset='Wrad2' | colorset='wrad2' | colorset='Wunder2' | colorset='wunder2' | colorset='wunder_mix')

*For Reflectivity >= 0

   'set rgb 16 100 100 100'
   'set rgb 17 105 1 82'
   'set rgb 18 119 1 85'
   'set rgb 19 132 1 87'
   'set rgb 20 150 26 105'
   'set rgb 21 168 52 123'
   'set rgb 22 189 71 139'
   'set rgb 23 210 91 156'
   'set rgb 24 220 114 168'
   'set rgb 25 230 137 179'
   'set rgb 26 237 160 193'
   'set rgb 27 245 183 208'
   'set rgb 28 250 201 220'
   'set rgb 29 254 220 232'
   'set rgb 30 254 231 237'
   'set rgb 31 255 238 243'



   set_plot(0,75,5)
   say '-------------------------------'
   say 'Color Scale set to Color Radar Reflectivity (Mixed Precip) From Wunderground.'
   say '-------------------------------'

endif


if(colorset='Wrad3' | colorset='wrad3' | colorset='Wunder3' | colorset='wunder3' | colorset='wunder_snow')

*For Reflectivity >= 0

   'set rgb 16 100 100 100'
   'set rgb 17 1 58 135'
   'set rgb 18 1 68 160'
   'set rgb 19 0 78 185'
   'set rgb 20 6 88 200'
   'set rgb 21 12 98 216'
   'set rgb 22 51 114 228'
   'set rgb 23 90 129 239'
   'set rgb 24 115 142 241'
   'set rgb 25 140 155 243'
   'set rgb 26 165 165 246'
   'set rgb 27 190 174 249'
   'set rgb 28 213 197 252'
   'set rgb 29 236 220 255'
   'set rgb 30 242 227 255'
   'set rgb 31 249 235 255'



   set_plot(0,75,5)
   say '-------------------------------'
   say 'Color Scale set to Color Radar Reflectivity (Snow) From Wunderground.'
   say '-------------------------------'

endif



if(colorset='Rad2' | colorset='rad2' | colorset='Velocity' | colorset='velocity' | colorset='Vel' | colorset='vel')

*Greens
  'set rgbset 16 2 252 2'
  'set rgbset 17 1 228 1'
  'set rgbset 18 1 197 1'
  'set rgbset 19 7 172 4'
  'set rgbset 20 6 143 3'
  'set rgbset 21 4 114 2'
  'set rgbset 22 124 151 123'

*Reds
  'set rgbset 23 152 119 119'
  'set rgbset 24 137 0 0'
  'set rgbset 25 162 0 0'
  'set rgbset 26 185 0 0'
  'set rgbset 27 216 0 0'
  'set rgbset 28 239 0 0'
  'set rgbset 29 254 0 0'

  'set clevs -99 -80 -60 -45 -20 -5 0  5  20 45 60 80 99'
  'set ccols  16  17  18  19  20 21 22 23 24 25 26 27 28 29'

   say '-------------------------------'
   say 'Color Scale set to Radial Veloctiy Coloscale.'
   say '-------------------------------'

endif


if(colorset='CTH' | colorset='Cloud_Height' | colorset='cth' | colorset='Cth')
  
*All Colors
  'set rgb 16 42 85 120'
  'set rgb 17 77 57 172'  
  'set rgb 18 9  107 234' 
  'set rgb 19 27 158 249'
  'set rgb 20 80 215 247'
  'set rgb 21 121 253 229'
  'set rgb 22 120 254 121'
  'set rgb 23 240 249 140'
  'set rgb 24 235 202 89'
  'set rgb 25 232 154 43'
  'set rgb 26 233 107 7'
  'set rgb 27 189 46 6'
  'set rgb 28 120 4 5'


   set_plot(10,70,5)
   say '-------------------------------'
   say 'Color Scale set to Cloud Top Height (KFt) (UCAR Color Scale).'
   say '-------------------------------'

endif



function set_plot(min,max,int)


    value = min
    cval=16
    c_levs = ''
    c_cols = ''

    while( value <= max )
      c_levs = c_levs ' ' value
      c_cols = c_cols ' ' cval
      value = value + int
      cval=cval+1
    endwhile
    c_cols=c_cols' 'cval-1

    say '-------------------------------'
    say 'Contour levels set to: 'c_levs
    say 'Color Values set to: 'c_cols
    say '-------------------------------'

    'set clevs 'c_levs
    'set ccols 'c_cols

return





function help()
  say '---------------------------------------------------'
  say '                 colorset v1.2                     '
  say '   New to Version 1.2:                             '
  say '     -Wunderground RADAR reflectivity scales added.'
  say '     -Visible Satellite color scale added.         '
  say '     -Cloud Top Height color scale added.
  say '---------------------------------------------------'
  say 'Usage:'
  say 'colorset scale'
  say 'Required: scale '
  say '          -A call with no specified scale will bring up this help page.'
  say '---------------------------------------------------'
  say ''
  say 'Currently Available Color Scales:'
  say '                 -Watervapor (ucar): Vapor(v)'
  say '                 -Color IR (ucar): Infrared1(IR1)'
  say '                 -Funktop IR (NOAA): Funktop(IR2)'
  say '                 -Color Enhanced IR: Infrared3(IR3)'
  say '                 -AVN IR Scale (NOAA) :AVN (IR4)'
  say '                 -Cloud Top Height (ucar) :CTH (Cloud_Height)'
  say '                 -Visible Satellite Scale (NOAA) :Visible (vis) - CLASS Visible data should be divided by ~175/180 to best fit this scale.'
  say '                 -RADAR Reflectivity (NOAA): Reflectivity (Rad1)'
  say '                 -RADAR Velocity (NOAA): Velocity (Rad2)'
  say '                 -RADAR Reflectivity (Rain) (Wunderground): Wunder1 (Wrad1)'
  say '                 -RADAR Reflectivity (Mix) (Wunderground): Wunder2 (Wrad2)'
  say '                 -RADAR Reflectivity (Snow) (Wunderground): Wunder2 (Wrad3)'
  say ''
  say '---------------------------------------------------'
  say ''
  say 'Example: colorset IR1'
  say '         sets the contour levels and the colors to match the Color IR scale used here: http://weather.rap.ucar.edu/satellite/'
  say 
  say 'Version 1.0: Developed May 2013 | Version 1.2: Updated July 2013'
  say 'Check back at http://gradsaddict.blogspot.com/ in the near future for new color scales'
  say 'Please report any bugs.'
 
**
