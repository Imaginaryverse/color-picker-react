import React from 'react'
import { intensifyText } from '../../utils'
import ListItem from '../ListItem/ListItem'

const HexList = ({color}) => {

  const listItems = [
    {title: 'Primary', color: color.primary},
    {title: 'PrimaryMod', color: color.primaryMod},
    {title: 'Secondary', color: color.secondary},
    {title: 'SecondaryMod', color: color.secondaryMod},
    {title: 'Tertiary', color: color.tertiary},
    {title: 'TertiaryMod', color: color.tertiaryMod},
   ]

  return (
    <ul className="hex-list">

      {listItems.map((item, i) => {
        return (
          <ListItem key={i} item={item} />

        )
      })}
    </ul>
  )
}

export default HexList
