/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

const SignUp = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')

    const handleSignUp = () => {
        // 회원가입 로직을 여기에 추가하세요
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Sign Up</DialogTitle>
            <DialogContent>
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
                <TextField
                    margin="dense"
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    variant="standard"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={!!confirmPasswordError}
                    helperText={confirmPasswordError}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSignUp}>Sign up</Button>
            </DialogActions>
        </Dialog>
    )
}

export default SignUp
