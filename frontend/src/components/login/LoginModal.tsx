import React from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material'
import Login from './Login'
import { LoginModalProps } from '../../types/login/LoginTypes'

const LoginModal = ({ open, onClose, onLogin }: LoginModalProps) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                <Login onLogin={onLogin} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default LoginModal
