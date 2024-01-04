import React from 'react'
import { Link } from 'react-router-dom'

function Menu() {
  return (
    <div>
        <h2>Menu</h2>

        <Link to='products'>Products</Link> <br />
        <Link to='customers'>Customers</Link> <br />
        <Link to='purchases'>Purchases</Link> <br />

    </div>
  )
}

export default Menu