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

    const validateId = (id: string) => {
        const idRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]{5,}$/
        return idRegex.test(id.toLowerCase())
    }

    const validatePassword = (password: string) => {
        const passwordRegex =
            /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
        return passwordRegex.test(password)
    }

    const handleSignUp = () => {
        let valid = true

        if (!validateId(id)) {
            setIdError('Invalid ID format. Please check your ID.')
            valid = false
        } else {
            setIdError(null)
        }

        if (!validatePassword(password)) {
            setPasswordError(
                'Password must contain at least one letter, one number, and one special character.'
            )
            valid = false
        } else {
            setPasswordError(null)
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match.')
            valid = false
        } else {
            setConfirmPasswordError(null)
        }

        if (valid) {
            // Perform signup action (e.g., API call)
            // onClose(); // Assuming this is a function to close the signup form
        }
    }

    const onClose = () => {
        // Logic to close the signup form
    }

    return {
        id: id,
        setId,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        idError,
        passwordError,
        confirmPasswordError,
        handleSignUp,
    }
}
