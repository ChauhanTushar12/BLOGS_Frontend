import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import axiosInstance from '../../../utils/axiosInstance';
// import apiClient from "../../../utils/apiClient";
// import { axiosClient } from '../../../api/apiClient';
import { toast } from 'react-toastify';
import axios from 'axios';

const DashBoard = () => {
  const [data, setData] = useState([]);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`http://localhost:1000/api/v1/fetchAllBlogs`);
      setData(res.data.blogs);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
      toast.error("Failed to fetch blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className='p-4 min-h-screen bg-gray-50'>
      <div className="mb-4 py-4">
        <h1 className="text-xl font-semibold mb-4">Admin Dashboard</h1>

        {data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((items, i) => (
              <div key={i} className="bg-white rounded-xl p-4 flex flex-col shadow hover:shadow-md transition duration-300">
                <div className="w-full h-40 mb-4">
                  <img
                    src={items.image?.url}
                    alt={items.image?.name || "Blog image"}
                    className="w-full h-full object-cover rounded"
                  />
                </div>

                <h1 className="text-2xl font-semibold mb-2">{items.title}</h1>
                <p className="text-zinc-700 mb-4">{items.description.slice(0, 150)}...</p>
                <div>
                  <Link
                    to={`/description/${items._id}`}
                    className="inline-block mt-2 bg-blue-500 px-2 py-1 rounded text-white hover:bg-blue-600 transition-all duration-300"
                  >
                    Read Blog
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-zinc-500">No Blogs Found</div>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
