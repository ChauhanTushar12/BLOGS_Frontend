import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateBlog = () => {
  const [Image, setImage] = useState(null);
  const [Data, setData] = useState({ title: "", description: "", image: "" });
  const [Loading, setLoading] = useState(false);
  const [showOldImage, setShowOldImage] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");

  // Fetch blog details by ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:1000/api/v1/getDescById/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        });
        setData(res.data.blog);
      } catch (error) {
        console.error("Failed to fetch blog data:", error.response || error);
        toast.error("Failed to load blog");
      }
    };
    fetchData();
  }, [id, token]);

  // Handle input changes
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit updated blog
  const handleEdit = async () => {
    if (!Data.title || !Data.description) {
      toast.error("Title and description are required!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", Data.title);
    formData.append("description", Data.description);

    // Only add image if a new one is selected
    if (!showOldImage && Image) {
      formData.append("image", Image);
    }

    try {
      const res = await axios.put(`http://localhost:1000/api/v1/editBlog/${id}`, formData,{
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      toast.success(res.data.message || "Blog updated successfully");
      navigate("/admin-dashboard");
    } catch (err) {
      console.error("Update error:", err.response || err);
      toast.error(err?.response?.data?.message || "Failed to update blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-4 min-h-screen bg-white text-black'>
      <h1 className='text-3xl font-bold mb-6'>Update Blog</h1>

      {Data && (
        <form className='flex flex-col gap-4'>
          {/* Title */}
          <label className='text-xl font-semibold'>Title</label>
          <input
            className='p-2 border border-gray-300 rounded bg-transparent text-xl'
            type='text'
            name='title'
            value={Data.title}
            onChange={changeHandler}
            placeholder='Enter blog title'
          />

          {/* Description */}
          <label className='text-xl font-semibold'>Description</label>
          <textarea
            className='p-2 border border-gray-300 rounded bg-transparent text-lg min-h-[150px]'
            name='description'
            value={Data.description}
            onChange={changeHandler}
            placeholder='Enter blog description'
          />

          {/* Image Handling */}
          <label className='text-xl font-semibold'>Image</label>

          {/* Old Image Preview */}
          {showOldImage && Data.image?.url && (
            <div className='mb-4'>
              <img
                src={Data.image.url}
                alt='Old Blog'
                className='w-60 h-auto rounded border'
              />
              <button
                type='button'
                className='mt-2 bg-red-600 text-white px-3 py-1 rounded text-sm'
                onClick={() => setShowOldImage(false)}
              >
                Remove Old Image
              </button>
            </div>
          )}

          {/* New Image Preview */}
          {!showOldImage && Image && (
            <div className='mb-4'>
              <p className='text-sm text-green-700 mb-1'>
                Selected New Image: {Image.name}
              </p>
              <img
                src={URL.createObjectURL(Image)}
                alt='New Preview'
                className='w-60 h-auto rounded border'
              />
            </div>
          )}

          {/* File input (only when old image is removed) */}
          {!showOldImage && !Image && (
            <input
              type='file'
              accept='.jpeg, .jpg, .png'
              onChange={(e) => setImage(e.target.files[0])}
              className='text-white text-xl rounded bg-zinc-900 p-2'
            />
          )}

          {/* Submit Button */}
          <div className='mt-2'>
            {Loading ? (
              <div className='bg-blue-300 px-4 py-2 text-white rounded'>
                Updating Blog...
              </div>
            ) : (
              <button
                type='button'
                onClick={handleEdit}
                className='bg-blue-600 hover:bg-blue-800 px-4 py-2 text-white text-xl rounded'
              >
                Update Blog
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateBlog;
