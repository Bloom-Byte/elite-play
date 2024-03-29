import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Dice from './pages/Dice'
import Crash from './pages/Crash'
import Wallet from './pages/Wallet'
import HelpCenter from './pages/HelpCenter'
import AccountSettings from './pages/AccountSettings'
import Referral from './pages/Referral'
import PrivateRoutes from './utils/PrivateRoutes'
import './App.css'

function App() {

  return (
    <Router> 
      <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/dice" element={<Dice/>}/>
      <Route path="/crash" element={<Crash/>}/>
      <Route path="/wallet" element={<Wallet/>}/>
      <Route path="/helpcenter" element={<HelpCenter/>}/>
      <Route path="/accountsettings" element={<AccountSettings/>}/>
      <Route path="/referrals" element={<Referral />} />

      {/* <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Home/>}/>
      </Route> */}

      </Routes>
    </Router>
  )
}

export default App
