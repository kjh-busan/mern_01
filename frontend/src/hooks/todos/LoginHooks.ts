import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const useLoginHooks = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usernameError, setUsernameError] = useState<string | null>(null)
    const [passwordError, setPasswordError] = useState<string | null>(null)
    const [isSignUpModalOpen, setSignUpModalOpen] = useState(false)

    const navigate = useNavigate()

    const validateUsername = (username: string) => {
        const usernameRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return usernameRegex.test(username.toLowerCase())
    }

    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d@$!%*#?&]{4,}$/
        return passwordRegex.test(password)
    }

    const checkUsernameExists = async (username: string) => {
        try {
            const response = await axios.get('/api/check-username', {
                params: { username: username },
            })
            return response.data.exists
        } catch (error) {
            console.error('Failed to check ID:', error)
            return false
        }
    }

    const handleLogin = async () => {
        let valid = true

        if (!validateUsername(username)) {
            setUsernameError(
                'Invalid username format. Please check your username.'
            )
            valid = false
        } else {
            setUsernameError(null)
        }

        if (!validatePassword(password)) {
            setPasswordError(
                'Password must be at least 8 characters long and contain at least one letter and one number.'
            )
            valid = false
        } else {
            setPasswordError(null)
        }

        const usernameExists = await checkUsernameExists(username)
        if (!usernameExists) {
            setUsernameError('ID does not exist.')
            return false
        }

        if (valid) {
            // Perform login action (e.g., API call)
            try {
                // Simulate API call with timeout
                await new Promise((resolve) => setTimeout(resolve, 1000))
                navigate('/') // Login successful, navigate to home
                return true
            } catch (error) {
                console.error('Failed to log in:', error)
                return false
            }
        } else {
            return false
        }
    }

    const handleSignUpClick = (event: React.MouseEvent) => {
        event.preventDefault()
        setSignUpModalOpen(true)
    }

    const handleSignUpClose = () => {
        setSignUpModalOpen(false)
    }

    return {
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
    }
}
