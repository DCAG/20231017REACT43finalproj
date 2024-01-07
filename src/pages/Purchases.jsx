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
  const [selectedPurchases, setSelectedPurchases] = useState({})

  const search = () => {
    console.log('Purchases: search')
    console.log(purchases)
    console.log(customerId)
    console.log(productId)
    var result = 
    purchases.filter(p => {
      return (customerId == '' || p.customerId === customerId) &&
      (productId == '' || p.productId === productId) && 
      (date == '' || p.timestamp === date)
    })
    result = Object.groupBy(result,({customerId}) => customerId)  
    console.log(result)
    setSelectedPurchases({...result})
    console.log(Object.keys(selectedPurchases))
    console.log(selectedPurchases[Object.keys(selectedPurchases)[0]])
  }

  return (
    <div>
      <Link to='/'>Back</Link>
      <h1>Purchases</h1>
      Products: <ComboBox options={products.map(item => {return {value:item.id, display:item.name}})} onChange={(e) => {setProductId(e.target.value)}} />
      Customers: <ComboBox options={customers.map(item => {return {value:item.id, display:item.lastName+' '+item.firstName}})} onChange={(e) => {setCustomerId(e.target.value)}} />
      Purchase Date: <input type='date' onChange={e => setDate(e.target.value)} />
      <button onClick={search}>Search</button>
      <table>
        <thead>
          <tr>
            <th>customer</th>
            <th>product</th>
            <th>timestamp</th>
          </tr>
        </thead>
        <tbody>
          {
            Object.keys(selectedPurchases).map( s => {
              return selectedPurchases[s].map( (sp,index) => {
                return (
                  <tr key={sp.id}>
                    {
                    index===0?(<td rowSpan={selectedPurchases[s].length}>{customers.find(c=>c.id===sp.customerId).firstName}</td>):''
                    }
                    <td>{products.find(p=>p.id===sp.productId).name}</td>
                    <td>{sp.timestamp}</td>
                  </tr>
                )
                })
              })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Purchases