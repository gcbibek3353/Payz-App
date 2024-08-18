import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignIn = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate('')


  const loginHandler = async () => {
    const response = await axios.post('http://localhost:3000/api/v1/user/signin',{userName,password});
    console.log(response.data);
    localStorage.setItem("token",response.data.token);
    toast.success("Successfully Logged In");
    navigate('/dashboard');
  }

  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
              <h2 className="text-2xl font-bold mb-4 text-center">Sign In Form</h2>
              <p className="text-gray-600 mb-6 text-center">Enter your credentials to Login</p>

              <div className="mb-4">
                  <label htmlFor="userName" className="block text-sm font-medium text-gray-700">User Name</label>
                  <input
                      type="text"
                      placeholder="johndoe@gmail.com"
                      id="userName"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
              </div>

              <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                      type="password"
                      placeholder="••••••••"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
              </div>

              <button
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={loginHandler}
              >
                  Sign In
              </button>

              <p className="mt-4 text-center text-gray-600">
                  Don't have an account? <Link to="/signup" className="text-indigo-600 hover:underline">Sign Up</Link>
              </p>
          </div>
      </div>
  );
}


export default SignIn
