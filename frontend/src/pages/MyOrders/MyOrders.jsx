import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import api from '../../api'; // Centralized axios instance
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { token } = useContext(StoreContext);

  const fetchOrders = async () => {
    try {
      const response = await api.post('/api/order/userorders', {}, { headers: { token } });
      setData(response.data.data);
    } catch (error) {
      // Optionally handle error here
      setData([]);
    }
  }

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
    // eslint-disable-next-line
  }, [token]);

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => (
          <div key={index} className='my-orders-order'>
            <img src={assets.parcel_icon} alt="" />
            <p>
              {order.items.map((item, idx) =>
                idx === order.items.length - 1
                  ? `${item.name} x ${item.quantity}`
                  : `${item.name} x ${item.quantity}, `
              )}
            </p>
            <p>Items: {order.items.length}</p>
            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
            <button onClick={fetchOrders}>Track Order</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyOrders
