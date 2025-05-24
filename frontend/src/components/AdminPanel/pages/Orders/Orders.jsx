import React, { useEffect, useState } from 'react'
import './Orders.css'
import { toast } from 'react-toastify';
import api from '../../../../api.js';
import { assets } from '../../../../assets/assets';

const Order = () => {
  const [orders, setOrders] = useState([]);

  // COMMENT FEATURE
  const [comments, setComments] = useState({});

  // NAVIGATION FEATURE
  const [selectedAddress, setSelectedAddress] = useState(null);

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
    const token = localStorage.getItem('token'); // ✅ ensure you get token
  
    console.log("🛠️ Submitting comment for order ID:", id, "with:", comments[id]);
    console.log("📤 Token used:", token);
  
    try {
      await api.post('/api/order/update-comment', {
        id,
        comment: comments[id] || ""
      }, {
        headers: { token } // ✅ ensure this is passed
      });
  
      toast.success("Comment saved");
      fetchAllOrders();
    } catch (error) {
      console.error("❌ saveComment failed:", error.response?.data || error.message);
      toast.error("Failed to save comment");
    }
  };

// NAVIGATION FEATURE
const GoogleMapModal = ({ address, onClose }) => {
  const fullAddress = `${address.street}, ${address.city}, ${address.state} ${address.zipcode}, ${address.country}`;
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`;

  return (
    <div className="map-modal">
      <div className="modal-content">
        <iframe
          title="Google Map"
          width="100%"
          height="300"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={mapUrl}
        ></iframe>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};
// -----------------

// ORDER DELETE FEATURE
const handleDelete = async (id) => {
  const token = localStorage.getItem('token');
  if (!window.confirm("Are you sure you want to delete this order?")) return;
  try {
    const res = await api.delete(`/api/order/delete/${id}`, {
      headers: { token }
    });
    if (res.data.success) {
      toast.success("Order deleted");
      fetchAllOrders();
    } else {
      toast.error("Failed to delete order");
    }
  } catch (err) {
    toast.error("Network error");
  }
};
// --------------------
  

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
                            <button
                className="order-map-btn"
                onClick={() => setSelectedAddress(order.address)}
              >
                View on Map
              </button>
            </div>

          <div className="order-meta">
            <select onChange={(e) => statusHandler(e, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>

            <p className='order-item-food'>
                {order.items.map((item, idx) => (
                  idx === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                ))}
              </p>
          </div>
            <button
              className="order-delete-btn"
              onClick={() => handleDelete(order._id)}
            >
              Delete Order
            </button>
        </div>
        ))}
      </div>
      {selectedAddress && (
        <GoogleMapModal
          address={selectedAddress}
          onClose={() => setSelectedAddress(null)}
        />
      )}
    </div>
  )
}

export default Order
