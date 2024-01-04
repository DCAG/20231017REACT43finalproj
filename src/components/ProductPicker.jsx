import React, { useState } from 'react'
import { useSelector } from 'react-redux'

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
        {/*
        ref: https://stackoverflow.com/questions/45167565/does-react-js-support-html5-datalist
        */}
        <div style={displayPicker?{}:{display:'none'}}>
          <input type="text" list="data" onChange={(e)=>setPickedProduct(e.target.value)} />
          <datalist id="data">
              {
                products.map((product, index) => {
                  return <option key={index} value={product.id}>{product.name}</option>  
                })
              }
          </datalist>
          <button onClick={pickProduct}>{buttonSaveText}</button>
        </div>
    </div>
  )
}

export default ProductPicker