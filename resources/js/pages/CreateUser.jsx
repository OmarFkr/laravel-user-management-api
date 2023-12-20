import React, { useState, useEffect } from 'react';
import ListUsers from './ListUsers';
import '../../css/createUser.css';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const [showUserList, setShowUserList] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch the list of users when the component mounts
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch('/api/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
        setShowUserList(true);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        // Handle error, perhaps set an error state
      });
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Simple validation
    if (!formData.name.trim() || !formData.email.trim()) {
      console.error('Please provide both name and email.');
      return;
    }

    setLoading(true);

    // TODO: Perform validation if needed

    fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      })      
      .then(response => {
        const contentType = response.headers.get('content-type');
        console.log('Content-Type:', contentType);

        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid content type. Expected JSON.');
        }

        return response.json();
      })
      .then(data => {
        console.log('New user created:', data);
        // Update the list of users after creating a new user
        fetchUsers();
        // Reset form fields if needed
        setFormData({
          name: '',
          email: '',
        });
        // TODO: Handle success, reset form, or navigate to a new page
      })
      .catch(error => {
        console.error('Error creating user:', error);
        // TODO: Handle error
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onDeleteUser = userId => {
    setLoading(true);

    fetch(`/api/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        const contentType = response.headers.get('content-type');
        console.log('Content-Type:', contentType);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Assuming soft-deletion was successful
        console.log(`Soft-deleted user with ID: ${userId}`);
        // Update the list of users after soft-deleting a user
        fetchUsers();
      })
      .catch(error => {
        console.error('Error soft-deleting user:', error);
        // TODO: Handle error
      })
      .finally(() => {
        setLoading(false);
      });
  };


  return (
    <div className="create-user-container">
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Name:</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          <span>Email:</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create User'}
        </button>
      </form>

      {showUserList && <ListUsers users={users} onDeleteUser={onDeleteUser} />} {/* Pass the updated list of users and onDeleteUser to ListUsers */}
    </div>
  );
};

export default CreateUser;
