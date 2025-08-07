import React from 'react';
import Sidebar from '../../components/Admin Components/Sidebar/Sidebar.jsx';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/6 fixed h-screen border-r bg-white z-10">
        <Sidebar />
      </div>

      {/* Spacer to offset the fixed sidebar */}
      <div className="w-1/6"></div>

      {/* Main Content */}
      <div className="w-5/6 bg-zinc-200 min-h-screen p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;