import React, { useState } from "react";
import data from'./data.json';


function App() {
  const [users, setUsers] = useState(data.users);
  const [formData, setFormData] = useState({ id: null, name: "", age: "", country: "" });
  const [isEditing, setIsEditing] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add new user
  const addUser = () => {
    if (!formData.name || !formData.age || !formData.country) {
      alert("Please fill all fields");
      return;
    }
    const newUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      name: formData.name,
      age: parseInt(formData.age),
      country: formData.country,
    };
    setUsers([...users, newUser]);
    setFormData({ id: null, name: "", age: "", country: "" });
  };

  // Delete user
  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
      if (isEditing && formData.id === id) {
        setIsEditing(false);
        setFormData({ id: null, name: "", age: "", country: "" });
      }
    }
  };

  // Edit user - fill form with existing data
  const editUser = (user) => {
    setIsEditing(true);
    setFormData({ id: user.id, name: user.name, age: user.age, country: user.country });
  };

  // Update user info
  const updateUser = () => {
    if (!formData.name || !formData.age || !formData.country) {
      alert("Please fill all fields");
      return;
    }
    setUsers(
      users.map((user) =>
        user.id === formData.id
          ? { ...user, name: formData.name, age: parseInt(formData.age), country: formData.country }
          : user
      )
    );
    setIsEditing(false);
    setFormData({ id: null, name: "", age: "", country: "" });
  };

  // Cancel editing
  const cancelEdit = () => {
    setIsEditing(false);
    setFormData({ id: null, name: "", age: "", country: "" });
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>User Management (CRUD)</h2>

      {/* Form */}
      <div
        style={{
          marginBottom: "1rem",
          padding: "1rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h3>{isEditing ? "Edit User" : "Add User"}</h3>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          style={{ marginRight: "0.5rem", padding: "0.4rem", width: "30%" }}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          style={{ marginRight: "0.5rem", padding: "0.4rem", width: "20%" }}
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          style={{ marginRight: "0.5rem", padding: "0.4rem", width: "30%" }}
        />
        {isEditing ? (
          <>
            <button onClick={updateUser} style={{ padding: "0.4rem 1rem", marginRight: "0.5rem" }}>
              Update
            </button>
            <button onClick={cancelEdit} style={{ padding: "0.4rem 1rem" }}>
              Cancel
            </button>
          </>
        ) : (
          <button onClick={addUser} style={{ padding: "0.4rem 1rem" }}>
            Add
          </button>
        )}
      </div>

      {/* Users Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <thead style={{ backgroundColor: "#007BFF", color: "white" }}>
          <tr>
            <th style={{ padding: "0.5rem" }}>Name</th>
            <th style={{ padding: "0.5rem" }}>Age</th>
            <th style={{ padding: "0.5rem" }}>Country</th>
            <th style={{ padding: "0.5rem" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "1rem" }}>
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "0.5rem" }}>{user.name}</td>
                <td style={{ padding: "0.5rem", textAlign: "center" }}>{user.age}</td>
                <td style={{ padding: "0.5rem" }}>{user.country}</td>
                <td style={{ padding: "0.5rem", textAlign: "center" }}>
                  <button
                    onClick={() => editUser(user)}
                    style={{
                      marginRight: "0.5rem",
                      padding: "0.3rem 0.6rem",
                      cursor: "pointer",
                      backgroundColor: "#ffc107",
                      border: "none",
                      borderRadius: "4px",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    style={{
                      padding: "0.3rem 0.6rem",
                      cursor: "pointer",
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                    }}
                  >
                    Delete
                  </button>
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