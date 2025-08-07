import React, { useEffect, useState } from 'react';
import BlogCrad from '../BlogCrad/BlogCrad';
import { useSelector } from 'react-redux';
import axios from 'axios';

const RecentBlogs = () => {
const [data, setData] = useState([]); 

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`http://localhost:1000/api/v1/fetchReacentBlogs`, {
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
<div className="mb-4 py-4">
      <h1 className="text-xl font-semibold mb-4">Last Watch</h1>
      <div className="flex flex-col gap-8 lg:gap-8">
        {data&& data.map((item, i) => (
        <div key={i} className="flex flex-col lg:flex-row gap:2 lg:gap-4">
             <BlogCrad items={item} />
        </div>
        ))}
      </div>
    </div>
  )
}

export default RecentBlogs;
