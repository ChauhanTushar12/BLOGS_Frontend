import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Categories = () => {
  const [cat, setCat] = useState([]);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`http://localhost:1000/api/v1/getCategory`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setCat(res.data.categories);
      } catch (error) {
        console.error("Fetch category error:", error);
        toast.error("Failed to fetch categories");
      }
    };
    fetch();
  }, [token]);

  return (
    <div className="mb-4 py-4">
      <h1 className="text-xl font-semibold mb-4">Categories</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cat.length === 0 ? (
          <p className="col-span-full text-center">Loading categories...</p>
        ) : (
          cat.map((item, i) => (
            <Link
              key={i}
              to={`/cat/${item._id}`}
              className="bg-indigo-200 px-4 py-2 text-center lg:text-normal md:text-xl font-semibold rounded hover:shadow-md transition-all duration-200"
            >
              {item.title}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Categories;
