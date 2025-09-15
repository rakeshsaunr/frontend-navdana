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

  useEffect(() => {
    fetchBanners();
    // eslint-disable-next-line
  }, []);

  const fetchBanners = async () => {
    setLoading(true);
    setFormError("");
    try {
      const res = await axios.get(API_URL);
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
        dataToSend.append("image", imageFile);
      }

      if (editingId) {
        await axios.put(
          `${API_URL}/${editingId}`,
          dataToSend,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setSuccessMsg("Banner updated successfully!");
      } else {
        if (!imageFile) {
          setFormError("Please select an image for the banner.");
          setLoading(false);
          return;
        }
        await axios.post(
          API_URL,
          dataToSend,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
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
        await axios.delete(`${API_URL}/${id}`);
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
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800 text-center tracking-tight w-full">Manage Banners</h2>

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
              <label className="font-medium text-gray-700 mb-1 text-sm sm:text-base" htmlFor="cat-name">Banner Title</label>
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
              <label className="font-medium text-gray-700 mb-1 text-sm sm:text-base" htmlFor="cat-image">Image</label>
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
              <label className="flex items-center gap-2 text-sm select-none">Active</label>
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="accent-blue-600"
              />
            </div>
          </div>
          {/* Move Add Banner button and Cancel button below the form fields */}
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

        {/* Mobile Card List */}
        <div className="block md:hidden">
          {safeBanners.length === 0 && (
            <div className="text-center p-4 text-gray-500">
              {loading ? "Loading..." : "No banners found"}
            </div>
          )}
          <div className="space-y-4">
            {safeBanners.map((banner) => (
              <div
                key={banner._id}
                className="bg-white rounded-lg shadow border border-gray-200 p-4 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-24 h-16 flex items-center justify-center bg-gray-100 rounded overflow-hidden border border-gray-200">
                    {banner.url ? (
                      <img
                        src={banner.url}
                        alt={banner.title}
                        className="object-contain h-16 w-24"
                      />
                    ) : (
                      <span className="text-gray-400 text-xs">No Image</span>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-base">{banner.title}</div>
                    <div className="mt-1">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                          banner.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {banner.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-3 sm:mt-0 sm:ml-auto">
                  <button
                    onClick={() => handleEdit(banner)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1.5 rounded font-medium shadow transition-colors duration-150 disabled:opacity-60 text-xs"
                    disabled={loading}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(banner._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded font-medium shadow transition-colors duration-150 disabled:opacity-60 text-xs"
                    disabled={loading}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto w-full">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden shadow bg-white text-sm">
            <thead>
              <tr className="bg-blue-50 text-blue-900">
                <th className="border-b px-6 py-3 text-left font-semibold">Title</th>
                <th className="border-b px-6 py-3 text-left font-semibold">Image</th>
                <th className="border-b px-6 py-3 text-left font-semibold">Active</th>
                <th className="border-b px-6 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {safeBanners.map((banner, idx) => (
                <tr
                  key={banner._id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="border-b px-6 py-3">{banner.title}</td>
                  <td className="border-b px-6 py-3">
                    {banner.url ? (
                      <img
                        src={banner.url}
                        alt={banner.title}
                        className="h-16 w-28 object-contain border border-gray-200 rounded shadow"
                      />
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="border-b px-6 py-3">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        banner.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {banner.isActive ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="border-b px-6 py-3 space-x-2">
                    <button
                      onClick={() => handleEdit(banner)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1.5 rounded font-medium shadow transition-colors duration-150 disabled:opacity-60"
                      disabled={loading}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(banner._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded font-medium shadow transition-colors duration-150 disabled:opacity-60"
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {safeBanners.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center p-6 text-gray-500">
                    {loading ? "Loading..." : "No banners found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Banners;
