import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ComboBox from '../components/ComboBox'
import { useSelector } from 'react-redux'

function Purchases() {
  const [productId, setProductId] = useState('')
  const [customerId, setCustomerId] = useState('')
  const [date, setDate] = useState('')
  const customers = useSelector(store => store.customers)
  const products = useSelector(store => store.products)
  const purchases = useSelector(store => store.purchases)
  const [purchasesGroupedByCustomer, setPurchasesGroupedByCustomer] = useState({})

  const search = () => {
    var result = purchases.filter(p => {
      return (customerId == '' || p.customerId === customerId) &&
      (productId == '' || p.productId === productId) && 
      (date == '' || p.date === date)
    }).map(
      purchase => {
        var {firstName: customerFirstName, lastName: customerLastName} = customers.find(customer=>customer.id === purchase.customerId)
        var {name: productName} = products.find(product=>product.id === purchase.productId)??''
        return {
          ...purchase,
          customerFirstName,
          customerLastName,
          customerFullName: customerFirstName + ' ' + customerLastName,
          productName,
        }
    })
    result = Object.groupBy(result,({customerId}) => customerId)  
    setPurchasesGroupedByCustomer({...result})
  }

  return (
    <div>
      <nav>
        <Link to='/'>Back</Link>
      </nav>
      <h1>Purchases</h1>
      Products: <ComboBox options={products.map(item => {return {value:item.id, display:item.name}})} onChange={(e) => {setProductId(e.target.value)}} /> <br />
      Customers: <ComboBox options={customers.map(item => {return {value:item.id, display:item.lastName+' '+item.firstName}})} onChange={(e) => {setCustomerId(e.target.value)}} /> <br />
      Purchase Date: <input type='date' onChange={e => setDate(e.target.value)} /> <br />
      <button onClick={search}>Search</button>
      {
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Product</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody style={{verticalAlign:'top'}}>
          {
            Object.keys(purchasesGroupedByCustomer).map(
              // for each customer
              customerId => {
              const customerPurchasesList = purchasesGroupedByCustomer[customerId] 
              return customerPurchasesList.map(
                // for each (the current customer's) purchase - paint a table row
                (purchase, index) => {
                return (
                  <tr key={purchase.id}>
                    {
                      index === 0?(
                        <td rowSpan={customerPurchasesList.length}>
                          {purchase.customerFullName}
                        </td>
                      ):''
                    }
                    <td>{purchase.productName}</td>
                    <td>{purchase.date}</td>
                  </tr>
                )
                })
              })
            }
          </tbody>
        </table>
      }
    </div>
  )
}

export default Purchases