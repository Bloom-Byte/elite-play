import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import PrivateRoutes from './utils/PrivateRoutes'
import './App.css'

function App() {

  return (
    <Router> 
      <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>

      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Home/>}/>
      </Route>

      </Routes>
    </Router>
  )
}

export default App
