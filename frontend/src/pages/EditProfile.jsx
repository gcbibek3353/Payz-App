import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { useNavigate,Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditProfile = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');

    useEffect(()=>{
        axios.get(`http://localhost:3000/api/v1/user/me`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }).then(res=>{
            setFirstName(res.data.user.firstName);
            setLastName(res.data.user.lastName);
            setPassword(res.data.user.password);
        })
    },[]);


    const editHandler = async ()=>{
        axios.put(`http://localhost:3000/api/v1/user/`,{
            firstName,
            lastName,
            password
        },{
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          toast.success("Edited Successfully");
          navigate('/dashboard');
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4 text-center">Edit Your Profile </h2>
                <p className="text-gray-600 mb-6 text-center">Edit your Details</p>

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
                    onClick={() => editHandler()}
                >
                   Save 
                </button>

                <p>Do not want to Edit Details? <Link to={'/dashboard'} className="text-indigo-600 hover:underline">Go Back</Link></p>
            </div>
        </div>
    );
}

export default EditProfile;
