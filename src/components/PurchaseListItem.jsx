import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductPicker from './ProductPicker'
import {Link} from 'react-router-dom'

function PurchaseListItem({purchase}) {
  const dispatch = useDispatch()
  const customers = useSelector(store => store.customers)
  const customer = customers.find(customer => customer.id === purchase.customerId)??''

  /*
  This {productId} is of a new product that we may add to a customer.
  */
  const productPickCallback = (productId) =>{
    dispatch({type: 'PURCHASE_CREATE', payload: {
      productId : productId,
      customerId: customer.id
    }})
  }

  return (
    <div style={{display: 'flex', justifyContent:'space-between', border: "solid 1px", textAlign: 'left'}}>
        <Link to={'/customers/' + customer.id}>{customer.firstName} {customer.lastName}</Link>
        {purchase.date}
        <ProductPicker buttonShowText='Add' buttonSaveText='Save' pickCallback={productPickCallback} />
    </div>
  )
}

export default PurchaseListItem