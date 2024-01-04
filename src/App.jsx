import { Route, Routes } from 'react-router-dom'
import './App.css'
import Products from './pages/Products'
import Customers from './pages/Customers'
import EditCustomer from './pages/EditCustomer'
import Purchases from './pages/Purchases'
import Menu from './pages/Menu'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Menu />} />
      <Route path='/products' element={<Products />} />
      <Route path='/customers' element={<Customers />} />
      <Route path='/purchases' element={<Purchases />} />
      <Route path='/customers/:id' element={<EditCustomer />} />
    </Routes>
    </>
  )
}

export default App
