import { renderHook, act } from '@testing-library/react-hooks'
import { Provider } from 'jotai'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { useHeaderHooks } from '../../src/hooks/todos/HeaderHooks'

// Test Wrapper Component
const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const root = createRoot(container)
    root.render(<Provider>{children}</Provider>)
    return null
}

describe('useHeaderHooks', () => {
    it('should initialize with correct default values', () => {
        const { result } = renderHook(() => useHeaderHooks(), {
            wrapper: Wrapper,
        })

        expect(result.current.username).toBeNull()
        expect(result.current.isLoginModalOpen).toBe(false)
    })

    it('should handle login click correctly', () => {
        const { result } = renderHook(() => useHeaderHooks(), {
            wrapper: Wrapper,
        })

        act(() => {
            result.current.handleLoginClick()
        })

        expect(result.current.isLoginModalOpen).toBe(true)
    })

    it('should handle close correctly', () => {
        const { result } = renderHook(() => useHeaderHooks(), {
            wrapper: Wrapper,
        })

        act(() => {
            result.current.handleLoginClick()
        })

        act(() => {
            result.current.handleClose()
        })

        expect(result.current.isLoginModalOpen).toBe(false)
    })

    it('should handle login correctly', () => {
        const { result } = renderHook(() => useHeaderHooks(), {
            wrapper: Wrapper,
        })

        act(() => {
            result.current.onLogin('testUser')
        })

        expect(result.current.username).toBe('testUser')
        expect(result.current.isLoginModalOpen).toBe(false)
    })

    it('should handle logout correctly', () => {
        const { result } = renderHook(() => useHeaderHooks(), {
            wrapper: Wrapper,
        })

        act(() => {
            result.current.onLogin('testUser')
        })

        act(() => {
            result.current.onLogout()
        })

        expect(result.current.username).toBeNull()
    })
})

export {} // 빈 export 추가
