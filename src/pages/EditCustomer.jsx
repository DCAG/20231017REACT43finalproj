import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

function EditCustomer() {
  const {id: customerId} = useParams()
  const customers = useSelector(store => store.customers)
  const customer = customers.find(customer => customer.id === customerId)??''

  return (
    <div>
      <h1>EditCustomer</h1>
      Name: {customer.firstName}
    </div>
  )
}

export default EditCustomer