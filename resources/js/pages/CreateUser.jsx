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
  const [updateUserId, setUpdateUserId] = useState(null);

  const csrfToken = "{{ csrf_token() }}";

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

    if (updateUserId) {
      // If updateUserId is set, perform update instead of create
      fetch(`/api/users/${updateUserId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then(response => response.json())
        .then(updatedUser => {
          console.log('User updated:', updatedUser);
          // Update the list of users after updating a user
          fetchUsers();
          // Reset form fields and updateUserId
          setFormData({
            name: '',
            email: '',
          });
          setUpdateUserId(null);
        })
        .catch(error => {
          console.error('Error updating user:', error);
          // TODO: Handle error
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      // If updateUserId is not set, perform create
      fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then(response => response.json())
        .then(data => {
          console.log('New user created:', data);
          // Update the list of users after creating a new user
          fetchUsers();
          // Reset form fields if needed
          setFormData({
            name: '',
            email: '',
          });
        })
        .catch(error => {
          console.error('Error creating user:', error);
          // TODO: Handle error
        })
        .finally(() => {
          setLoading(false);
        });
    }
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

  const onUpdateUser = userId => {
    // Set the user to be updated in the form
    const userToUpdate = users.find(user => user.id === userId);
    setFormData({
      name: userToUpdate.name,
      email: userToUpdate.email,
    });
    setUpdateUserId(userId);
  };

  const handleLogout = () => {

    const formData = new FormData();
    formData.append('_token', csrfToken);

    // Make a POST request to the /logout endpoint
    fetch('/simple-logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken, // Replace with your actual CSRF token
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        window.location.href = '/login';
      })
      .catch(error => {
        console.error('Error logging out:', error);
        // TODO: Handle error
      });
  };
  
  return (
    <div className="create-user-container">
      <h1>Users Management</h1>

      <form onSubmit={handleLogout}>
      <input type="hidden" name="_token" value={csrfToken} />
      <button type="submit">Logout</button>
      </form>
      
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
          {updateUserId ? 'Update User' : 'Create User'}
        </button>
        {updateUserId && (
          <button type="button" onClick={() => setUpdateUserId(null)}>
            Cancel Update
          </button>
        )}
      </form>

      {showUserList && (
        <ListUsers
          users={users}
          onDeleteUser={onDeleteUser}
          onUpdateUser={onUpdateUser}
        />
      )}
    </div>
  );
};

export default CreateUser;
