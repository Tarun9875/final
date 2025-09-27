import React, { useEffect, useState } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:5000/students'; // <-- Correct URL

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setStudents(data);
      setError(null);
    } catch {
      setError('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !age || age <= 0) {
      return alert('Please enter a valid name and age');
    }

    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, age: Number(age) }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const updatedStudent = await response.json();

      if (editingId) {
        // Update student in list
        setStudents(students.map(s => (s.id === editingId ? updatedStudent : s)));
        setEditingId(null);
      } else {
        // Add new student
        setStudents([...students, updatedStudent]);
      }

      setName('');
      setAge('');
      setError(null);
    } catch {
      alert('Failed to save student');
    }
  };

  const handleEdit = (student) => {
    setName(student.name);
    setAge(student.age);
    setEditingId(student.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setStudents(students.filter(s => s.id !== id));
      setError(null);
    } catch {
      alert('Failed to delete student');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>{editingId ? 'Edit Student' : 'Add Student'}</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          placeholder="Age"
          type="number"
          value={age}
          onChange={e => setAge(e.target.value)}
        />
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setName('');
              setAge('');
            }}
            style={{ marginLeft: 10 }}
          >
            Cancel
          </button>
        )}
      </form>

      <h3>Student List</h3>
      {loading && <p>Loading students...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {students.map(s => (
          <li key={s.id}>
            {s.name} - {s.age} years old
            <button onClick={() => handleEdit(s)} style={{ marginLeft: 10 }}>
              Edit
            </button>
            <button onClick={() => handleDelete(s.id)} style={{ marginLeft: 5 }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;