// src/components/AdminPanel/Users.jsx
import React, { useEffect, useState } from 'react';
import api from '../../../../api.js';
import './Users.css'; // optional styling
import { toast } from 'react-toastify';

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/api/user/list');
      if (res.data.success) {
        setUsers(res.data.data);
      } else {
        toast.error("Failed to load users");
      }
    } catch (error) {
      toast.error("Network error");
    }
  };

  const deleteUser = async (userId) => {
    try {
      const res = await api.post('/api/admin/delete-user', { userId });
      if (res.data.success) {
        toast.success("User deleted");
        fetchUsers();
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      toast.error("Error deleting user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="users-container">
  <p className="users-title">Users</p>
  <div className="users-table">
    <div className="users-table-row users-table-header">
      <div>#</div>
      <div>Name</div>
      <div>Email</div>
      <div>Role</div>
      <div>Registered</div>
      <div>Actions</div>
    </div>

    {users.map((user, index) => (
      <div className="users-table-row" key={user._id}>
        <div>{index + 1}</div>
        <div>{user.name}</div>
        <div>{user.email}</div>
        <div>{user.role}</div>
        <div>{new Date(user._id.toString().substring(0, 8) * 1000).toLocaleDateString()}</div>
        <div>
              <button onClick={() => deleteUser(user._id)}>X</button>
            </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default Users;