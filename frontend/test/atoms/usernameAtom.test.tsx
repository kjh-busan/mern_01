import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { Provider, useAtom } from 'jotai'
import { usernameAtom } from '../../src/atoms/atoms'
import { createRoot } from 'react-dom/client'

const Wrapper: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const container = document.createElement('div')
    document.body.appendChild(container)
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
        setUsername('testUser')
        const [username] = result.current
        expect(username).toBe('testUser')
    })
})
