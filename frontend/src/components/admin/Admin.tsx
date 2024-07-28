import React from 'react'
import { Paper, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AdminHeader from '../pages/1_Headers/AdminHeader'

const Admin: React.FC = () => {
    const navigate = useNavigate()

    const handleBackClick = () => {
        navigate(-1) // 이전 페이지로 돌아갑니다.
    }

    return (
        <div>
            <AdminHeader />
            <Paper style={{ padding: 16, marginTop: 16 }}>
                <Typography variant="h4" gutterBottom>
                    Admin Dashboard
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Welcome to the admin dashboard. Here you can manage various
                    aspects of the application.
                </Typography>
            </Paper>
        </div>
    )
}

export default Admin
