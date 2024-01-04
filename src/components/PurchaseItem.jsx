import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductPicker from './ProductPicker'
import {Link} from 'react-router-dom'

function PurchaseItem({purchase}) {
  const dispatch = useDispatch()
  const customers = useSelector(store => store.customers)
  const customer = customers.find(customer => customer.id === purchase.customerId)??''

  /*
  This {productId} is of a new product that we may add to a customer.
  useCallback - to prevent the app from rerendering too many times
  */
  const productPickCallback = useCallback((productId) =>{
    const newPurchase = {
      productId: productId,
      timestamp: (new Date()).toISOString(), //'2024-01-04T22:48:30.407Z',
      customerId: purchase.customerId
    }
    dispatch({type: 'PURCHASE_CREATE', payload: newPurchase})
  },[purchase.productId])

  return (
    <div style={{border: "solid white 1px", textAlign: 'left'}}>
        Name: <Link to={'/customers/' + customer.id}>{customer.firstName}</Link> <br />
        Purchased Date: {purchase.timestamp} <br />
        <ProductPicker pickCallback={productPickCallback} />
        
    </div>
  )
}

export default PurchaseItem