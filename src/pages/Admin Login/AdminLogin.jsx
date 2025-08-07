import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/authReducer';
import axios from 'axios';

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [Input, setInput] = useState({ email: '', password: '' });

  const change = (e) => {
    setInput({
      ...Input,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:1000/api/v1/adminlogin",
        Input,
        { withCredentials: true } 
      );
      const { accessToken, refreshToken, message } = res.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      dispatch(authActions.adminlogin());
      toast.success(message);
      setInput({ email: "", password: "" });
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Admin login error:", error.response?.data || error.message);
      toast.error(error?.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-12 shadow-2xl rounded w-[80%] md:w-[60%] lg:w-[40%] flex flex-col items-center justify-center">
        <div className="text-2xl flex flex-col lg:flex-row gap-2 text-center mb-4">
          <h1 className="font-bold">Admin Login!</h1>
          <span>Please Login here</span>
        </div>
        <div>
          <form className="flex flex-col w-full mt-4" onSubmit={handleAdminLogin}>
            <div className="flex flex-col mb-4">
              <label>Email</label>
              <input
                type="email"
                value={Input.email}
                name="email"
                className="mt-2 outline-none border px-3 py-2 rounded border-zinc-200"
                required
                onChange={change}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label>Password</label>
              <input
                type="password"
                value={Input.password}
                name="password"
                className="mt-2 outline-none border px-3 py-2 rounded border-zinc-200"
                required
                onChange={change}
              />
            </div>
            <div className="flex mt-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;