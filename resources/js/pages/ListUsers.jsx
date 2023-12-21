import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

const ListUsers = ({ users, onDeleteUser, onUpdateUser }) => {
  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}         
            <button
              className="update-button"
              onClick={() => onUpdateUser(user.id)}
              style={{ marginLeft: '8px'}}
            >
              <FaEdit />
            </button>
            <button
              className="delete-button"
              onClick={() => onDeleteUser(user.id)}
              style={{ marginLeft: '8px'}}
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
