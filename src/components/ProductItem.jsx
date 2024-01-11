import React from 'react'
import PurchasesList from './PurchasesList'
import {Link} from 'react-router-dom'

function ProductItem({product}) {
  return (
    <div className='list-item--row'>
      <div className='grid-container'>
        <div className='item0'>
          <Link to={product.id}><big>{product.name}</big></Link>
        </div>
        <div className='item1'>Price:</div>
        <div className='item2'>{product.price}</div>
        <div className='item3'>Quantity:</div>
        <div className='item4'>{product.quantity}</div> <br />
      </div>
      <h3>List of customers</h3>
      <PurchasesList productId={product.id} />
    </div>
  )
}

export default ProductItem