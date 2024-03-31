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
import DiceBeginner from './pages/DiceBeginner'
import DiceAutomation from './pages/DiceAutomation'
import DiceStrategy from './pages/DiceStrategy'
import CrashBeginner from './pages/CrashBeginner'
import CrashAutomation from './pages/CrashAutomation'
import CrashStrategy from './pages/CrashStrategy'
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
      <Route path="/dicebeginner" element={<DiceBeginner />} />
      <Route path="/dicestrategy" element={<DiceStrategy />} />
      <Route path="/diceautomation" element={<DiceAutomation />} />
      <Route path="/crashbeginner" element={<CrashBeginner />} />
      <Route path="/crashstrategy" element={<CrashStrategy />} />
      <Route path="/crashautomation" element={<CrashAutomation />} />

      {/* <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Home/>}/>
      </Route> */}

      </Routes>
    </Router>
  )
}

export default App
