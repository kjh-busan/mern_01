import React from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Alert,
    Snackbar,
} from '@mui/material'
import { useSignUpHooks } from '../../hooks/todos/SignUpHooks'

const SignUp = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const {
        id,
        setId,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        idError,
        passwordError,
        confirmPasswordError,
        handleSignUp,
        snackbarOpen,
        snackbarSeverity,
        snackbarMessage,
        handleSnackbarClose,
    } = useSignUpHooks()

    const handleSignUpClick = async () => {
        const result = await handleSignUp()

        if (result) {
            onClose()
        }
    }

    return (
        <>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Sign Up</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="ID"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        error={!!idError}
                        helperText={idError}
                    />
                    <TextField
                        key="password-input"
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
                        key="confirm-password-input"
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
                    <Button onClick={handleSignUpClick}>Sign up</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default SignUp
