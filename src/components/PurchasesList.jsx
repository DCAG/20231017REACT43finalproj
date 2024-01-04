import React from 'react'
import PurchaseItem from './PurchaseItem'
import { useSelector } from 'react-redux'

function PurchasesList({productId}) {
  const purchases = useSelector(store => store.purchases)
  return (
    <div>
      {
        purchases.filter(purchase => purchase.productId === productId).map((purchase, index) => {
          return <PurchaseItem key={index} purchase={purchase} />
        })
      }
    </div>
  )
}

export default PurchasesList