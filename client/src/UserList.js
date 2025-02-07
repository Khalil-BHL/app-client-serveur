// src/UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/users')  // Replace with your back-end endpoint
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => console.error('There was an error fetching the users!', error));
  }, []);

  const deleteUser = (id) => {
    axios.delete(`http://localhost:5000/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));  // Remove deleted user from state
      })
      .catch(error => console.error('Error deleting user!', error));
  };

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
