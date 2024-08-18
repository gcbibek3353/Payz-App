import React from 'react'
import AppBar from '../components/AppBar.jsx'
import Balance from '../components/Balance.jsx'
import Users from '../components/Users.jsx'

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AppBar />
      <div className="p-6">
        <Balance value={1000} />
        <Users />
      </div>
    </div>
  )
}

export default Dashboard
