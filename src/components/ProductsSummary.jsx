import React from 'react'
import { useSelector } from 'react-redux'

function ProductsSummary() {
  const purchases = useSelector(store => store.purchases)

  return (
    <div>
      <h3>{purchases.length??'###'} products were purchased</h3>
    </div>
  )
}

export default ProductsSummary