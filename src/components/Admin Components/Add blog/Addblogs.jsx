import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Addblogs = () => {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Image, setImage] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [NewCategory, setNewCategory] = useState('');
  const [ActualCategories, setActualCategories] = useState([]);
  const [Categoryid, setCategoryid] = useState('');

  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) {
      toast.error("Unauthorized. Please login first.");
      navigate("/login");
    } else {
      fetchCategories();
    }
  }, [token]);

  // Image change handler with validation
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be under 2MB");
      return;
    }
    setImage(file);
  };

  // Add Blog
  const handleAddBlog = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", Title);
      formData.append("description", Description);
      formData.append("category", Categoryid);
      formData.append("image", Image);

      const res = await axios.post("http://localhost:1000/api/v1/addBlog", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      toast.success(res.data.message || "Blog added successfully");
      setTitle("");
      setDescription("");
      setCategoryid("");
      setImage(null);
      navigate("/admin-dashboard");
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("accessToken");
        navigate("/admin-login");
      } else {
        toast.error(error.response?.data?.message || error.response?.data?.error || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  // Add Category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:1000/api/v1/addCategory",
        { title: NewCategory },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      toast.success(res.data.message || "Category added successfully");
      setNewCategory('');
      fetchCategories();
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("accessToken");
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || error.response?.data?.error || "Failed to add category");
      }
    }
  };

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:1000/api/v1/getCategory", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setActualCategories(res.data.categories);
    } catch (error) {
      console.error("Fetch category error:", error.response?.data || error.message);
    }
  };

  return (
    <div className='m-4 h-screen'>
      <div className='p-4 bg-white rounded shadow'>
        <h1 className='text-2xl font-semibold'>Add Blogs</h1>

        <form className='my-4 flex flex-col gap-4' onSubmit={handleAddBlog}>
          <input
            className='p-2 bg-transparent text-2xl outline-none border-b border-zinc-300 font-semibold w-full'
            type='text'
            placeholder='Title'
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            className='p-2 bg-transparent text-xl outline-none border-b border-zinc-300 font-semibold w-full'
            placeholder='Description'
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <div>
            <input
              className='text-white text-xl rounded bg-zinc-900'
              accept='.jpeg, .jpg, .png'
              type="file"
              onChange={handleImageChange}
              required
            />
            <select
              className='ms-4 text-white px-4 py-2 text-xl rounded bg-gray-700'
              onChange={(e) => setCategoryid(e.target.value)}
              value={Categoryid}
              required
            >
              <option value="">Select Category</option>
              {ActualCategories.map((item, i) => (
                <option value={item._id} key={i}>{item.title}</option>
              ))}
            </select>
          </div>

          <div className='my-2'>
            {Loading ? (
              <div className='bg-blue-300 px-4 py-2 shadow-xl text-white rounded'>
                Adding Blog...
              </div>
            ) : (
              <button
                type='submit'
                className='bg-blue-500 px-4 py-2 shadow-xl text-white rounded hover:bg-blue-700'
              >
                Add Blog
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Add Category */}
      <div className='mt-4'>
        <div className='p-4 bg-white rounded shadow'>
          <h1 className='text-2xl font-semibold mt-8'>Add New Category</h1>
          <form className='mt-4 flex items-center gap-4' onSubmit={handleAddCategory}>
            <input
              className='p-2 bg-transparent text-2xl outline-none border-b border-zinc-300 font-semibold'
              type='text'
              placeholder='Your New Category'
              required
              value={NewCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <button
              type='submit'
              className='bg-blue-500 px-4 py-2 shadow-xl text-white rounded hover:bg-blue-700'
            >
              Add Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addblogs;
