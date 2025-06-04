import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../../api'; // adjust if necessary
import './Add.css';

const Add = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      return alert('Title cannot be empty');
    }

    try {
      setLoading(true);
      const res = await api.post('/api/requests', {
        title: title.trim(),
        description: description.trim(),
      });

      if (res.data.success) {
        alert('Request created successfully');
        navigate('/admin-panel/requests/list');
      } else {
        alert('Failed to create request');
      }
    } catch (err) {
      console.error(err);
      alert('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-request-container">
      <h2 className="add-request-title">Create New Pantry Request</h2>
      <form className="add-request-form" onSubmit={handleSubmit}>
        <div className="add-request-field">
          <label htmlFor="title" className="add-request-label">
            Title*
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="add-request-input"
          />
        </div>

        <div className="add-request-field">
          <label htmlFor="description" className="add-request-label">
            Description
          </label>
          <textarea
            id="description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="add-request-textarea"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="add-request-button"
        >
          {loading ? 'Saving…' : 'Create Request'}
        </button>
      </form>
    </div>
  );
};

export default Add;
