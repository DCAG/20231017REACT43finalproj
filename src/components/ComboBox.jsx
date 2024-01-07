import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

function ComboBox({items/*key-value pair {value:..,display:...} */, onChange}) {
  const [compUniquId,setCompUniquId] = useState(uuidv4())
  return (
    <>
    <input type="text" list={compUniquId} onChange={(e)=>onChange(e)} />
    <datalist id={compUniquId}>
    {
        items.map((item, index) => {
            return <option key={index} value={item.value}>{item.display}</option>  
        })
    }
    </datalist>
    </>
  )
}

export default ComboBox