import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PurchasesList from '../components/PurchasesList'
import {Link} from 'react-router-dom'


function EditCustomer() {
  const dispatch = useDispatch()
  const {id: customerId} = useParams()
  const customers = useSelector(store => store.customers)
  const [customer, setCustomer] = useState(customers.find(customer => customer.id === customerId)??'')
  const handleChange = (e) => {
    return setCustomer({...customer,[e.target.name]:e.target.value})
  }

  const updateCustomer = () =>{
    dispatch({type:'CUSTOMER_UPDATE',payload:customer})
  }

  const deleteCustomer = () =>{
    dispatch({type:'CUSTOMER_DELETE',payload:customer.id})
  }

  return (
    <div>
      <Link to='/'>Back</Link>
      <h1>EditCustomer</h1>
      First Name: <input type="text" name='firstName' onChange={handleChange} value={customer.firstName} /> <br />
      Last Name: <input type="text" name='lastName' onChange={handleChange} value={customer.lastName} /> <br />
      City: <input type="text" name='city' onChange={handleChange} value={customer.city} /> <br />
      <button onClick={updateCustomer}>Update</button><button onClick={deleteCustomer}>Delete</button><br />
      <br />
      {/*
        <PurchasesList // by customer id
      */}
    </div>
  )
}

export default EditCustomer