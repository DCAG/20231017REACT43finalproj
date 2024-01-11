import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ComboBox from './ComboBox'

function ProductPicker({buttonShowText = 'Add', buttonSaveText = 'Save', pickCallback}) {
  const products = useSelector(store => store.products)
  const [pickedProductId, setPickedProductId] = useState('')
  const [displayPicker, setDisplayPicker] = useState(false)
  
  const pickProduct = () =>{
    pickCallback(pickedProductId)
  }

  return (
    <div>
        <button onClick={() => setDisplayPicker(prev => !prev)}>{displayPicker?'Hide':buttonShowText}</button><br />
        <div style={displayPicker?{}:{display:'none'}}>
          <ComboBox options={products.map(p=>{return {value:`${p.id} | ${p.name}`,display:''}})} onChange={(e)=>setPickedProductId(e.target.value?.split('|')[0]?.trim())} />
          <button onClick={pickProduct}>{buttonSaveText}</button>
        </div>
    </div>
  )
}

export default ProductPicker