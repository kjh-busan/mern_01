import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useLoginHooks = () => {
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const [idError, setIdError] = useState<string | null>(null)
    const [passwordError, setPasswordError] = useState<string | null>(null)
    const [isSignUpModalOpen, setSignUpModalOpen] = useState(false)

    const navigate = useNavigate()

    const validateId = (id: string) => {
        const idRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return idRegex.test(id.toLowerCase())
    }

    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/
        return passwordRegex.test(password)
    }

    const handleLogin = async () => {
        let valid = true

        if (!validateId(id)) {
            setIdError('Invalid id format. Please check your id.')
            valid = false
        } else {
            setIdError(null)
        }

        if (!validatePassword(password)) {
            setPasswordError(
                'Password must be at least 8 characters long and contain at least one letter and one number.'
            )
            valid = false
        } else {
            setPasswordError(null)
        }

        /**
         * TODO: check
         *
         */
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
        id,
        setId,
        password,
        setPassword,
        idError,
        passwordError,
        handleLogin,
        handleSignUpClick,
        handleSignUpClose,
        isSignUpModalOpen,
    }
}
