import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductPicker from '../components/ProductPicker'
import {Link, Outlet} from 'react-router-dom'

function Customers() {
  const dispatch = useDispatch()
  const customers = useSelector(store => store.customers)
  const purchases = useSelector(store => store.purchases)
  const products = useSelector(store => store.products)

  const productPickCallback = (customerId, productId) =>{
    const newPurchase = { productId, customerId }
    dispatch({type: 'PURCHASE_CREATE', payload: newPurchase})
  }

  return (
    <div>
        <nav>
            <Link to="/">Back</Link> <br />
        </nav>
        <h1>Customers</h1>
        <Link to="create">Create new customer</Link>
        <Outlet /> <br /> <br />
        <table>
            <thead>
                <tr>
                    <th>Customer Name</th>
                    <th>Product Names</th>
                    <th>Purchased Dates</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody style={{verticalAlign:'top'}}>
            {
              customers.map(customer => {
                return (
                  <tr key={customer.id} className='list-item--row'>
                    <td>{customer.firstName} {customer.lastName}</td>
                    <td colSpan='2'>
                      <ul style={{margin:'0'}}>
                      {
                        purchases.filter(
                          purchase => purchase.customerId === customer.id
                        ).map(
                          (purchase) => {
                          return (
                            <li key={purchase.id} style={{display:'flex', justifyContent:'space-between'}}>
                              <Link to={'/products/' + purchase.productId}>
                                {products.find(product => product.id === purchase.productId)?.name??''}
                              </Link>
                              <span>{purchase.date}</span>
                            </li>
                          )}
                        )
                      }
                      </ul>
                    </td>
                    <td><ProductPicker buttonShowText = 'Buy Product' buttonSaveText = 'Buy' pickCallback={(productId)=>productPickCallback(customer.id,productId)}/></td>
                  </tr>
                  )        
              })
            }
            </tbody>
        </table>
    </div>
  )
}

export default Customers