import React, { useState, useEffect } from 'react';
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
// import axios from 'axios';
import apiClient from '../../utils/apiClient.js';

const DashboardProfile = () => {
  const [changeAvatar, setChangeAvatar] = useState(null);
  const [UserData, setUserData] = useState();
  const [Passwords, setPasswords] = useState({
    password: "",
    newPass: "",
    confirmNewPass: ""
  });

  const backendLink = useSelector((state) => state.prod.link) || "http://localhost:1000";

  // Helper function to get auth headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem("accessToken");
    return {
      Authorization: `Bearer ${token}`,
    };
  };

  // Fetch profile data
  const fetchProfileData = async () => {
    try {
      const res = await apiClient.get("getProfileData", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        withCredentials: true,
      });
      if (res.headers["x-new-access-token"]) {
        localStorage.setItem("accessToken", res.headers["x-new-access-token"]);
      }
      setUserData(res.data.data);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      if (error.response?.status === 403) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("accessToken");
      } else {
        toast.error(error.response?.data?.message || "You Have Not Login");
      }
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  // Handle image change
  const changeImage = (e) => {
    // console.log("Selected image:", e.target.files[0]);
    setChangeAvatar(e.target.files[0]);
  };

  // Update avatar
  const updateAvatar = async () => {
    if (!changeAvatar) return toast.error("Please select an image");

    try {
      const formData = new FormData();
      formData.append("avatar", changeAvatar);

      const res = await apiClient.put("changeAvatar", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        withCredentials: true,
      });

      toast.success(res.data.message);
      setChangeAvatar(null);
      fetchProfileData(); // Refresh profile
    } catch (error) {
      console.error("Avatar update error:", error.response?.data || error.message);
      toast.error(error.response?.data?.error || "Something went wrong");
    }
  };

  // Handle password input changes
  const changePass = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...Passwords, [name]: value });
  };

  // Handle password update
  const handlePass = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.put("changeUserPassword", Passwords, {
        headers: getAuthHeaders(),
        withCredentials: true,
      });

      toast.success(res.data.message);
      setPasswords({
        password: "",
        newPass: "",
        confirmNewPass: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.error || error.response?.data?.message || "Password update failed");
      console.error("Password update error:", error.response?.data || error.message);
    }
  };

  return (
    <>
      {UserData && (
        <div className="flex flex-col w-full px-4 py-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">

            {/* Avatar & Upload */}
            <div className="flex flex-col items-center">
              <div className="size-[20vh] border rounded-full overflow-hidden">
                <label className="w-full h-full flex items-center justify-center cursor-pointer" htmlFor="imgFile">
                  {UserData.avatar ? (
                    <img
                      src={changeAvatar ? URL.createObjectURL(changeAvatar) : UserData.avatar}
                      alt="Avatar Preview"
                      className="size-[100%] rounded-full object-cover"
                    />
                  ) : (
                    <FaUserAlt className="size-[12vh] text-zinc-600" />
                  )}
                </label>
              </div>

              <div className="mt-4 flex flex-col gap-2 w-full text-center">
                <input
                  type="file"
                  id="imgFile"
                  accept=".jpeg, .jpg, .png"
                  className="hidden"
                  onChange={changeImage}
                />
                <button
                  className="bg-blue-700 px-4 py-2 rounded text-white hover:bg-blue-800 transition-all duration-300"
                  onClick={updateAvatar}
                >
                  Change Avatar
                </button>
              </div>
            </div>

            {/* User Info */}
            <div className="text-center lg:text-left">
              <p className="text-zinc-600">{UserData.email}</p>
              <h1 className="text-2xl md:text-3xl lg:text-5xl mt-2 font-semibold">{UserData.username}</h1>
            </div>
          </div>

          <hr className="my-8" />

          {/* Password Change Form */}
          <div>
            <h1 className="text-2xl font-semibold">Change Account's Password</h1>
            <form className="my-4" onSubmit={handlePass}>
              <div className="flex flex-col">
                <label>Current Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Current Password"
                  className="mt-2 outline-none border px-3 py-2 rounded border-zinc-200"
                  required
                  value={Passwords.password}
                  onChange={changePass}
                />
              </div>

              <div className="flex flex-col mt-4">
                <label>New Password</label>
                <input
                  type="password"
                  name="newPass"
                  placeholder="New Password"
                  className="mt-2 outline-none border px-3 py-2 rounded border-zinc-200"
                  required
                  value={Passwords.newPass}
                  onChange={changePass}
                />
              </div>

              <div className="flex flex-col mt-4">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  name="confirmNewPass"
                  placeholder="Confirm New Password"
                  className="mt-2 outline-none border px-3 py-2 rounded border-zinc-200"
                  required
                  value={Passwords.confirmNewPass}
                  onChange={changePass}
                />
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded transition-all duration-300"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardProfile;