import React from 'react'
import PurchaseListItem from './PurchaseListItem'
import { useSelector } from 'react-redux'

function PurchasesList({productId}) {
  const purchases = useSelector(store => store.purchases)
  return (
    <div style={{display:'flex', flexDirection:'column', justifyContent:'flex-start', rowGap: '3px'}}>
      {
        purchases.filter(purchase => purchase.productId === productId).map((purchase) => {
          return <PurchaseListItem key={purchase.id} purchase={purchase} />
        })
      }
    </div>
  )
}

export default PurchasesList