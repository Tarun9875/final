import React, { useState } from 'react';

const initialUsers = [
  { id: 1, username: 'JohnDoe', gender: 'male', country: 'USA' },
  { id: 2, username: 'JaneSmith', gender: 'female', country: 'India' },
];

function UserCrud() {
  const [users, setUsers] = useState(initialUsers);
  const [form, setForm] = useState({ id: null, username: '', gender: '', country: '' });
  const [isEditing, setIsEditing] = useState(false);

  // Handle input change in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Add a new user
  const handleAdd = () => {
    if (!form.username || !form.gender || !form.country) {
      alert('Please fill all fields');
      return;
    }
    const newUser = {
      id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
      username: form.username,
      gender: form.gender,
      country: form.country,
    };
    setUsers([...users, newUser]);
    setForm({ id: null, username: '', gender: '', country: '' });
  };

  // Set user data to form for editing
  const handleEdit = (user) => {
    setIsEditing(true);
    setForm(user);
  };

  // Update user data
  const handleUpdate = () => {
    if (!form.username || !form.gender || !form.country) {
      alert('Please fill all fields');
      return;
    }
    setUsers(users.map(u => (u.id === form.id ? form : u)));
    setIsEditing(false);
    setForm({ id: null, username: '', gender: '', country: '' });
  };

  // Delete a user
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h1>User CRUD App</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          style={{ marginRight: 10 }}
        />
        <input
          type="text"
          name="gender"
          placeholder="Gender"
          value={form.gender}
          onChange={handleChange}
          style={{ marginRight: 10 }}
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
          style={{ marginRight: 10 }}
        />
        {isEditing ? (
          <button onClick={handleUpdate}>Update User</button>
        ) : (
          <button onClick={handleAdd}>Add User</button>
        )}
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.map(user => (
          <li
            key={user.id}
            style={{
              padding: 10,
              borderBottom: '1px solid #ccc',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <strong>{user.username}</strong> — {user.gender}, {user.country}
            </div>
            <div>
              <button onClick={() => handleEdit(user)} style={{ marginRight: 10 }}>
                Edit
              </button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserCrud;