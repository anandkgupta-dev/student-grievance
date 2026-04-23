import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [grievances, setGrievances] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Academic",
  });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  // FETCH
  const fetchData = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/grievances",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setGrievances(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // CREATE / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await axios.put(
        `http://localhost:5000/api/grievances/${editId}`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditId(null);
    } else {
      await axios.post(
        "http://localhost:5000/api/grievances",
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }

    setForm({
      title: "",
      description: "",
      category: "Academic",
    });

    fetchData();
  };

  // DELETE
  const handleDelete = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/grievances/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    fetchData();
  };

  // EDIT
  const handleEdit = (g) => {
    setForm({
      title: g.title,
      description: g.description,
      category: g.category,
    });
    setEditId(g._id);
  };

  // SEARCH
  const handleSearch = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/grievances/search?title=${search}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setGrievances(res.data);
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="dashboard">
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Dashboard</h2>
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* FORM CARD */}
      <div className="card" style={{ marginTop: "15px" }}>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <input
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <select
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          >
            <option>Academic</option>
            <option>Hostel</option>
            <option>Transport</option>
            <option>Other</option>
          </select>

          <button className="primary" type="submit">
            {editId ? "Update" : "Submit"}
          </button>
        </form>
      </div>

      {/* SEARCH */}
      <div style={{ marginTop: "15px" }}>
        <input
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="primary" onClick={handleSearch}>
          Search
        </button>

        <button onClick={fetchData}>Reset</button>
      </div>

      <h3 style={{ marginTop: "20px" }}>Your Grievances</h3>

      {/* LIST */}
      {grievances.map((g) => (
        <div key={g._id} className="grievance-card">
          <h4>{g.title}</h4>
          <p>{g.description}</p>
          <p style={{ color: "gray" }}>{g.category}</p>

          <div style={{ marginTop: "10px" }}>
            <button
              className="warning"
              onClick={() => handleEdit(g)}
            >
              Edit
            </button>

            <button
              className="danger"
              onClick={() => handleDelete(g._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;