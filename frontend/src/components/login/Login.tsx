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
import { LogInProps } from '../../types/login/LoginTypes'

const LogIn = ({ onClose, onLogin }: LogInProps) => {
    const {
        username,
        setUsername,
        password,
        setPassword,
        usernameError,
        passwordError,
        handleLogin,
        handleSignUpClick,
        handleSignUpClose,
        isSignUpModalOpen,
    } = useLoginHooks(onClose, onLogin)

    return (
        <>
            <TextField
                autoFocus
                margin="dense"
                label="ID"
                type="text"
                fullWidth
                variant="standard"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={!!usernameError}
                helperText={usernameError}
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
