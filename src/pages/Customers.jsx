import React from 'react'
import { useSelector } from 'react-redux'
import ProductPicker from '../components/ProductPicker'
import {Link} from 'react-router-dom'

function Customers() {
  const customers = useSelector(store => store.customers)
  const purchases = useSelector(store => store.purchases)

  const productPickCallback = (e, productId) =>{
    const newPurchase = {
      productId: productId,
      timestamp: (new Date()).toISOString(),
      customerId: this.name
    }
    dispatch({type: 'PURCHASE_CREATE', payload: newPurchase})
    dispatch({type: 'PRODUCT_DEC_QUANTITY', payload: productId})
  }

  return (
    <div>
        <h1>Customers</h1>

        <table>
            <thead>
                <tr>
                    <th>name</th>
                    <th>product names</th>
                    <th>purchased dates</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    customers.map((customer, index) => {
                        return (
                            <tr key={index}>
                                <td>{customer.firstName}</td>
                                <td>
                                    <ul>
                                    {
                                        purchases.filter(purchase => purchase.customerId === customer.id).map((purchase,index) => {
                                            return (<li key={index}><Link to={'/products/'+purchase.productId}>{purchase.productId}</Link> {purchase.timestamp}</li>)
                                        })
                                    }
                                    </ul>
                                </td>
                                <td></td>
                                <td><ProductPicker name={customer.id} buttonShowText = 'Buy Product' buttonSaveText = 'Buy' pickCallback={productPickCallback}/></td>
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