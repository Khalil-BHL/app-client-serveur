// src/App.js
import React, { useState } from 'react';
import UserList from './UserList';
import AddUserForm from './AddUserForm';
import EditUserForm from './EditUserForm';

function App() {
  const [editingUserId, setEditingUserId] = useState(null);

  const handleUserAdded = (newUser) => {
    setEditingUserId(null);  // Reset editing state
  };

  const handleUserUpdated = (updatedUser) => {
    setEditingUserId(null);  // Reset editing state
  };

  return (
    <div>
      <h1>User Management</h1>
      <AddUserForm onUserAdded={handleUserAdded} />
      {editingUserId && <EditUserForm userId={editingUserId} onUserUpdated={handleUserUpdated} />}
      <UserList />
    </div>
  );
}

export default App;

