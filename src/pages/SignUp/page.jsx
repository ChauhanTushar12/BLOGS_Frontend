import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';


const SignUp = () => {
  const history = useNavigate();
  const backendLink = useSelector((state) => state.prod.link);

  const [Input, setInput] = useState({
    username: "",
    email: "",
    password: ""
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInput({ ...Input, [name]: value });
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:1000/api/v1/sign-up`, Input,
        {
          withCredentials: true,
        }
      );
     toast.success(res.data.message);
     history("/login");
    } catch (error) {
      toast.error(error.response.data.error);
    }finally{
      setInput({
    username: "",
    email: "",
    password: ""
  })
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-12 shadow-2xl rounded w-[80%] md:w-[60%] lg:w-[40%] flex flex-col items-center justify-center">
        <div className="text-2xl flex flex-col lg:flex-row gap-2 text-center mb-4">
          <h1 className="font-bold">Welcome!</h1>
          <span>SignUp As A New User</span>
        </div>
        <div>
          <form onSubmit={SubmitHandler} className="flex flex-col w-[100%] mt-4">
            <div className="flex flex-col mb-4">
              <label>User Name</label>
              <input
                type="text"
                value={Input.username}
                name="username"
                className="mt-2 outline-none border px-3 py-2 rounded border-zinc-200"
                required
                onChange={change}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label>User Email</label>
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
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-[100%] hover:bg-blue-700">
                SignUP
              </button>
            </div>
          </form>
          <h4 className="mt-4">
            Already Have An Account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 hover:font-semibold">
              Login
            </Link>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default SignUp;