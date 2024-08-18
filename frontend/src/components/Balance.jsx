import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Balance = () => {
  const [balance,setBalance] = useState(0);

  useEffect(()=>{
    axios.get(`http://localhost:3000/api/v1/account/balance`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res=>{
      setBalance(res.data.balance);
    })
},[]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-6">
      <p className="text-lg">Your Balance is <span className="font-bold">Rs. {balance}</span></p>
    </div>
  )
}


export default Balance
