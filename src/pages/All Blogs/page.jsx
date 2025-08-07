import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import AllBlogsComponent from '../../components/All Blogs/AllBlogsComponent';

const AllBlogs = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`http://localhost:1000/api/v1/fetchAllBlogs`, {
          withCredentials: true,
        });
        setData(res.data.blogs);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      }
    };
    fetch();
  }, []);

  return (
    <div className="mb-4 py-4 bg-slate-100">
      <h1 className="p-4 text-xl font-semibold">ALL Categories</h1>
      {Data.length > 0 ? (
        <div className=" flex flex-col gap-8 lg:gap-4">
          <AllBlogsComponent data={Data} />
        </div>
      ) : (
        <div className="text-center py-8 text-zinc-500">No Blogs Found</div>
      )}
    </div>
  );
};

export default AllBlogs;
