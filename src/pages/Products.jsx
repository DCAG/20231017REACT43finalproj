import React from 'react'
import { useSelector } from 'react-redux'
import ProductItem from '../components/ProductItem'
import ProductSummary from '../components/ProductsSummary'
import { Link, Outlet } from 'react-router-dom'

function Products() {
  const products = useSelector(store => store.products)

  return (
    <div>
      <nav>
        <Link to='/'>Back</Link>
      </nav>
      <h1>Products</h1>
      <Link to='create'>Create new product</Link>
      <Outlet />
      <ProductSummary />
      <div style={{display:'flex', flexDirection:'column', justifyContent:'flex-start', rowGap: '30px'}}>
      {
        products.map((product) => {
          return <ProductItem key={product.id} product={product} />
        })
      }
      </div>
    </div>
  )
}

export default Products