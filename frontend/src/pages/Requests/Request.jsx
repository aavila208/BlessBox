import React, { useEffect, useState } from 'react';
import api from '../../api';       // make sure this points to your axios instance
import './Request.css';

const Request = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await api.get('/api/requests'); // GET all active requests
        if (res.data.success) {
          setRequests(res.data.data);
        } else {
          setError('Failed to load requests');
        }
      } catch (err) {
        console.error('Error fetching requests:', err);
        setError('Server error. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) {
    return (
      <div className="request-page__loading">
        <p>Loading requests…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="request-page__error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="request-page">
      <h1 className="request-page__title">Current Pantry Requests</h1>
      <h2 className="list-request-subtitle"> We gratefully welcome any donation you can give, and if you’d like to help even more, these specific items are what our pantry needs most right now.</h2>

      {requests.length === 0 ? (
        <p className="request-page__none">
          There are no active requests at the moment.
        </p>
      ) : (
        <div className="request-page__grid">
          {requests.map((r) => (
            <div key={r._id} className="request-card">
              <h3 className="request-card__title">{r.title}</h3>
              <p className="request-card__desc">
                {r.description || 'No description provided.'}
              </p>
              <small className="request-card__date">
                Posted on {new Date(r.createdAt).toLocaleDateString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Request;
