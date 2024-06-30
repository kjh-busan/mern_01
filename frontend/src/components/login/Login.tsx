import React from 'react'
import {
    Button,
    TextField,
    Typography,
    Link,
    DialogActions,
} from '@mui/material'
import { useLoginHooks } from '../../hooks/todos/LoginHooks'
import SignUp from './SignUp'

const LogIn = () => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        emailError,
        passwordError,
        handleLogin,
        handleSignUpClick,
        handleSignUpClose,
        isSignUpModalOpen,
    } = useLoginHooks()

    return (
        <>
            <TextField
                autoFocus
                margin="dense"
                label="ID"
                type="text"
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
                <Button onClick={handleLogin}>Log in</Button>
            </DialogActions>

            <SignUp open={isSignUpModalOpen} onClose={handleSignUpClose} />
        </>
    )
}

export default LogIn
