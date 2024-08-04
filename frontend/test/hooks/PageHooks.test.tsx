import { renderHook, act } from '@testing-library/react-hooks'
import { Provider } from 'jotai'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { usePageHooks } from '../../src/hooks/pages/PageHooks'

// Test Wrapper Component
const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const root = createRoot(container)
    root.render(<Provider>{children}</Provider>)
    return null
}

describe('usePageHooks', () => {
    it('should initialize with correct default values', () => {
        const { result } = renderHook(() => usePageHooks(), {
            wrapper: Wrapper,
        })

        expect(result.current.username).toBeNull()
        expect(result.current.isLoginModalOpen).toBe(false)
    })

    it('should handle login correctly', () => {
        const { result } = renderHook(() => usePageHooks(), {
            wrapper: Wrapper,
        })

        act(() => {
            result.current.onLogin('testUser')
        })

        expect(result.current.username).toBe('testUser')
        expect(result.current.isLoginModalOpen).toBe(false)
    })

    it('should handle logout correctly', () => {
        const { result } = renderHook(() => usePageHooks(), {
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

    it('should handle open and close login modal correctly', () => {
        const { result } = renderHook(() => usePageHooks(), {
            wrapper: Wrapper,
        })

        act(() => {
            result.current.handleOpenLoginModal()
        })

        expect(result.current.isLoginModalOpen).toBe(true)

        act(() => {
            result.current.handleCloseLoginModal()
        })

        expect(result.current.isLoginModalOpen).toBe(false)
    })
})

export {} // 빈 export 추가
