import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { toast } from 'react-toastify';
import axios from 'axios';

const Description = () => {
  const [Data, setData] = useState('');
  const [Favorites, setFavorites] = useState(false);
  const { id } = useParams();

  const backendLink = "http://localhost:1000"; // You can replace this with Redux state if needed
  const token = localStorage.getItem("accessToken");

  // Fetch blog description by ID
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:1000/api/v1/getDescById/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        setFavorites(res.data.favourite || false);
        setData(res.data.blog || {});
      } catch (error) {
        console.error("Fetch Blog Error:", error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Failed to load blog data");
      }
    };

    fetchBlog();
  }, [id, token, backendLink]);

  // Handle favorites toggle
  const FavoritesHandler = async () => {
    try {
      let res;

      if (!Favorites) {
        res = await axios.put(
          `http://localhost:1000/api/v1/addBlogsFavourite/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
      } else {
        res = await axios.put(
          `http://localhost:1000/api/v1/removeBlogsFromFavourite/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
      }

      setFavorites(res.data.favourite);
      toast.success(res.data.message || "Updated successfully");
    } catch (error) {
      console.error("Favorites Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      {Data && (
        <>
          <div className="w-full flex items-center justify-between">
            <h1 className="text-2xl font-semibold w-5/6">{Data.title}</h1>
            <div className="w-1/6 text-2xl lg:text-3xl flex justify-end">
              <button onClick={FavoritesHandler}>
                {Favorites ? (
                  <FaHeart className="hover:cursor-pointer text-red-500" />
                ) : (
                  <FaRegHeart className="hover:cursor-pointer" />
                )}
              </button>
            </div>
          </div>

          {Data.image && (
            <img
              src={Data.image?.url}
              alt={Data.image?.name || "Blog image"}
              className="w-full max-h-[400px] object-cover rounded my-4"
            />
          )}

          <p className="mt-4">{Data.description}</p>
        </>
      )}
    </div>
  );
};

export default Description;
