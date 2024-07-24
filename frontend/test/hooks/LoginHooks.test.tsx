import { renderHook, act } from '@testing-library/react-hooks'
import axios from 'axios'
import { useLoginHooks } from '../../src/hooks/todos/LoginHooks'

// Mock axios
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('useLoginHooks', () => {
    const onCloseMock = jest.fn()
    const onLoginMock = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should initialize with correct default values', () => {
        const { result } = renderHook(() =>
            useLoginHooks(onCloseMock, onLoginMock)
        )

        expect(result.current.username).toBe('')
        expect(result.current.password).toBe('')
        expect(result.current.usernameError).toBeNull()
        expect(result.current.passwordError).toBeNull()
        expect(result.current.isSignUpModalOpen).toBe(false)
    })

    it('should update username and password', () => {
        const { result } = renderHook(() =>
            useLoginHooks(onCloseMock, onLoginMock)
        )

        act(() => {
            result.current.setUsername('testUser')
            result.current.setPassword('testPass1')
        })

        expect(result.current.username).toBe('testUser')
        expect(result.current.password).toBe('testPass1')
    })

    it('should validate username and password correctly', async () => {
        mockedAxios.get.mockResolvedValue({ data: { exists: true } })

        const { result } = renderHook(() =>
            useLoginHooks(onCloseMock, onLoginMock)
        )

        act(() => {
            result.current.setUsername('testUser')
            result.current.setPassword('testPass1')
        })

        await act(async () => {
            await result.current.handleLogin()
        })

        expect(result.current.usernameError).toBeNull()
        expect(result.current.passwordError).toBeNull()
        expect(onLoginMock).toHaveBeenCalledWith('testUser')
        expect(onCloseMock).toHaveBeenCalled()
    })

    it('should show error for invalid username', async () => {
        const { result } = renderHook(() =>
            useLoginHooks(onCloseMock, onLoginMock)
        )

        act(() => {
            result.current.setUsername('tu')
            result.current.setPassword('testPass1')
        })

        await act(async () => {
            await result.current.handleLogin()
        })

        expect(result.current.usernameError).toBe(
            'Invalid username format. Please check your username.'
        )
        expect(result.current.passwordError).toBeNull()
        expect(onLoginMock).not.toHaveBeenCalled()
        expect(onCloseMock).not.toHaveBeenCalled()
    })

    it('should show error for invalid password', async () => {
        const { result } = renderHook(() =>
            useLoginHooks(onCloseMock, onLoginMock)
        )

        act(() => {
            result.current.setUsername('testUser')
            result.current.setPassword('tp')
        })

        await act(async () => {
            await result.current.handleLogin()
        })

        expect(result.current.usernameError).toBeNull()
        expect(result.current.passwordError).toBe(
            'Password must be at least 4 characters long and contain at least one letter and one number.'
        )
        expect(onLoginMock).not.toHaveBeenCalled()
        expect(onCloseMock).not.toHaveBeenCalled()
    })

    it('should show error if username does not exist', async () => {
        mockedAxios.get.mockResolvedValue({ data: { exists: false } })

        const { result } = renderHook(() =>
            useLoginHooks(onCloseMock, onLoginMock)
        )

        act(() => {
            result.current.setUsername('nonexistentUser')
            result.current.setPassword('testPass1')
        })

        await act(async () => {
            await result.current.handleLogin()
        })

        expect(result.current.usernameError).toBe('USERNAME does not exist.')
        expect(result.current.passwordError).toBeNull()
        expect(onLoginMock).not.toHaveBeenCalled()
        expect(onCloseMock).not.toHaveBeenCalled()
    })

    it('should handle sign-up modal correctly', () => {
        const { result } = renderHook(() =>
            useLoginHooks(onCloseMock, onLoginMock)
        )

        act(() => {
            result.current.handleSignUpClick({
                preventDefault: () => {},
            } as React.MouseEvent)
        })

        expect(result.current.isSignUpModalOpen).toBe(true)

        act(() => {
            result.current.handleSignUpClose()
        })

        expect(result.current.isSignUpModalOpen).toBe(false)
    })
})
