import React from 'react'
import PurchasesList from './PurchasesList'

function ProductItem({product}) {
  return (
    <div>
        Name: {product.name} <br />
        Price: {product.price} <br />
        Quantity: {product.quantity} <br />
        <PurchasesList productId={product.id} />
    </div>
  )
}

export default ProductItem