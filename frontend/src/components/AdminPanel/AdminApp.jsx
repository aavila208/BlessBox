import React from 'react'
// import Navbar from './components/Navbar/Navbar'
import Sidebar from './Sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Users from './pages/Users/Users';

import AddRequest from './pages/Requests/Add'
import ListRequests from './pages/Requests/List';



const App = () => {
  return (
    <div className='app'>
      <ToastContainer />
      {/* <Navbar /> */}
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="/requests/add" element={<AddRequest />} />
          <Route path="/requests/list" element={<ListRequests />} />
        </Routes>
      </div>
    </div>
  )
}

export default App