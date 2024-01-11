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
    dispatch({type:'CUSTOMER_CREATE', payload:customer})
  }

  return (
    <div>
        <h3>Create New Customer</h3>

        <form onSubmit={handleSubmit}>
            <label htmlFor='firstName'>firstName</label><input type='text' id='firstName' name='firstName' onChange={handleChange}></input> <br />
            <label htmlFor='lastName'>lastName</label><input type='text' id='lastName' name='lastName' onChange={handleChange}></input> <br />
            <label htmlFor='city'>city</label><input type='text' id='city' name='city' onChange={handleChange}></input> <br />
            <button type='submit'>Create</button>
        </form>
    </div>
  )
}

export default CustomerCreate