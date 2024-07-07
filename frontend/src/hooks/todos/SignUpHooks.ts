import { useState } from 'react'

export const useSignUpHooks = () => {
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [idError, setIdError] = useState<string | null>(null)
    const [passwordError, setPasswordError] = useState<string | null>(null)
    const [confirmPasswordError, setConfirmPasswordError] = useState<
        string | null
    >(null)
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarSeverity, setSnackbarSeverity] = useState<
        'success' | 'error'
    >('success')
    const [snackbarMessage, setSnackbarMessage] = useState('')

    const validateId = (id: string) => {
        const idRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]{3,}$/
        return idRegex.test(id.toLowerCase())
    }

    const validatePassword = (password: string) => {
        const passwordRegex =
            /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
        return passwordRegex.test(password)
    }

    const handleSignUp = async () => {
        let valid = true

        setIdError(null)
        setPasswordError(null)
        setConfirmPasswordError(null)

        if (!validateId(id)) {
            setIdError('Invalid ID format. Please check your ID.')
            valid = false
        }

        if (!validatePassword(password)) {
            setPasswordError(
                'Password must contain at least one letter, one number, and one special character.'
            )
            valid = false
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match.')
            valid = false
        }

        if (valid) {
            // Perform signup action (e.g., API call)
            try {
                // Simulate API call with timeout
                await new Promise((resolve) => setTimeout(resolve, 1000))
                // Clear inputs on successful signup
                setId('')
                setPassword('')
                setConfirmPassword('')
                setSnackbarSeverity('success')
                setSnackbarMessage('Sign up successful!')
                setSnackbarOpen(true)
                return true
            } catch (error) {
                console.error('Failed to sign up:', error)
                setSnackbarSeverity('error')
                setSnackbarMessage('Sign up failed. Please try again.')
                setSnackbarOpen(true)
                return false
            }
        } else {
            setSnackbarSeverity('error')
            setSnackbarMessage('Sign up failed. Please check your details.')
            setSnackbarOpen(true)
            return false
        }
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false)
    }

    return {
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
    }
}
