// src/EditUserForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditUserForm({ userId, onUserUpdated }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:5000/users/${userId}`)  // Updated URL
        .then(response => {
          setName(response.data.name);
          setEmail(response.data.email);
        })
        .catch(error => console.error('Error fetching user data!', error));
    }
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUser = { name, email };

    axios.put(`http://localhost:5000/users/${userId}`, updatedUser)  // Updated URL
      .then(response => {
        onUserUpdated(response.data);  // Notify the parent component about the update
      })
      .catch(error => console.error('Error updating user!', error));
  };

  if (!userId) {
    return null; // If no userId is passed, don’t render the form
  }

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button type="submit">Update User</button>
      </form>
    </div>
  );
}

export default EditUserForm;
