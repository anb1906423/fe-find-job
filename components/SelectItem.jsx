import React, { useState } from 'react'

const SelectItem = (props) => {
  const list = props.list
  // var [list, setList] = useState([])

  const handleSelectedChange = (e) => {
    const selectedValue = e.target.value;
    props.onSelectedChange(selectedValue);
  }

  const item = list.map((item, index) => {
      return (
        <option className='select-options' key={index} value={item.ten}>{item.ten}</option>
      )
  })

  return (
    <div>
      <select className='select-to-search' name={props.ten} id="" onChange={handleSelectedChange}>
        {
          item
        }
      </select>
    </div>
  )
}

export default SelectItem