import { renderHook, act } from '@testing-library/react-hooks'
import axios from 'axios'
import { Provider } from 'jotai'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { useSignUpHooks } from '../../src/hooks/todos/SignUpHooks'

// Mock axios
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

// Test Wrapper Component
const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const root = createRoot(container)
    root.render(<Provider>{children}</Provider>)
    return null
}

describe('useSignUpHooks', () => {
    const onCloseMock = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should initialize with correct default values', () => {
        const { result } = renderHook(() => useSignUpHooks(onCloseMock), {
            wrapper: Wrapper,
        })

        expect(result.current.username).toBe('')
        expect(result.current.password).toBe('')
        expect(result.current.confirmPassword).toBe('')
        expect(result.current.usernameError).toBeNull()
        expect(result.current.passwordError).toBeNull()
        expect(result.current.confirmPasswordError).toBeNull()
        expect(result.current.snackbarOpen).toBe(false)
        expect(result.current.snackbarSeverity).toBe('success')
        expect(result.current.snackbarMessage).toBe('')
    })

    it('should update username, password, and confirmPassword', () => {
        const { result } = renderHook(() => useSignUpHooks(onCloseMock), {
            wrapper: Wrapper,
        })

        act(() => {
            result.current.setUsername('testUser')
            result.current.setPassword('Test@123')
            result.current.setConfirmPassword('Test@123')
        })

        expect(result.current.username).toBe('testUser')
        expect(result.current.password).toBe('Test@123')
        expect(result.current.confirmPassword).toBe('Test@123')
    })

    it('should validate and sign up successfully', async () => {
        mockedAxios.get.mockResolvedValue({ data: { exists: false } })
        mockedAxios.post.mockResolvedValue({ status: 201 })

        const { result } = renderHook(() => useSignUpHooks(onCloseMock), {
            wrapper: Wrapper,
        })

        act(() => {
            result.current.setUsername('testUser')
            result.current.setPassword('Test@123')
            result.current.setConfirmPassword('Test@123')
        })

        await act(async () => {
            const success = await result.current.handleSignUp()
            expect(success).toBe(true)
        })

        expect(result.current.usernameError).toBeNull()
        expect(result.current.passwordError).toBeNull()
        expect(result.current.confirmPasswordError).toBeNull()
        expect(result.current.snackbarSeverity).toBe('success')
        expect(result.current.snackbarMessage).toBe('Sign up successful!')
        expect(result.current.snackbarOpen).toBe(true)
        expect(onCloseMock).toHaveBeenCalled()
    })

    it('should show error for invalid username', async () => {
        const { result } = renderHook(() => useSignUpHooks(onCloseMock), {
            wrapper: Wrapper,
        })

        act(() => {
            result.current.setUsername('tu')
            result.current.setPassword('Test@123')
            result.current.setConfirmPassword('Test@123')
        })

        await act(async () => {
            const success = await result.current.handleSignUp()
            expect(success).toBe(false)
        })

        expect(result.current.usernameError).toBe(
            'Invalid username format. Please check your username.'
        )
        expect(result.current.passwordError).toBeNull()
        expect(result.current.confirmPasswordError).toBeNull()
        expect(result.current.snackbarSeverity).toBe('error')
        expect(result.current.snackbarMessage).toBe(
            'Sign up failed. Please check your details.'
        )
        expect(result.current.snackbarOpen).toBe(true)
        expect(onCloseMock).not.toHaveBeenCalled()
    })

    it('should show error for invalid password', async () => {
        const { result } = renderHook(() => useSignUpHooks(onCloseMock), {
            wrapper: Wrapper,
        })

        act(() => {
            result.current.setUsername('testUser')
            result.current.setPassword('test')
            result.current.setConfirmPassword('test')
        })

        await act(async () => {
            const success = await result.current.handleSignUp()
            expect(success).toBe(false)
        })

        expect(result.current.usernameError).toBeNull()
        expect(result.current.passwordError).toBe(
            'Password must contain at least one letter, one number, and one special character.'
        )
        expect(result.current.confirmPasswordError).toBeNull()
        expect(result.current.snackbarSeverity).toBe('error')
        expect(result.current.snackbarMessage).toBe(
            'Sign up failed. Please check your details.'
        )
        expect(result.current.snackbarOpen).toBe(true)
        expect(onCloseMock).not.toHaveBeenCalled()
    })

    it('should show error for non-matching passwords', async () => {
        const { result } = renderHook(() => useSignUpHooks(onCloseMock), {
            wrapper: Wrapper,
        })

        act(() => {
            result.current.setUsername('testUser')
            result.current.setPassword('Test@123')
            result.current.setConfirmPassword('Test@124')
        })

        await act(async () => {
            const success = await result.current.handleSignUp()
            expect(success).toBe(false)
        })

        expect(result.current.usernameError).toBeNull()
        expect(result.current.passwordError).toBeNull()
        expect(result.current.confirmPasswordError).toBe(
            'Passwords do not match.'
        )
        expect(result.current.snackbarSeverity).toBe('error')
        expect(result.current.snackbarMessage).toBe(
            'Sign up failed. Please check your details.'
        )
        expect(result.current.snackbarOpen).toBe(true)
        expect(onCloseMock).not.toHaveBeenCalled()
    })

    it('should handle snackbar close', () => {
        const { result } = renderHook(() => useSignUpHooks(onCloseMock), {
            wrapper: Wrapper,
        })

        act(() => {
            result.current.setSnackbarOpen(true)
        })

        act(() => {
            result.current.handleSnackbarClose()
        })

        expect(result.current.snackbarOpen).toBe(false)
    })
})

export {} // 빈 export 추가
