import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import axiosInstance from '../../../utils/axiosInstance';
// import apiClient from "../../../utils/apiClient";
// import { axiosClient } from '../../../api/apiClient';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../../store/authReducer';
import { toast } from 'react-toastify';
import axios from 'axios';

const Sidebar = () => {

  const links = [
    {
      to: "/admin-dashboard",
      name: "DashBoard"
    },
    {
      to: "/admin-dashboard/add-blogs",
      name: "Add Blog"
    },
    {
      to: "/admin-dashboard/edit-blogs",
      name: "Edit Blogs"
    },
  ]

  const dispatch = useDispatch();
  const backendLink = useSelector((state) => state.prod.link);
  const history = useNavigate();

const logoutHandler = async () => {
  try {
    let accessToken = localStorage.getItem("accessToken");
    try {
      await axios.post("http://localhost:1000/api/v1/adminLogout", {}, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
    } catch (error) {
      if (error.response?.status === 403 || error.response?.status === 401) {
        const refreshResponse = await axiosInstance.post("/refresh-token", {
          refreshToken: localStorage.getItem("refreshToken"),
        });
        accessToken = refreshResponse.data.accessToken;
        localStorage.setItem("accessToken", accessToken);
        await axios.post("http://localhost:1000/api/v1/adminLogout", {}, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
      } else {
        throw error;
      }
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    if (window.refreshTimeout) {
      clearTimeout(window.refreshTimeout);
    }
    dispatch(authActions.logout());
    toast.success("Logged out successfully");
    history("/admin-login");
  } catch (error) {
    console.error("Logout failed:", error.response?.data || error.message);
    toast.error("Logout failed. Try again.");
  }
};

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold'>Admin Page</h1>
      <hr className='my-4' />
      <div className='flex flex-col gap-4'>
        {links.map((items, i) => <Link to={items.to} key={i} className='text-xl hover:scale-105 transition-all duration-300'>{items.name}</Link>)}
      </div>

      <div>
        <button className="bg-black text-white rounded w-[100%] text-center my-4 py-2 hover:bg-white hover:text-black hover:border transition-all duration-300" onClick={logoutHandler}>Logout</button>
      </div>

    </div>
  )
}

export default Sidebar;
