import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../../api'; // adjust if necessary
import './List.css';

const List = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchRequests = async () => {
    try {
      const res = await api.get('/api/requests');
      if (res.data.success) {
        setRequests(res.data.data);
      } else {
        setError('Failed to load requests');
      }
    } catch (err) {
      console.error(err);
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleDeactivate = async (id) => {
    if (!window.confirm('Are you sure you want to deactivate this request?')) {
      return;
    }
    try {
      await api.put(`/api/requests/${id}/deactivate`);
      fetchRequests();
    } catch (err) {
      console.error(err);
      alert('Failed to deactivate request');
    }
  };

  if (loading) {
    return (
      <div className="list-request-loading">
        <p>Loading requests…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="list-request-error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="list-request-container">
      <h2 className="list-request-title">Current Pantry Requests</h2>

      {requests.length === 0 ? (
        <p className="list-request-none">No active requests found.</p>
      ) : (
        <ul className="list-request-list">
          {requests.map((r) => (
            <li key={r._id} className="request-item">
              <div className="request-item-content">
                <div>
                  <h3 className="request-item-header">{r.title}</h3>
                  <p className="request-item-desc">{r.description}</p>
                  <small className="request-item-date">
                    Posted on {new Date(r.createdAt).toLocaleDateString()}
                  </small>
                </div>
                <button
                  onClick={() => handleDeactivate(r._id)}
                  className="deactivate-button"
                >
                  Deactivate
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={() => navigate('/admin-panel/requests/add')}
        className="create-button"
      >
        + Create New Request
      </button>
    </div>
  );
};

export default List;
