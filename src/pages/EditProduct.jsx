import React, {useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

function EditProduct() {
  const {id: productId} = useParams()

  const dispatch = useDispatch()
  const customers = useSelector(store => store.customers)
  const purchases = useSelector(store => store.purchases)
  const products = useSelector(store => store.products)

  const [product, setProduct] = useState(products.find(product => product.id === productId)??'')

  const handleChange = (e) => {
    let {name, value} = e.target
    value = isNaN(value)?value:+value
    return setProduct({...product,[name]:value})
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
      <nav>
        <Link to='/'>Back</Link>
      </nav>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Name:</label><input type="text" name='name' onChange={handleChange} value={product.name} /> <br />
        <label htmlFor='price'>Price:</label><input type="number" name='price' onChange={handleChange} value={product.price} /> <br />
        <label htmlFor='quantity'>Quantity:</label><input type="number" name='quantity' onChange={handleChange} value={product.quantity} /> <br />
        <button type="submit" name="PRODUCT_UPDATE">Update</button>
        <button type="submit" name="PRODUCT_DELETE">Delete</button>
      </form>
      <br />
      <h3>List of customers who purchased this product:</h3>
      <ul>
        {
          purchases.filter(
            // purchases of this product
            purchase => purchase.productId === productId
          ).flatMap(
            // map customer purchases to product objects - to get their names
            purchase => customers.filter(customer => customer.id === purchase.customerId)
          ).filter(
            // get unique customers
            (customer, index, self) => self.findIndex(customer2 => customer.id === customer2.id) === index
          ).map( (customer) => {
            return (
              <li key={customer.id}>
                <Link to={'/customers/' + customer.id}>
                  {customer.firstName} {customer.lastName}
                </Link>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default EditProduct