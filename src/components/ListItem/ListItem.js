import React, { useRef, useState, useEffect } from 'react'
import { hexToHSL } from '../../utils'

const ListItem = ({ item }) => {
  const TIMEOUT_MS = 500
  const itemRef = useRef(null)

  const [ copied, setCopied ] = useState(false)

  const handleClick = () => {

    if (document.body.createTextRange) {
      const range = document.body.createTextRange();
      range.moveToElementText(itemRef);
      range.select();
  } else if (window.getSelection) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(itemRef.current.childNodes[0]);
      selection.removeAllRanges();
      selection.addRange(range);
  } else {
      console.warn("Could not select text in node: Unsupported browser.");
  }

  copied || document.execCommand('copy')
  setCopied(true)

  }

  const getTextColor = () => {
    return hexToHSL(item.color).l > 50 ? 'black' : 'white'
  }

  useEffect(() => {
    if (copied) {
      const timeOut = setTimeout(() => {setCopied(false)}, TIMEOUT_MS)
      return () => {
        clearTimeout(timeOut)
      }
    }
  }, [copied])

  return (
    <li className='hex-list__item' ref={ itemRef } onClick={ handleClick } style={{ backgroundColor: item.color, color: getTextColor() }}>{copied ? 'Copied!' : item.color}</li>
  )
}

export default ListItem
