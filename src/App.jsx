import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

import MainLayout from './layout/Mainlayout.jsx';
import OtherLayout from './layout/OtherLayout.jsx';

import Home from './pages/Home/page';
import Login from './pages/Login/page.jsx';
import SignUp from './pages/SignUp/page.jsx';
import Profile from './pages/Profile/page.jsx';
import AllBlogs from './pages/All Blogs/page.jsx';
import DashboardProfile from './components/Profile/DashboardProfile.jsx';
import Favourites from './components/Profile/Favourites.jsx';
import Description from './pages/Description/Description.jsx';
import Categories from './pages/Categories/Categories.jsx';
import AdminLogin from './pages/Admin Login/AdminLogin.jsx';
import AdminDashboard from './pages/AdminDashboard/page.jsx';
import DashBoard from './components/Admin Components/Dashboard/DashBoard.jsx';
import Addblogs from './components/Admin Components/Add blog/Addblogs.jsx';
import EditBlogs from './components/Admin Components/Edit Blog/EditBlogs.jsx';
import UpdateBlog from './components/Admin Components/Edit Blog/Compo/UpdateBlog.jsx';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const backendLink = useSelector((state) => state.prod.link);
  const dispatch = useDispatch();

  useEffect(() => {
  // const init = async () => {
  //   try {
  //     const res = await axios.get(`${backendLink}/api/v1/check-cookie`, {
  //       withCredentials: true,
  //     });
  //   } catch (err) {
  //     console.log("Initial auth check failed:", err.message);
  //   }
  // };

  // init();
}, [backendLink, dispatch]);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/all-blogs" element={<AllBlogs />} />
          <Route path="/description/:id" element={<Description />} />
          <Route path="/cat/:id" element={<Categories />} />
          <Route path="/profile" element={<Profile />}>
            <Route index element={<DashboardProfile />} />
            <Route path="/profile/favourites" element={<Favourites />} />
          </Route>
        </Route>

        <Route element={<OtherLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />}>
            <Route index element={<DashBoard />} />
            <Route path="/admin-dashboard/add-blogs" element={<Addblogs />} />
            <Route path="/admin-dashboard/edit-blogs" element={<EditBlogs />} />
            <Route path="/admin-dashboard/update-blog/:id" element={<UpdateBlog />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;