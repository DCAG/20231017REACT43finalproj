import React, {useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'


function EditCustomer() {
  const {id: customerId} = useParams()

  const dispatch = useDispatch()
  const customers = useSelector(store => store.customers)
  const purchases = useSelector(store => store.purchases)
  const products = useSelector(store => store.products)
  
  const [customer, setCustomer] = useState(customers.find(customer => customer.id === customerId)??'')
  
  const handleChange = (e) => {
    return setCustomer({...customer,[e.target.name]:e.target.value})
  }

  const updateCustomer = () =>{
    dispatch({type:'CUSTOMER_UPDATE',payload:customer})
  }

  const deleteCustomer = () =>{
    dispatch({type:'CUSTOMER_DELETE',payload:customer.id})
  }

  return (
    <div>
      <nav>
        <Link to='/'>Back</Link>
      </nav>
      <h1>EditCustomer</h1>
      First Name: <input type="text" name='firstName' onChange={handleChange} value={customer.firstName} /> <br />
      Last Name: <input type="text" name='lastName' onChange={handleChange} value={customer.lastName} /> <br />
      City: <input type="text" name='city' onChange={handleChange} value={customer.city} /> <br />
      <button onClick={updateCustomer}>Update</button><button onClick={deleteCustomer}>Delete</button><br />
      <br />
      <h3>List of purchased products:</h3>
      <ul>
        {
          purchases.filter( (purchase, index) => {
            // purchases of this customer
            return purchase.customerId === customerId &&
            // get unique products purchases
            purchases.findIndex(purchase2 => purchase.productId === purchase2.productId) === index
          }).flatMap(
            // map customer purchases to product objects - to get their names
            purchase => products.filter(product => product.id === purchase.productId)
            ).map( (product) => {
              return (
                <li key={product.id}>
                    <Link to={'/products/' + product.id}>
                      {product.name}
                    </Link>
                </li>
              )
          })
        }
      </ul>
    </div>
  )
}

export default EditCustomer