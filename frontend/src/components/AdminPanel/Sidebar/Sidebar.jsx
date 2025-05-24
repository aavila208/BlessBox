import React from 'react'
import  './Sidebar.css'
import { assets } from '../../../assets/assets';
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        {/* <NavLink to='/admin-panel/add' className="sidebar-option">
            <img src={assets.add_icon} alt="" />
            <p>Add Items</p>
        </NavLink> */}
        <NavLink to='/admin-panel/list' className="sidebar-option">
            <p>Pantry Items</p>
        </NavLink>
        <NavLink to='/admin-panel/orders' className="sidebar-option">
            <p>Orders</p>
        </NavLink>
        <NavLink to='/admin-panel/users' className="sidebar-option">
          <p>Users</p>
        </NavLink>

      </div>
    </div>
  )
}

export default Sidebar
