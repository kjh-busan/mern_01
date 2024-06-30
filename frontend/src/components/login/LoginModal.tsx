import React from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material'
import { LoginModalProps } from '../../types/login/LoginTypes'
import LogIn from './Login'

const LoginModal = ({ open, onClose, onLogin }: LoginModalProps) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                <LogIn />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default LoginModal
