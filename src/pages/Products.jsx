import React from 'react'
import { useSelector } from 'react-redux'
import ProductItem from '../components/ProductItem'
import ProductSummary from '../components/ProductsSummary'
import { Link } from 'react-router-dom'

function Products() {
  const products = useSelector(store => store.products)

  return (
    <div>
      <nav>
        <Link to='/'>Back</Link>
      </nav>
      <h1>Products</h1>
      <ProductSummary />
      <h3>Customers who baught this product:</h3>
      {
        products.map((product) => {
          return <ProductItem key={product.id} product={product} />
        })
      }
    </div>
  )
}

export default Products