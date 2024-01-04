import React from 'react'
import { useSelector } from 'react-redux'
import ProductItem from '../components/ProductItem'
import ProductSummary from '../components/ProductsSummary'
import { Link } from 'react-router-dom'

function Products() {
  const products = useSelector(store => store.products)

  return (
    <div>
        <Link to='/'>Back</Link>
        <h1>Products</h1>
        <ProductSummary />
        {
          products.map((product, index) => {
            return <ProductItem key={index} product={product} />
          })
        }
    </div>
  )
}

export default Products