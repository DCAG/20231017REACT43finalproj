import React, {useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

function EditProduct() {
  const {id: productId} = useParams()
  const dispatch = useDispatch()
  const products = useSelector(store => store.products)
  const [product, setProduct] = useState(products.find(product => product.id === productId)??'')

  const handleChange = (e) => {
    return setProduct({...product,[e.target.name]:e.target.value})
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log("submitter.name: " + e.nativeEvent.submitter.name)
    dispatch({
      type   : e.nativeEvent.submitter.name,
      payload: e.nativeEvent.submitter.name === 'PRODUCT_DELETE'?product.id:product
    })
  }

  return (
    <div>
      <Link to='/'>Back</Link>
      <h1>EditProduct</h1>
      <form onSubmit={handleSubmit}>
        Name: <input type="text" name='name' onChange={handleChange} value={product.name} /> <br />
        Price: <input type="number" name='price' onChange={handleChange} value={product.price} /> <br />
        Quantity: <input type="number" name='quantity' onChange={handleChange} value={product.quantity} /> <br />
        <input type="submit" name="PRODUCT_UPDATE" value ="Update" />
        <input type="submit" name="PRODUCT_DELETE" value ="Delete" />
      </form>
      <br />
      {/*
        <PurchasesList // by customer id
      */}
    </div>
  )
}

export default EditProduct