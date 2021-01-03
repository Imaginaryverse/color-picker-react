import React from 'react'
import './style.css'

const Display = ({ background, text1, text2}) => {

  return (
    <div className="display" style={{ backgroundColor: background }}>
        <p style={{ color: text1}}>ONE</p>
        <p style={{ color: text2}}>TWO</p>
      </div>
  )
}

export default Display
