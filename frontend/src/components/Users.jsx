import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';

const Users = () => {
    const [filter, setFilter] = useState('');
    const [users,setUsers] = useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`).then(res=>{
          setUsers(res.data.users);
        })
    },[filter]);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mt-6">
            <h2 className="text-xl font-semibold mb-4">Users</h2>
            <input
              type="text"
              placeholder='Search Users...'
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            />

            <div className="space-y-4">
                    {
                        users.map(user=>(<div key={user._id} className="flex items-center justify-between p-2 border-b border-gray-200">
                            <div className="flex items-center space-x-2">
                            <span className="bg-indigo-600 text-white font-bold rounded-full h-8 w-8 flex items-center justify-center">{user.firstName[0]}</span>
                            <p>{user.firstName} {user.lastName}</p>
                            </div>
                            <Link to={`/sendMoney/${user._id}`} className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700">Send Money</Link>
                        </div>))
                    }
                
            </div>
        </div>
    )
}


export default Users
