import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}/fetch`);
      setItems(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSave = async () => {
    if (!title || !description) return alert("Please fill all fields!");

    try {
      if (editId) {
        // Update existing item
        const res = await axios.put(`${API_URL}/update/${editId}`, { title, description });
        setItems(items.map((item) => (item._id === editId ? res.data : item)));
        setEditId(null);
      } else {
        // Save new item
        const res = await axios.post(`${API_URL}/push`, { title, description });
        setItems([...items, res.data]);
      }

      // Clear input fields
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error saving/updating data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      setItems(items.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleUpdate = (item) => {
    setTitle(item.title);
    setDescription(item.description);
    setEditId(item._id);
  };

  return (
    <div className="container">
      <h2>CRUD Operations with Axios</h2>
      <div className="form">
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button onClick={handleSave}>{editId ? "Update" : "Save"}</button>
      </div>

      <div className="card-container">
        {items.map((item) => (
          <div key={item._id} className="card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <button className="update-btn" onClick={() => handleUpdate(item)}>Update</button>
            <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
