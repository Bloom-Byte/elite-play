import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    const user = false; // Replace with your authentication logic

    return user ? <Outlet/> : <Navigate to="/login"/>
}