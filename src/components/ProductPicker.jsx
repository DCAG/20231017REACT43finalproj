import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ComboBox from './ComboBox'

function ProductPicker({buttonShowText = 'Add', buttonSaveText = 'Save', pickCallback}) {
  const products = useSelector(store => store.products)
  const [pickedProduct, setPickedProduct] = useState('')
  const [displayPicker, setDisplayPicker] = useState(false)
  
  const pickProduct = () =>{
    pickCallback(pickedProduct)
  }

  return (
    <div>
        <button onClick={() => setDisplayPicker(prev => !prev)}>{buttonShowText}</button><br />
        <div style={displayPicker?{}:{display:'none'}}>
        <ComboBox options={products.map(p=>{return {value:p.id,display:p.name}})} onChange={(e)=>setPickedProduct(e.target.value)} />
        <button onClick={pickProduct}>{buttonSaveText}</button>
        </div>
    </div>
  )
}

export default ProductPicker