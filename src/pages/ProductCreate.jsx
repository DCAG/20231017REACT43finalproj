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
        <h1>Create New Product</h1>

        <form onSubmit={handleSubmit}>
            <label htmlFor='name'>Name</label><input type='text' name='name' onChange={handleChange}></input>
            <label htmlFor='quantity'>Quantity</label><input type='number' name='quantity' onChange={handleChange}></input>
            <label htmlFor='price'>Price</label><input type='number' name='price' onChange={handleChange}></input>
            <button type='submit'>Create</button>
        </form>
    </div>
  )
}

export default ProductCreate