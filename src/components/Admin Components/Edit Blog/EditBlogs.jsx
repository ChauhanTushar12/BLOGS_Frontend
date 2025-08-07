import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axios from 'axios';

const EditBlogs = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("accessToken");

  // Fetch all blogs (admin)
  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`http://localhost:1000/api/v1/fetchAllBlogs`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
        withCredentials: true,
      });
      setData(res.data.blogs || []);
    } catch (err) {
      console.error("Failed to fetch blogs:", err.response || err);
      toast.error(err.response?.data?.message || "Failed to fetch blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Delete blog
  const deleteBlogHandler = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await axios.delete(`http://localhost:1000/api/v1/deleteBlog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Added token
        },
        withCredentials: true,
      });

      toast.success(res.data.message || "Blog deleted successfully");
      setData((prev) => prev.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Delete failed:", error.response || error);
      toast.error(error.response?.data?.message || "Failed to delete blog");
    }
  };

  return (
    <div className='p-4 min-h-screen bg-gray-50'>
      <div className="mb-4 py-4">
        <h1 className="text-xl font-semibold mb-4">Edit Blogs</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.length > 0 ? (
            data.map((items) => (
              <div key={items._id} className="bg-white rounded-xl p-4 flex flex-col shadow hover:shadow-md transition duration-300">
                <div className="w-full h-40 mb-4">
                  <img
                    src={items.image?.url}
                    alt={items.title || "Blog image"}
                    className="w-full h-full object-cover rounded"
                  />
                </div>

                <h1 className="text-2xl font-semibold mb-2">{items.title}</h1>
                <p className="text-zinc-700 mb-4">{items.description?.slice(0, 150)}...</p>

                <div className="flex items-center gap-4">
                  <Link
                    to={`/admin-dashboard/update-blog/${items._id}`}
                    className="bg-blue-600 text-center w-full text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Edit
                  </Link>
                  <button
                    className="bg-red-500 w-full text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    onClick={() => deleteBlogHandler(items._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">No blogs available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditBlogs;
