/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import {
    Button,
    TextField,
    Typography,
    Link,
    DialogActions,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { LoginModalProps } from '../../types/login/LoginTypes'
import SignUp from './SignUp'

const LogIn = ({ onClose, onLogin }: LoginModalProps) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [isSignUpModalOpen, setSignUpModalOpen] = useState(false)

    const navigate = useNavigate()

    const handleLoginClick = () => {
        // 로그인 로직 처리 후 홈으로 이동
        if (onLogin) {
            onLogin()
        }
        navigate('/')
        if (onClose) {
            onClose()
        }
    }

    const handleSignUpClick = (event: React.MouseEvent) => {
        event.preventDefault()
        setSignUpModalOpen(true)
    }

    const handleSignUpClose = () => {
        setSignUpModalOpen(false)
    }

    return (
        <>
            <TextField
                autoFocus
                margin="dense"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!emailError}
                helperText={emailError}
            />
            <TextField
                margin="dense"
                label="Password"
                type="password"
                fullWidth
                variant="standard"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!passwordError}
                helperText={passwordError}
            />
            <Typography variant="body2">
                Do not have an account?
                <Link href="#" onClick={handleSignUpClick}>
                    Sign up
                </Link>
            </Typography>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleLoginClick}>Log in</Button>
            </DialogActions>

            <SignUp open={isSignUpModalOpen} onClose={handleSignUpClose} />
        </>
    )
}

export default LogIn
