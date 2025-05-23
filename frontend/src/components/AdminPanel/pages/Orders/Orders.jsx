import React, { useEffect, useState } from 'react'
import './Orders.css'
import { toast } from 'react-toastify';
import api from '../../../../api.js';
import { assets } from '../../../../assets/assets';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [comments, setComments] = useState({});

  const fetchAllOrders = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await api.get('/api/order/list', {
        headers: { token }
      });
      if (response.data.success) {
        setOrders(response.data.data.reverse());
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("Network error");
    }
  };

  const statusHandler = async (event, orderId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await api.post(
        '/api/order/status',
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Network error");
    }
  };

  const handleCommentChange = (id, value) => {
    setComments(prev => ({ ...prev, [id]: value }));
  };

  const saveComment = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await api.post('/api/order/update-comment', {
        id,
        comment: comments[id] || ""
      }, {
        headers: { token }
      });
      toast.success("Comment saved");
      fetchAllOrders();
    } catch (error) {
      toast.error("Failed to save comment");
    }
  };

  useEffect(() => {
    fetchAllOrders();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='order add'>
      <h3>Orders</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <div>
              <p className='order-item-food'>
                {order.items.map((item, idx) => (
                  idx === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                ))}
              </p>
              <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
              <div className='order-item-address'>
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            

            <textarea
                className="order-comment-box"
                placeholder="Add internal comment"
                value={comments[order._id] ?? order.comment ?? ''}
                onChange={(e) => handleCommentChange(order._id, e.target.value)}
              />

              <button
                className="order-comment-save"
                onClick={() => saveComment(order._id)}
              >
                Save Comment
              </button>
            </div>

            <select onChange={(e) => statusHandler(e, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Order
