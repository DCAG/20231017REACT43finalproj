import React from 'react'
import { Link } from 'react-router-dom'

function Menu() {
  return (
    <div className='main-menu'>
        <h1>Menu</h1>
        <nav className='flex-container'>
          <Link to='products'>Products</Link>
          <Link to='customers'>Customers</Link>
          <Link to='purchases'>Purchases</Link>
        </nav>

    </div>
  )
}

export default Menu