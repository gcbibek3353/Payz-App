import React,{useState} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


const SignUp = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = async ()=>{
        // e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/v1/user/signUp',{firstName,lastName,userName,password});
            // console.log(response.data.token);
            localStorage.setItem("token",response.data.token);
            // console.log(localStorage.getItem(token));
            toast.success("Successfully Registered and Logged In");
            navigate('/dashboard');
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4 text-center">Sign Up Form</h2>
                <p className="text-gray-600 mb-6 text-center">Enter your Details to Create an Account</p>
                
                <div className="mb-4">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                        type="text"
                        placeholder="John"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                
                <div className="mb-4">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                        type="text"
                        placeholder="Doe"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                
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
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={()=>submitHandler()}
                >
                    Sign Up
                </button>

                <p>Already have an account ? <Link to={'/signin'} className="text-indigo-600 hover:underline">Login</Link></p>
                </div>
        </div>
    );
};

export default SignUp;