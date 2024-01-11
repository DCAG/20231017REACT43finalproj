import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

/**
 * A component to select an item from a list of specified value with the option to write in a textbox and get the benefit of completion from permitted or available values.
 * @param {Array} options
 * key value pair objects {value:'*',display:'*'} that will be shown in the list of options to pick from 
 * @param {Function} onChange
 * a callback function to call on value change
 * @returns {JSX.Element} the jsx element
 */
function ComboBox({options, onChange}) {
  const [compUniquId,setCompUniquId] = useState(uuidv4())
  return (
    <>
    {/*
      ref: https://stackoverflow.com/questions/45167565/does-react-js-support-html5-datalist
    */}
    <input type="text" list={compUniquId} onChange={(e)=>onChange(e)} />
    <datalist id={compUniquId}>
    {
      options.map((option, index) => {
          return <option key={index} value={option.value}>{option.display}</option> 
      })
    }
    </datalist>
    </>
  )
}

export default ComboBox