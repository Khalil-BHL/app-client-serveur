// src/AddUserForm.js
import React, { useState } from 'react';
import axios from 'axios';

function AddUserForm({ onUserAdded }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = { name, email };

    axios.post('http://localhost:5000/users', newUser)
      .then(response => {
        onUserAdded(response.data);  // Pass the newly added user to parent component
      })
      .catch(error => console.error('Error adding user!', error));

    setName('');
    setEmail('');
  };

  return (
    <div>
      <h2>Add User</h2>
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
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default AddUserForm;
