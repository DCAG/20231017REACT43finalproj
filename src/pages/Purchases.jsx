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
    console.log('Purchases: search')
    console.log(date)
    console.log(purchases)
    console.log(customerId)
    console.log(productId)
    var result = 
    purchases.filter(p => {
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
    console.log(result)
    setPurchasesGroupedByCustomer({...result})
    console.log(Object.keys(purchasesGroupedByCustomer))
    console.log(purchasesGroupedByCustomer[Object.keys(purchasesGroupedByCustomer)[0]])
  }

  return (
    <div>
      <Link to='/'>Back</Link>
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
            Object.keys(purchasesGroupedByCustomer).map( key => { 
              console.log(purchasesGroupedByCustomer)
              console.log(key)
              return purchasesGroupedByCustomer[key]?.map( (purchase,index) => {
                return (
                  <tr key={purchase.id}>
                    {
                      index === 0?(
                        <td rowSpan={purchasesGroupedByCustomer[key].length}>
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
      {/*
        customers.filter( c => customerId == '' || c.id === customerId).map(customer => {
          return (
            <div key={customer.id} className='list-item--row'>
              <h3>{customer.firstName} {customer.lastName}</h3>
              
              <ul style={{margin:'0'}}>
              {
                purchases.filter(
                  purchase => purchase.customerId === customer.id &&
                  productId == '' || purchase.productId === productId &&
                  date == '' || purchase.date === date
                ).map(
                  (purchase) => {
                    return (
                      <li key={purchase.id} style={{display:'flex', justifyContent:'space-between'}}>
                        <span>{products.find(product => product.id === purchase.productId).name??''}</span>
                        <span>{purchase.date}</span>
                      </li>
                    )
                  }
                )
              }
              </ul>
            </div>
          )
        })
      */}
    </div>
  )
}

export default Purchases