import React from 'react'
import { Paper, Typography } from '@mui/material'
import { Header } from '../pages/1_Headers/Header'
import Footer from '../pages/9_Footers/Footer'

const Admin: React.FC = () => {
    return (
        <>
            <Header />
            <Paper style={{ padding: 16 }}>
                <Typography variant="h4" gutterBottom>
                    Admin Dashboard
                </Typography>
                <Typography variant="body1">
                    Welcome to the admin dashboard. Here you can manage various
                    aspects of the application.
                </Typography>
            </Paper>
            <Footer />
        </>
    )
}

export default Admin
