// ListUsers.js
import React from 'react';
import { FaTrash } from 'react-icons/fa';

const ListUsers = ({ users, onDeleteUser }) => {
  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button
              className="delete-button"
              onClick={() => onDeleteUser(user.id)}
            >
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListUsers;
