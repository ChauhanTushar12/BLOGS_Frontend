import React, { useState } from 'react';
import { VscThreeBars } from "react-icons/vsc";
import { RxCross2 } from "react-icons/rx";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const baseLinks = [
    { name: "Home", to: "/" },
    { name: "All Category", to: "/all-blogs" },
    ...(isLoggedIn
      ? [{ name: "Profile", to: "/profile" }]
      : [{ name: "Login", to: "/login" }])
  ];

  const [mobileNav, setMobileNav] = useState(false);

  return (
    <nav className="flex items-center justify-between py-4 bg-gray-100 border-b-2 border-zinc-200">
      {/* Brand */}
      <div className="w-3/6 lg:w-2/6 brandName">
        <Link to="/" className="text-xl font-bold m-2">Entertainment Hub</Link>
      </div>

      {/* Desktop Links */}
      <div className="w-4/6 hidden lg:flex items-center justify-end gap-2">
        {baseLinks.map((item, i) => (
          <Link
            className="ms-4 text-gray-700 hover:text-blue-500 duration-300"
            key={i}
            to={item.to}
          >
            {item.name}
          </Link>
        ))}
        {!isLoggedIn && (
          <Link
            className="ms-4 mr-2 text-gray-700 hover:text-blue-500 duration-300"
            to="/signup"
          >
            SignUp
          </Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="w-3/6 flex lg:hidden items-center justify-end">
        <button
          className="text-3xl"
          onClick={() => setMobileNav(!mobileNav)}
        >
          {mobileNav ? <RxCross2 /> : <VscThreeBars />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`fixed top-0 left-0 nav-bg h-screen w-full backdrop-blur-md p-8 
        ${mobileNav ? "flex flex-col translate-y-[0%]" : "hidden translate-y-[-100%]"} 
        transition-all duration-300`}
      >
        <div className="h-[100%] flex flex-col items-center justify-center">
          {baseLinks.map((item, i) => (
            <Link
              className="mb-8 text-4xl text-gray-700 hover:text-blue-500 duration-300"
              key={i}
              to={item.to}
              onClick={() => setMobileNav(false)}
            >
              {item.name}
            </Link>
          ))}
          {!isLoggedIn && (
            <Link
              className="text-4xl text-gray-700 ms-4 mr-2 hover:text-blue-500 duration-300"
              to="/signup"
              onClick={() => setMobileNav(false)}
            >
              SignUp
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;