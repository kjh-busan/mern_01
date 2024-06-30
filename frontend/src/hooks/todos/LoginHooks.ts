import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useLoginHooks = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState<string | null>(null)
    const [passwordError, setPasswordError] = useState<string | null>(null)
    const [isSignUpModalOpen, setSignUpModalOpen] = useState(false)

    const navigate = useNavigate()

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email.toLowerCase())
    }

    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/
        return passwordRegex.test(password)
    }

    const handleLogin = async () => {
        let valid = true

        if (!validateEmail(email)) {
            setEmailError('Invalid email format. Please check your email.')
            valid = false
        } else {
            setEmailError(null)
        }

        if (!validatePassword(password)) {
            setPasswordError(
                'Password must be at least 8 characters long and contain at least one letter and one number.'
            )
            valid = false
        } else {
            setPasswordError(null)
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
    }
}
