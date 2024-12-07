import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function ProtectedLayout() {
    const { currentUser, loading } = useAuth();
    
    if (loading) {
        return <div>Loading... </div>
    }

    if (!currentUser) {
        return <Navigate to="/not-logged-in" replace/>
    }

    return <Outlet />
}

export default ProtectedLayout;