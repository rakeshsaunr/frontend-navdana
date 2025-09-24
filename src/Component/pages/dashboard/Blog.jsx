import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const API_BASE = "https://navdana-backend-2.onrender.com/api/v1/blog";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const fileInputRef = useRef(null);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_BASE);
      setBlogs(res.data?.blogss || []);
    } catch (err) {
      console.error("Fetch blogs error:", err);
      alert("Failed to fetch blogs — check console for details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (name === "image" && type === "file") {
      setForm((prev) => ({ ...prev, image: files[0] || null }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // client-side validation
    if (!form.title.trim()) return setFormError("Title is required");
    if (!form.description.trim()) return setFormError("Description is required");
    if (!form.link.trim()) return setFormError("Link is required");
    if (!form.image) return setFormError("Image is required");

    setFormError("");
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("link", form.link);
    formData.append("image", form.image);

    try {
      // check what token is stored
      const token = localStorage.getItem("token"); // change key if backend uses 'accessToken'/'auth' etc.
      console.log("Using token:", token);
      if (!token) {
        alert("You must be logged in to add a blog.");
        return;
      }

      // IMPORTANT: Do NOT set Content-Type manually for multipart/form-data,
      // let the browser set the correct boundary.
      const res = await axios.post(API_BASE, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "multipart/form-data" <- removed on purpose
        },
      });

      console.log("Create blog response:", res.data);
      // reset form state and file input UI
      setForm({ title: "", description: "", link: "", image: null });
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchBlogs();
    } catch (err) {
      console.error("Create blog error:", err);
      // show server's error if available
      const serverMessage = err.response?.data?.message || err.response?.data || err.message;
      if (err.response?.status === 401) {
        alert("Unauthorized: Please login to add a blog.");
      } else {
        alert("Failed to create blog: " + serverMessage);
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to delete a blog.");
        return;
      }
      await axios.delete(`${API_BASE}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Delete blog error:", err);
      const serverMessage = err.response?.data?.message || err.message;
      if (err.response?.status === 401) alert("Unauthorized: Please login.");
      else alert("Failed to delete blog: " + serverMessage);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: 20 }}>
      <h2>Blogs</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        <input
          type="text"
          name="title"
          placeholder="title"
          value={form.title}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 8, padding: 8 }}
        />
        <textarea
          name="description"
          placeholder="description"
          value={form.description}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 8, padding: 8 }}
        />
        <input
          type="text"
          name="link"
          placeholder="link"
          value={form.link}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 8, padding: 8 }}
        />
        <input
          ref={fileInputRef}
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 8, padding: 8 }}
        />
        {formError && <div style={{ color: "red", marginBottom: 8 }}>{formError}</div>}
        <button type="submit" style={{ padding: "8px 16px" }}>
          Add Blog
        </button>
      </form>

      {loading ? (
        <p>Loading blogs...</p>
      ) : (
        <div>
          {blogs.length === 0 ? (
            <p>No blogs found.</p>
          ) : (
            blogs.map((blog) => (
              <div
                key={blog._id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: 6,
                  padding: 16,
                  marginBottom: 16,
                  position: "relative",
                }}
              >
                <h3>{blog.title}</h3>
                <p>{blog.description}</p>
                {blog.image && (
                  <img src={blog.image} alt={blog.title} style={{ maxWidth: "100%", maxHeight: 200, marginBottom: 8 }} />
                )}
                <div>
                  <a href={blog.link} target="_blank" rel="noopener noreferrer">
                    Read More
                  </a>
                </div>
                <button
                  onClick={() => handleDelete(blog._id)}
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    background: "#e74c3c",
                    color: "#fff",
                    border: "none",
                    borderRadius: 4,
                    padding: "4px 10px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;