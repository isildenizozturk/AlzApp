import React from 'react'
import { AuthContext, AuthProvider } from './AuthProvider';
import Routes from "./Routes"

const Providers = () => {
    return (
        <AuthProvider>
            <Routes></Routes>
        </AuthProvider>
        
        
    )
}
export default Providers;