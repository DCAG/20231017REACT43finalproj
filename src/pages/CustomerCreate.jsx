import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

function CustomerCreate() {
  const [customer, setCustomer] = useState({firstName:'', lastName:'', city:''})
  const dispatch = useDispatch()

  const handleChange = (e) => {
    var {name, value} = e.target
    value = isNaN(value) ? value : +value
    setCustomer({...customer, [name]:value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch('CUSTOMER_CREATE', customer)
  }

  return (
    <div>
        <h1>Create New Customer</h1>

        <form onSubmit={handleSubmit}>
            <label htmlFor='firstName'>Name</label><input type='text' name='firstName' onChange={handleChange}></input>
            <label htmlFor='lastName'>Quantity</label><input type='text' name='lastName' onChange={handleChange}></input>
            <label htmlFor='city'>Price</label><input type='text' name='city' onChange={handleChange}></input>
            <button type='submit'>Create</button>
        </form>
    </div>
  )
}

export default CustomerCreate