import React, { useState } from "react";
import data from "./data.json";

function App() {
  const [users, setUsers] = useState(data.users);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    age: "",
    country: "",
    email: "",
    password: "",
    gender: "",
    mobile: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add new user
  const addUser = () => {
    if (
      !formData.name ||
      !formData.age ||
      !formData.country ||
      !formData.email ||
      !formData.password ||
      !formData.gender ||
      !formData.mobile
    ) {
      alert("Please fill all fields");
      return;
    }
    const newUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      name: formData.name,
      age: parseInt(formData.age),
      country: formData.country,
      email: formData.email,
      password: formData.password,
      gender: formData.gender,
      mobile: formData.mobile,
    };
    setUsers([...users, newUser]);
    setFormData({
      id: null,
      name: "",
      age: "",
      country: "",
      email: "",
      password: "",
      gender: "",
      mobile: "",
    });
  };

  // Delete user
  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
      if (isEditing && formData.id === id) {
        setIsEditing(false);
        setFormData({
          id: null,
          name: "",
          age: "",
          country: "",
          email: "",
          password: "",
          gender: "",
          mobile: "",
        });
      }
    }
  };

  // Edit user - fill form with existing data
  const editUser = (user) => {
    setIsEditing(true);
    setFormData({ ...user });
  };

  // Update user info
  const updateUser = () => {
    if (
      !formData.name ||
      !formData.age ||
      !formData.country ||
      !formData.email ||
      !formData.password ||
      !formData.gender ||
      !formData.mobile
    ) {
      alert("Please fill all fields");
      return;
    }
    setUsers(
      users.map((user) =>
        user.id === formData.id ? { ...formData, age: parseInt(formData.age) } : user
      )
    );
    setIsEditing(false);
    setFormData({
      id: null,
      name: "",
      age: "",
      country: "",
      email: "",
      password: "",
      gender: "",
      mobile: "",
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    setIsEditing(false);
    setFormData({
      id: null,
      name: "",
      age: "",
      country: "",
      email: "",
      password: "",
      gender: "",
      mobile: "",
    });
  };

  return (
    <div className="app-container">
      <h2>User Management (CRUD)</h2>

      {/* Form */}
      <div className="form-container">
        <h3>{isEditing ? "Edit User" : "Add User"}</h3>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
        />

        {isEditing ? (
          <>
            <button onClick={updateUser}>Update</button>
            <button onClick={cancelEdit}>Cancel</button>
          </>
        ) : (
          <button onClick={addUser}>Add</button>
        )}
      </div>

      {/* Users Table */}
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Country</th>
            <th>Email</th>
            <th>Password</th>
            <th>Gender</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="8">No users found.</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.country}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.gender}</td>
                <td>{user.mobile}</td>
                <td>
                  <button onClick={() => editUser(user)}>Edit</button>
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
