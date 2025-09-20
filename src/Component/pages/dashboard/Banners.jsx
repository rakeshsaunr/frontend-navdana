// src/pages/Banners.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://navdana.com/api/v1/banner";

const Banners = () => {
  const [banners, setBanners] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    isActive: true,
  });
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const token = localStorage.getItem("token"); // or sessionStorage

  useEffect(() => {
    fetchBanners();
    // eslint-disable-next-line
  }, []);

  const fetchBanners = async () => {
    setLoading(true);
    setFormError("");
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      let bannersData = res.data?.data || res.data || [];
      if (!Array.isArray(bannersData)) {
        if (Array.isArray(res.data?.banners)) {
          bannersData = res.data.banners;
        } else {
          bannersData = [];
        }
      }
      setBanners(bannersData);
    } catch (error) {
      setFormError(
        error?.response?.data?.message ||
          error?.message ||
          "Error fetching banners"
      );
      setBanners([]);
      console.error("Error fetching banners:", error);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === "image" && type === "file") {
      setImageFile(files[0]);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSuccessMsg("");
    setLoading(true);
    try {
      let dataToSend = new FormData();
      dataToSend.append("title", formData.title);
      dataToSend.append("isActive", formData.isActive);

      if (imageFile) {
        // ✅ match backend multer field
        dataToSend.append("url", imageFile);
      }

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, dataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        setSuccessMsg("Banner updated successfully!");
      } else {
        if (!imageFile) {
          setFormError("Please select an image for the banner.");
          setLoading(false);
          return;
        }
        await axios.post(`${API_URL}/upload`, dataToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSuccessMsg("Banner added successfully!");
      }
      setFormData({ title: "", isActive: true });
      setImageFile(null);
      setEditingId(null);
      fetchBanners();
    } catch (error) {
      setFormError(
        error?.response?.data?.message ||
          error?.message ||
          "Error saving banner"
      );
      console.error("Error saving banner:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      setFormError("");
      setSuccessMsg("");
      setLoading(true);
      try {
        await axios.delete(`${API_URL}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuccessMsg("Banner deleted successfully!");
        fetchBanners();
      } catch (error) {
        setFormError(
          error?.response?.data?.message ||
            error?.message ||
            "Error deleting banner"
        );
        console.error("Error deleting banner:", error);
      }
      setLoading(false);
    }
  };

  const handleEdit = (banner) => {
    setFormData({
      title: banner.title || "",
      isActive: banner.isActive !== undefined ? banner.isActive : true,
    });
    setImageFile(null);
    setEditingId(banner._id);
    setFormError("");
    setSuccessMsg("");
  };

  const handleCancelEdit = () => {
    setFormData({ title: "", isActive: true });
    setImageFile(null);
    setEditingId(null);
    setFormError("");
    setSuccessMsg("");
  };

  const safeBanners = Array.isArray(banners) ? banners : [];

  return (
    <div className="p-0 m-0 w-full min-h-screen bg-gray-50">
      <div className="w-full px-2 sm:px-4 md:px-8 py-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800 text-center tracking-tight w-full">
          Manage Banners
        </h2>

        {/* Alerts */}
        {formError && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 mb-4 rounded text-sm text-center">
            {formError}
          </div>
        )}
        {successMsg && (
          <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-2 mb-4 rounded text-sm text-center">
            {successMsg}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
          encType="multipart/form-data"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1 w-full">
              <label className="font-medium text-gray-700 mb-1 text-sm sm:text-base">
                Banner Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Banner Title"
                value={formData.title}
                onChange={handleChange}
                className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-2 rounded text-sm transition"
                required
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label className="font-medium text-gray-700 mb-1 text-sm sm:text-base">
                Image
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-2 rounded text-sm transition file:mr-3 file:py-1 file:px-2 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700"
                required={!editingId}
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm select-none">
                Active
              </label>
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="accent-blue-600"
              />
            </div>
          </div>
          {/* Buttons */}
          <div className="flex flex-col gap-2 col-span-1 md:col-span-2 mt-2 w-full">
            <div className="flex gap-2 flex-wrap">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded text-sm font-semibold shadow disabled:opacity-60"
                disabled={loading}
              >
                {editingId
                  ? loading
                    ? "Updating..."
                    : "Update Banner"
                  : loading
                  ? "Adding..."
                  : "Add Banner"}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="bg-gray-400 hover:bg-gray-500 transition text-white px-5 py-2 rounded text-sm font-semibold shadow"
                  onClick={handleCancelEdit}
                  disabled={loading}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Banner listing */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-lg font-semibold mb-4">All Banners</h3>
          {safeBanners.length === 0 ? (
            <p className="text-gray-500 text-sm">No banners found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {safeBanners.map((banner) => (
                <div
                  key={banner._id}
                  className="border rounded-lg overflow-hidden shadow-sm bg-gray-50"
                >
                  <img
                    src={banner.url} // ✅ using `url` from your API
                    alt={banner.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-3">
                    <h4 className="font-medium text-gray-800">{banner.title}</h4>
                    <p className="text-xs text-gray-500">
                      Status: {banner.isActive ? "Active" : "Inactive"}
                    </p>
                    <div className="flex gap-2 mt-2">
                      {/* <button
                        onClick={() => handleEdit(banner)}
                        className="bg-yellow-500 hover:bg-yellow-600 transition text-white px-3 py-1 rounded text-xs"
                      >
                        Edit
                      </button> */}
                      <button
                        onClick={() => handleDelete(banner._id)}
                        className="bg-red-500 hover:bg-red-600 transition text-white px-3 py-1 rounded text-xs"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banners;
