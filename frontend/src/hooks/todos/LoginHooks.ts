import { useState } from 'react'
import axios from 'axios'

export const useLoginHooks = (
    onClose: () => void,
    onLogin: (username: string) => void
) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usernameError, setUsernameError] = useState<string | null>(null)
    const [passwordError, setPasswordError] = useState<string | null>(null)
    const [isSignUpModalOpen, setSignUpModalOpen] = useState(false)

    const validateUsername = (username: string) => {
        const usernameRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]{3,}$/
        return usernameRegex.test(username.toLowerCase())
    }

    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d@$!%*#?&]{4,}$/
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
                'Password must be at least 4 characters long and contain at least one letter and one number.'
            )
            valid = false
        } else {
            setPasswordError(null)
        }

        const usernameExists = await checkUsernameExists(username)
        if (!usernameExists) {
            console.log(`USERNAME does not exist: ${username}`)
            setUsernameError('USERNAME does not exist.')
            return false
        }

        if (valid) {
            try {
                await new Promise((resolve) => setTimeout(resolve, 1000))
                onLogin(username)
                onClose()
                setUsername('')
                setPassword('')
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
