import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p></p>
        </div>
        <div className="footer-content-center">
    
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li><a href="tel:+18474372666">+1 (847) 437-2666</a></li>
                <li><a href="mailto:mimi.cheatham@cvlutheran.org">
                mimi.cheatham@cvlutheran.org
              </a></li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2025 © Bless Box - All Right Reserved.</p>
    </div>
  )
}

export default Footer
