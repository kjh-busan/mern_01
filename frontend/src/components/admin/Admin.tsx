import React from 'react'
import { Paper, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AdminHeader from '../pages/1_Headers/AdminHeader'
import AdminStats from './AdminStats'

const Admin: React.FC = () => {
    const navigate = useNavigate()

    const handleBackClick = () => {
        navigate(-1)
    }

    return (
        <div>
            <AdminHeader />
            <AdminStats />
        </div>
    )
}

export default Admin
