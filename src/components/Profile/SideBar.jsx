import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/authReducer';
import { toast } from 'react-toastify';
// import axios from 'axios';
import apiClient from '../../utils/apiClient.js';

const SideBar = () => {
  const SideBarLinks = [
    { name: "Dashboard", to: "/profile" },
    { name: "Favourites", to: "/profile/favourites" },
  ];

  const dispatch = useDispatch();
  const history = useNavigate();

  const logoutHandler = async () => {
    try {
      await apiClient.post("logout");

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("expiryTime");
      // stopTokenMonitor();

      if (window.refreshTimeout) {
        clearTimeout(window.refreshTimeout);
      }

      dispatch(authActions.logout());

      toast.success("Logged out successfully");
      history("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
      toast.error("Logout failed. Try again.");
    }
  };

  return (
    <div className="w-full flex flex-col gap-10 md:gap-8 lg:gap-4 pr-4">
      {SideBarLinks.map((item, i) => (
        <Link key={i} to={item.to} className="hover:font-semibold">
          {item.name}
        </Link>
      ))}
      <button
        className="bg-zinc-950 text-white rounded w-full text-center py-2 hover:bg-zinc-600 transition-all duration-300"
        onClick={logoutHandler}
      >
        Logout
      </button>
    </div>
  );
};

export default SideBar;
