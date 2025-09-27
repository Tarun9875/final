//reeact curd operation practice and some reaperat question
import React, { useState } from 'react';
import data from './practice.json';

function App() {
    const [users, setUsers] = useState(data.users);
    const [formData, setFormData] = useState({
        id: null,
        name: "",
        age: "",
        country: "",
        email: "",
        password: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    //handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }
    // add new user
    const addUser = () => {
        if (!formData.name || !formData.age || !formData.country || !formData.email || !formData.password) {
            alert("please fill all fields");
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
    //Delete user
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
    //edit user-fill form with existing  data
    const editUser = (user) => {
        setIsEditing(true);
        setFormData({ ...user });
    };
    //update user
    const updateUser = () => {
        if (!formData.name || !formData.age || !formData.country || !formData.email || !formData.password) {
            alert("please fill all fields");
            return;
        }
        setUsers(users.map((user) => (user.id === formData.id ? formData : user)));
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

    //cancel edit
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
        <div className="container">
            <h1>User Management</h1>
            <div className="form">
                <h3>{isEditing ? "Edit User" : "Add User"}</h3>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
                <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                <input type="text" name="gender" placeholder="enter gender" value={formData.gender} onChange={handleChange} />
                <input type="text" name="mobile" placeholder="enter mobile number" value={formData.mobile} onChange={handleChange} />
                {isEditing ? (
                    <>
                        <button onClick={updateUser}>Update User</button>
                        <button onClick={cancelEdit}>Cancel</button>
                    </>
                ) : (
                    <button onClick={addUser}>Add User</button>
                )}
            </div>
            {/* User List */}
            <table className='user-table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Country</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>gender</th>
                        <th>mobile</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    users.length === 0 ? (
                        <tr>
                            <td colSpan="9">No users available.</td>
                        </tr>
                    ) : (
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
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