import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ComboBox from '../components/ComboBox'
import { useSelector } from 'react-redux'

function Purchases() {
  const [productId, setProductId] = useState('')
  const [customerId, setCustomerId] = useState('')
  const [date, setDate] = useState('')
  const customers = useSelector(store => store.customers)
  const products = useSelector(store => store.products)

  const search = () => {
    console.log('Purchases: search')
  }

  return (
    <div>
      <Link to='/'>Back</Link>
      <h1>Purchases</h1>
      <ComboBox items={products.map(item => {return {value:item.id, display:item.name}})} selectedCallback={(productId) => {setProductId(productId)}} />
      <ComboBox items={customers.map(item => {return {value:item.id, display:item.lastName+' '+item.firstName}})} selectedCallback={(customerId) => {setCustomerId(customerId)}} />
      <input type='date' onChange={e => setDate(e.target.value)} />
      <button onClick={search}>Search</button>
      {/*
      <PurchaseResults customerId={customerId} productId={productId} date={date} />
      */}
    </div>
  )
}

export default Purchases