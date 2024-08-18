import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { useNavigate, Link,useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

const SendMoney = () => {
  const navigate = useNavigate()
    const {destinationUserId} = useParams();
    const [amount,setAmount] = useState(0);

    const [name,setName] = useState('');

    useEffect(()=>{
          axios.get(`http://localhost:3000/api/v1/user/user?userId=${destinationUserId}`).then(res=>{
            console.log(res.data);
            setName(`${res.data.user.firstName} ${res.data.user.lastName}`)
          })
      },[]);

    const transferHandler = async ()=>{
      axios.post(`http://localhost:3000/api/v1/account/transfer`,
        {
        to : destinationUserId,
        amount : amount,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      toast.success(`Rs ${amount} Transferred Successfully`);
      navigate('/dashboard');
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
              <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Send Money</h1>
              
              <div className="flex items-center mb-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-indigo-600 text-white rounded-full text-lg font-bold mr-4">
                      {name[0]}
                  </span>
                  <h2 className="text-xl font-medium text-gray-700">{name}</h2>
              </div>
              
              <p className="text-sm font-medium text-gray-700 mb-2">Amount (in Rs)</p>
              
              <input
                  type="number"
                  placeholder="Enter Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-6"
              />
              
              <button
                  onClick={transferHandler}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                  Initiate Transfer
              </button>
              <p>Don't Want to do this Transactiion? <Link to={'/dashboard'} className="text-indigo-600 hover:underline">Go Back</Link></p>
          </div>
      </div>
  )
}

export default SendMoney;
