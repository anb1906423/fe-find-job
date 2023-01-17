import React, { useState } from 'react'

const SelectItem = (props) => {
  const list = props.list
  // var [list, setList] = useState([])

  const item = list.map((item, index) => {
      return (
        <option className='select-options' key={index} value={item}>{item}</option>
      )
  })

  return (
    <div>
      <select className='select-to-search' name={props.name} id="">
        {
          item
        }
      </select>
    </div>
  )
}

export default SelectItem