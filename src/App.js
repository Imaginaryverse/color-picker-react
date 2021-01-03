import React, { useState, useEffect } from 'react'
import Display from './components/Display/Display'
import HexList from './components/HexList/HexList'
import { HSLToHex, hexToHSL, intensifyText } from './utils'

const App = () => {
  const initialState = { primary: '#000000', secondary: '#000000', tertiary: '#000000', primaryMod: '#000000', secondaryMod: '#000000', tertiaryMod: '#000000'}

  const [color, setColor] = useState( initialState )
  const [hexState, setHexState] = useState( '#000000' )
  const [offsetH, setOffsetH] = useState( 130 )
  const [offsetS, setOffsetS] = useState( 10 )
  const [offsetL, setOffsetL] = useState( 40 )

  const handleColorChange = (hexVal) => {
    const hslColor = hexToHSL(hexVal)
    
    const secondaryHex = HSLToHex((hslColor.h + offsetH) % 360, hslColor.s, hslColor.l)
    const tertiaryHex = HSLToHex(((hslColor.h - offsetH) + 360) % 360, hslColor.s, hslColor.l)
    setHexState(hexVal)
    setColor({
      primary: hexVal, 
      secondary: secondaryHex, 
      tertiary: tertiaryHex, 
      primaryMod: intensifyText(hexVal, offsetS, offsetL), 
      secondaryMod: intensifyText(secondaryHex, offsetS, offsetL), 
      tertiaryMod: intensifyText(tertiaryHex, offsetS, offsetL)
    })
  }

  const handleOffsetChange = (newOffset, type) => {
    const hslColor = hexToHSL(hexState)

    let secondaryHex = HSLToHex((hslColor.h + offsetH) % 360, hslColor.s, hslColor.l)
    let tertiaryHex = HSLToHex(((hslColor.h - offsetH) + 360) % 360, hslColor.s, hslColor.l)
    
    switch(type) {
      case 'H':
        secondaryHex = HSLToHex((hslColor.h + newOffset) % 360, hslColor.s, hslColor.l)
        tertiaryHex = HSLToHex(((hslColor.h - newOffset) + 360) % 360, hslColor.s, hslColor.l)
        setOffsetH(newOffset)
        setColor({
          primary: hexState, 
          secondary: secondaryHex, 
          tertiary: tertiaryHex, 
          primaryMod: intensifyText(hexState, offsetS, offsetL),
          secondaryMod: intensifyText(secondaryHex, offsetS, offsetL), 
          tertiaryMod: intensifyText(tertiaryHex, offsetS, offsetL) 
         })
         break;
      case 'S':
        setOffsetS(newOffset)
        setColor({
          ...color, 
          primaryMod: intensifyText(hexState, newOffset, offsetL),
          secondaryMod: intensifyText(secondaryHex, newOffset, offsetL), 
          tertiaryMod: intensifyText(tertiaryHex, newOffset, offsetL) 
         })
         break;
      case 'L':
        setOffsetL(newOffset) 
        setColor({
          ...color, 
          primaryMod: intensifyText(hexState, offsetS, newOffset),
          secondaryMod: intensifyText(secondaryHex, offsetS, newOffset), 
          tertiaryMod: intensifyText(tertiaryHex, offsetS, newOffset) 
         })
         break;
        default:
          return


    }

    console.log(offsetH, offsetS, offsetL)
  }
  const randomizeHue = () => {
    const randomHue = Math.floor(Math.random() * 360)
    handleColorChange(HSLToHex(randomHue, 80, 80))
  }
  useEffect(() => {
    randomizeHue()
  }, [randomizeHue])

  


  return (
    <div className="display-wrapper">
      <Display background={ color.primary} text1={ color.secondaryMod} text2={ color.tertiaryMod }/>
      <Display background={ color.secondary} text1={ color.tertiaryMod} text2={ color.primaryMod }/>
      <Display background={ color.tertiary} text1={ color.primaryMod} text2={ color.secondaryMod }/>

      <div className="input-wrapper">
        <div className="hue-wrapper">
          <input 
              className="color-input" 
              type="color" 
              value={ color.primary } 
              onChange={(e) => handleColorChange(e.target.value) } 
            />
          <button className='random-button' onClick={ randomizeHue }>Random</button>
        </div>
        <div className="offset-wrapper">
        <p>{`Offset H: ${ offsetH }`}</p>
          <input 
           type="range" 
           min='10' 
           max='170'
           value={ offsetH } 
           onChange={ (e) => handleOffsetChange(+e.target.value, 'H') } 
         />
          <p>{`Offset S: ${ offsetS }`}</p>
          <input 
            type="range" 
            min='1' 
            max='40'
            value={ offsetS } 
            onChange={ (e) => handleOffsetChange(+e.target.value, 'S') } 
          />
          <p>{`Offset L: ${ offsetL }`}</p>
          <input 
            type="range" 
            min='1' 
            max='40'
            value={ offsetL } 
            onChange={ (e) => handleOffsetChange(+e.target.value, 'L') } 
          />       
        </div>
      </div>

      <HexList color={color} />
    </div>
  )
}

export default App
