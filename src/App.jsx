import { Route, Routes } from 'react-router-dom'
import './App.css'
import Products from './pages/Products'
import Customers from './pages/Customers'
import EditCustomer from './pages/EditCustomer'
import EditProduct from './pages/EditProduct'
import Purchases from './pages/Purchases'
import Menu from './pages/Menu'
import ProductCreate from './pages/ProductCreate'
import CustomerCreate from './pages/CustomerCreate'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Menu />} />
      <Route path='/products' element={<Products />}>
        <Route path='create' element={<ProductCreate />} />
      </Route>
      <Route path='/customers' element={<Customers />}>
        <Route path='create' element={<CustomerCreate />} />
      </Route>
      <Route path='/purchases' element={<Purchases />} />
      <Route path='/customers/:id' element={<EditCustomer />} />
      <Route path='/products/:id' element={<EditProduct />} />
    </Routes>
    </>
  )
}

export default App
