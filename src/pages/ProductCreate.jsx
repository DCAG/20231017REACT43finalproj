import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

function ProductCreate() {
  const [product, setProduct] = useState({name:'', price:0, quantity:0})
  const dispatch = useDispatch()

  const handleChange = (e) => {
    var {name, value} = e.target
    value = isNaN(value) ? value : +value
    setProduct({...product, [name]:value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch('PRODUCT_CREATE', product)
  }

  return (
    <div>
        <h3>Create New Product</h3>
        <form onSubmit={handleSubmit}>
            <label htmlFor='name'>Name</label> <input type='text' id='name' name='name' onChange={handleChange}></input> <br />
            <label htmlFor='quantity'>Quantity</label> <input type='number' id='quantity' name='quantity' onChange={handleChange}></input> <br />
            <label htmlFor='price'>Price</label> <input type='number' id='price' name='price' onChange={handleChange}></input> <br />
            <button type='submit'>Create</button>
        </form>
    </div>
  )
}

export default ProductCreate