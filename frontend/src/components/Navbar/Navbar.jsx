import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { assets } from "../../assets/assets";
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'

const Navbar = ({ setShowLogin }) => {

  const [menu, setMenu] = useState("home");
  const {token ,setToken, setCartItems } = useContext(StoreContext);
  const navigate = useNavigate();
  const role = localStorage.getItem("role"); // UPDATE: Get User's Role from localStorage

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role"); // UPDATE: Remove User's Role from localStorage 
    localStorage.removeItem("cartItems"); // UPDATE: <-- Clear cart from localStorage
    setToken("");
    setCartItems({}); // UPDATEL <-- Clear cart from context/state
    navigate('/')
  }

  return (
    <div className='navbar'>
      <Link to='/'><img className='logo' src={assets.logo} alt="" /></Link>
      <ul className="navbar-menu">
      <span
        onClick={() => {
          setMenu("home");
          navigate("/");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className={`navbar-link ${menu === "home" ? "active" : ""}`}
      >
        home
      </span>

      <Link
        to="/requests"
        onClick={() => { setMenu("requests"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        className={`navbar-link ${menu === "requests" ? "active" : ""}`}
      >
        donors
      </Link>

        {/* UPDATE: Conditionally Render the Admin Panel Link [1]*/}
        {role === "admin" && (
          <Link
            to="/admin-panel"
            onClick={() => setMenu("admin")}
            className={`${menu === "admin" ? "active" : ""}`}
          >
            admin panel
          </Link>
        )} 
      </ul>
      <div className="navbar-right">
        <Link to='/cart' className='navbar-search-icon'>
          <img src={assets.basket_icon} alt="" />
        </Link>
        {!token ? <button onClick={() => setShowLogin(true)}>sign in</button>
          : <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className='navbar-profile-dropdown'>
              <li onClick={()=>navigate('/myorders')}> <img src={assets.bag_icon} alt="" /> <p>Orders</p></li>
              <hr />
              <li onClick={logout}> <img src={assets.logout_icon} alt="" /> <p>Logout</p></li> 
            </ul>
          </div>
        }

      </div>
    </div>
  )
}

export default Navbar
