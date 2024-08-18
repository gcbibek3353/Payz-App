import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import EditProfile from './pages/EditProfile.jsx'
import SendMoney from './components/SendMoney.jsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<SignUp />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/edit' element={<EditProfile />} />
        <Route path="/sendMoney/:destinationUserId" element={<SendMoney />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
