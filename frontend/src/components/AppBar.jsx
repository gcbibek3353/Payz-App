import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AppBar = () => {
  const navigate = useNavigate();
  const [name,setName] = useState('');

  useEffect(()=>{
    axios.get(`http://localhost:3000/api/v1/user/me`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res=>{
      setName(`${res.data.user.firstName} ${res.data.user.lastName}`);
    })
},[]);

  


  return (
   <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
    <h1 className="text-2xl font-bold">Payz App</h1>
    <div className="flex items-center space-x-4">
        <span className="text-lg">{name}</span>
        <span className="bg-white text-indigo-600 font-bold rounded-full h-8 w-8 flex items-center justify-center">
            <Link to='/edit'>{name[0]}</Link>
        </span>
        <button 
            onClick={() => {
                localStorage.removeItem('token');
                toast.success('Logged Out')
                navigate('/signup');
            }} 
            className="bg-white text-indigo-600 font-semibold px-3 py-1 rounded-md hover:bg-indigo-100 transition-colors duration-200"
        >
            Logout
        </button>
    </div>
</div>

  )
}


export default AppBar;
