// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { useDispatch, useSelector } from 'react-redux';
// import { authActions } from '../../store/authReducer.js';
// import axios from 'axios';

// const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const backendLink = useSelector((state) => state.prod.link);

//   const [input, setInput] = useState({
//     email: '',
//     password: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setInput((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(`http://localhost:1000/api/v1/log-in`,input,{ withCredentials: true });

//       const { accessToken, refreshToken, message , isAdmin } = res.data;
//       localStorage.setItem("accessToken", accessToken);
//       localStorage.setItem("refreshToken", refreshToken);
//       if (isAdmin) {
//         dispatch(authActions.adminlogin());
//       } else {
//         dispatch(authActions.login());
//       }

//       toast.success(message);
//       setInput({ email: "", password: "" });
//       navigate("/profile");
//     } catch (error) {
//       toast.error(error?.response?.data?.error || "Login failed");
//       console.error("Login error:", error?.response?.data || error);
//     }
//   };

//   return (
//     <div className="h-screen flex items-center justify-center">
//       <div className="p-12 shadow-2xl rounded w-[80%] md:w-[60%] lg:w-[40%] flex flex-col items-center">
//         <h1 className="text-2xl font-bold text-center mb-1">Welcome Again!</h1>
//         <span className="mb-6 text-center text-zinc-500">Please Login here</span>

//         <form onSubmit={handleSubmit} className="flex flex-col w-full">
//           <div className="flex flex-col mb-4">
//             <label htmlFor="email">Email</label>
//             <input
//               id="email"
//               type="email"
//               name="email"
//               value={input.email}
//               onChange={handleChange}
//               className="mt-2 outline-none border px-3 py-2 rounded border-zinc-200"
//               required
//             />
//           </div>

//           <div className="flex flex-col mb-4">
//             <label htmlFor="password">Password</label>
//             <input
//               id="password"
//               type="password"
//               name="password"
//               value={input.password}
//               onChange={handleChange}
//               className="mt-2 outline-none border px-3 py-2 rounded border-zinc-200"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition-all duration-300"
//           >
//             Login
//           </button>
//         </form>
//         <h4 className="mt-4 text-sm text-center">
//           Don't Have An Account?{' '}
//           <Link
//             to="/signup"
//             className="text-blue-600 hover:text-blue-700 hover:font-semibold"
//           >
//             Sign Up
//           </Link>
//         </h4>
//       </div>
//     </div>
//   );
// };
// export default Login;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/authReducer.js';
import apiClient from '../../utils/apiClient.js';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const backendLink = useSelector((state) => state.prod.link);

  const [input, setInput] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Using apiClient ensures token handling is consistent
      const res = await apiClient.post('log-in', input, { withCredentials: true });

      const { accessToken, refreshToken, message, isAdmin, expiryTime } = res.data;

      // Save tokens & expiry time
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("expiryTime", expiryTime);

      if (isAdmin) {
        dispatch(authActions.adminlogin());
      } else {
        dispatch(authActions.login());
      }

      toast.success(message);
      setInput({ email: "", password: "" });
      navigate("/profile");
    } catch (error) {
      toast.error(error?.response?.data?.error || "Login failed");
      console.error("Login error:", error?.response?.data || error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-12 shadow-2xl rounded w-[80%] md:w-[60%] lg:w-[40%] flex flex-col items-center">
        <h1 className="text-2xl font-bold text-center mb-1">Welcome Again!</h1>
        <span className="mb-6 text-center text-zinc-500">Please Login here</span>

        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          <div className="flex flex-col mb-4">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={input.email}
              onChange={handleChange}
              className="mt-2 outline-none border px-3 py-2 rounded border-zinc-200"
              required
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={input.password}
              onChange={handleChange}
              className="mt-2 outline-none border px-3 py-2 rounded border-zinc-200"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition-all duration-300"
          >
            Login
          </button>
        </form>

        <h4 className="mt-4 text-sm text-center">
          Don't Have An Account?{' '}
          <Link
            to="/signup"
            className="text-blue-600 hover:text-blue-700 hover:font-semibold"
          >
            Sign Up
          </Link>
        </h4>
      </div>
    </div>
  );
};

export default Login;