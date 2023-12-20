// UserManagement.js
import React, { useState } from 'react';
import CreateUser from '/CreateUser';
import ListUsers from '/ListUsers';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  const handleAddUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const handleDeleteUser = (userId) => {
    // Filter out the deleted user
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  return (
    <div>
      <CreateUser onAddUser={handleAddUser} />
      <ListUsers users={users} onDeleteUser={handleDeleteUser} />
    </div>
  );
};

export default UserManagement;
