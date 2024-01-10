import React from 'react'

function PurchaseList({purchases, productId, customerId}) {
  const customers = useSelector(store => store.customers)
  const products = useSelector(store => store.products)
  const purchases = useSelector(store => store.purchases)
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Product</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {
            Object.keys(purchases).map( key => { 
              return purchasesGroupedByCustomer[key].map( (purchase,index) => {
                return (
                  <tr key={purchase.id}>
                    {
                      index === 0?(<td rowSpan={purchasesGroupedByCustomer[key].length}>{customers.find(customer=>customer.id === purchase.customerId).firstName}</td>):''
                    }
                    <td>{products.find(p=>p.id===sp.productId).name}</td>
                    <td>{sp.date}</td>
                  </tr>
                )
                })
              })
          }
        </tbody>
      </table>
    </>
  )
}

export default PurchaseList