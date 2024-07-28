import React from 'react'
import { Typography, Button, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const ErrorPage: React.FC = () => {
    const navigate = useNavigate()

    const handleBackClick = () => {
        navigate('/')
    }

    return (
        <Container style={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="h3" gutterBottom>
                500 Internal Server Error
            </Typography>
            <Typography variant="body1" gutterBottom>
                An error occurred. Please try again later.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleBackClick}
            >
                Go Back to Home
            </Button>
        </Container>
    )
}

export default ErrorPage
