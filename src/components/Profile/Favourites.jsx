import React, { useEffect, useState } from 'react';
import BlogCrad from '../BlogCrad/BlogCrad';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from 'react-toastify';
// import { isAuthenticated } from '../../utils/authUtils';
// import axios from 'axios';
import apiClient from '../../utils/apiClient.js';

const Favourites = () => {
  const [data, setData] = useState([]);
  const [favoritesMap, setFavoritesMap] = useState({});

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const res = await apiClient.get(`getfavouriteBlogsOfUser`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
        });
        const favouriteBlogs = res.data.favouriteBlogs || [];
        setData(favouriteBlogs);
        const favMap = {};
        favouriteBlogs.forEach(blog => {
          favMap[blog._id] = true;
        });
        setFavoritesMap(favMap);
      } catch (err) {
        console.error("Failed to fetch blogs:", err?.response?.data?.message || err.message);
        toast.error(err?.response?.data?.message || "Failed to fetch favourite blogs");
      }
    };

    fetchFavourites();
  }, []);
const toggleFavourite = async (id) => {
  try {
    const isFav = favoritesMap[id];

    const res = isFav
      ? await apiClient.put(
          `removeBlogsFromFavourite/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            withCredentials: true,
          }
        )
      : await apiClient.put(
          `addBlogsFavourite/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            withCredentials: true,
          }
        );

    setFavoritesMap((prev) => ({
      ...prev,
      [id]: !isFav,
    }));

    if (isFav) {
      setData((prevData) => prevData.filter((blog) => blog._id !== id));
    }

    toast.success(res.data.message);
  } catch (error) {
    console.error("Toggle Favourite Error:", error.response?.data || error.message);
    toast.error(error?.response?.data?.message || "Something went wrong");
  }
};


  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">Your Favourite</h1>

      {data && data.length > 0 ? (
        <div className="flex flex-col gap-6">
          {data.map((item) => (
            <div key={item._id} className="flex flex-col lg:flex-row gap-4 items-start justify-between bg-white p-4 rounded shadow">
              <BlogCrad items={item} />
              <button
                onClick={() => toggleFavourite(item._id)}
                className="self-start mt-2 lg:mt-0"
              >
                {favoritesMap[item._id] ? (
                  <FaHeart className="text-red-500 text-2xl" />
                ) : (
                  <FaRegHeart className="text-2xl" />
                )}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No favourite blogs found.</p>
      )}
    </div>
  );
};

export default Favourites;