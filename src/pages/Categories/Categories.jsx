import React, { useEffect, useState } from 'react';
import BlogCrad from '../../components/BlogCrad/BlogCrad';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Categories = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`http://localhost:1000/api/v1/getCategoriesById/${id}`, {
          withCredentials: true,
        });
        setData(res.data.blogs);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      }
    };
    fetch();
  }, [id]);

  return (
    <div className="mb-4 py-4">
      <h1 className="text-xl font-semibold mb-4">Categories</h1>
      <div className="flex flex-col gap-8 lg:gap-4">
        {data.length === 0 ? (
          <p className="text-zinc-500">No blogs found for this category.</p>
        ) : (
          data.map((item, i) => (
            <div key={i} className="flex flex-col lg:flex-row gap-2 lg:gap-4">
              <BlogCrad items={item} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Categories;