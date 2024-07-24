import { renderHook, act } from '@testing-library/react-hooks'
import { Provider, atom, useAtom } from 'jotai'
import React from 'react'
import { createRoot } from 'react-dom/client'

const usernameAtom = atom<string | null>(null)

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<Provider>{children}</Provider>)
    return <>{children}</>
}

describe('usernameAtom', () => {
    it('should have initial state as null', () => {
        const { result } = renderHook(() => useAtom(usernameAtom), {
            wrapper: Wrapper,
        })
        const [username] = result.current
        expect(username).toBeNull()
    })

    it('should update the username state', () => {
        const { result } = renderHook(() => useAtom(usernameAtom), {
            wrapper: Wrapper,
        })
        const [, setUsername] = result.current

        act(() => {
            setUsername('newUsername')
        })

        const [username] = result.current
        expect(username).toBe('newUsername')
    })
})
