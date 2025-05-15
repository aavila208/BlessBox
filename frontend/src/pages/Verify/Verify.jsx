import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import api from '../../api'; // Centralized axios instance
import './Verify.css'

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")

  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await api.post("/api/order/verify", { success, orderId });
      if (response.data.success) {
        navigate("/myorders");
      } else {
        navigate("/")
      }
    } catch (error) {
      navigate("/")
    }
  }

  useEffect(() => {
    verifyPayment();
    // eslint-disable-next-line
  }, [])

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  )
}

export default Verify