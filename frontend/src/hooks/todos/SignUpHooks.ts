import axios from 'axios'
import { useState } from 'react'

export const useSignUpHooks = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [usernameError, setUsernameError] = useState<string | null>(null)
    const [passwordError, setPasswordError] = useState<string | null>(null)
    const [confirmPasswordError, setConfirmPasswordError] = useState<
        string | null
    >(null)
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarSeverity, setSnackbarSeverity] = useState<
        'success' | 'error'
    >('success')
    const [snackbarMessage, setSnackbarMessage] = useState('')

    const validateUsername = (username: string) => {
        const usernameRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]{3,}$/
        return usernameRegex.test(username.toLowerCase())
    }

    const validatePassword = (password: string) => {
        const passwordRegex =
            /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{4,}$/
        return passwordRegex.test(password)
    }

    const checkUsernameExists = async (username: string) => {
        try {
            const response = await axios.get(
                'http://localhost:5001/api/login/check-username',
                {
                    params: { username },
                }
            )
            return response.data.exists
        } catch (error) {
            console.error('Failed to check username:', error)
            return false
        }
    }

    const handleSignUp = async () => {
        let valid = true

        setUsernameError(null)
        setPasswordError(null)
        setConfirmPasswordError(null)

        if (!validateUsername(username)) {
            setUsernameError(
                'Invalid username format. Please check your username.'
            )
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
            try {
                const usernameExists = await checkUsernameExists(username)
                if (usernameExists) {
                    setUsernameError(
                        'Username already exists. Please choose another one.'
                    )
                    return false
                }

                const response = await axios.post('/api/signup', {
                    username,
                    password,
                    title: 'sign up',
                    contents: 'sign up',
                    likeCount: 0,
                    completed: false,
                    time: new Date().toISOString(),
                })

                if (response.status === 201) {
                    setUsername('')
                    setPassword('')
                    setConfirmPassword('')
                    setSnackbarSeverity('success')
                    setSnackbarMessage('Sign up successful!')
                    setSnackbarOpen(true)
                    return true
                }
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
        username,
        setUsername,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        usernameError,
        passwordError,
        confirmPasswordError,
        handleSignUp,
        snackbarOpen,
        snackbarSeverity,
        snackbarMessage,
        handleSnackbarClose,
    }
}
