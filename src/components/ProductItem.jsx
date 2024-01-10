import React from 'react'
import PurchasesList from './PurchasesList'

function ProductItem({product}) {
  return (
    <div>
      Name: {product.name} <br />
      Price: {product.price} <br />
      Quantity: {product.quantity} <br />
      <h3>List of customers</h3>
      <PurchasesList productId={product.id} />
    </div>
  )
}

export default ProductItem