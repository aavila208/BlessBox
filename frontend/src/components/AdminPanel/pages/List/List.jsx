import React, { useEffect, useState } from 'react'
import './List.css'
import api from '../../../../api.js';
import { toast } from 'react-toastify';

// New Feature: Add a Popup to Add New Item
import Add from '../Add/Add';


const List = () => {
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // ADDEDED
  // const fetchList = async () => {
  //   const response = await api.get('/api/food/list');
  //   if (response.data.success) {
  //     setList(response.data.data);
  //   } else {
  //     toast.error("Error");
  //   }
  // };
  const fetchList = async () => {
    try {
      const response = await api.get('/api/food/list');
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error('Error loading pantry items');
      }
    } catch (err) {
      toast.error('Network error while fetching list');
    }
  };

  const removeFood = async (foodId, token) => {
    try {
      const response = await api.post(
        '/api/food/remove',
        { id: foodId },
        { headers: { token } }
      );
      await fetchList();
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList(); // ADDEDED
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("Network error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>Pantry Items</p>

      <button onClick={() => setShowModal(true)} className="open-add-modal-btn">
        Add New Item
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            {/* ADDEDED <Add /> */}
            <Add
              onAdded={() => {
                setShowModal(false);
                fetchList();
              }}
              onClose={() => setShowModal(false)}
            />
            <button className="close-btn" onClick={() => setShowModal(false)}>X</button>
          </div>
        </div>
      )}

      <div className='list-table'>
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img src={`${import.meta.env.VITE_API_URL}/images/${item.image}`} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p className='cursor' onClick={() => removeFood(item._id)}>x</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
