import React, { useState } from 'react'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import LoginPopup from './components/LoginPopup/LoginPopup'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import MyOrders from './pages/MyOrders/MyOrders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify/Verify'

// UPDATE: Admin Panel import (Subject to Change based on Naming Convention) (1)
// import AdminRoute from './components/AdminRoute/AdminRoute';
// import AdminApp from '.admin/src'; // Assuming the path is correct
import AdminRoute from './components/AdminRoute/AdminRoute'; 
import AdminPanel from './components/AdminPanel/AdminApp'; 

// UPDATE: Donor Panel
import Requests from './pages/Requests/Request';

const App = () => {

  const [showLogin,setShowLogin] = useState(false);

  return (
    <>
    <ToastContainer/>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/cart' element={<Cart />}/>
          <Route path='/order' element={<PlaceOrder />}/>
          <Route path='/myorders' element={<MyOrders />}/>
          <Route path='/verify' element={<Verify />}/>
          <Route path="/requests" element={<Requests />} />
          <Route path='/admin-panel/*' element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }/>
      
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
