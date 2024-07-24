// test/atoms/usernameAtom.test.ts
import { Provider, useAtom } from 'jotai'
import { renderHook, act } from '@testing-library/react-hooks'
import { usernameAtom } from '../../src/atoms/atoms'

describe('usernameAtom', () => {
    it('should have initial state as null', () => {
        const { result } = renderHook(() => useAtom(usernameAtom), {
            wrapper: Provider,
        })

        const [username] = result.current
        expect(username).toBeNull()
    })

    it('should update the username state', () => {
        const { result } = renderHook(() => useAtom(usernameAtom), {
            wrapper: Provider,
        })

        const [, setUsername] = result.current

        act(() => {
            setUsername('new_user')
        })

        const [username] = result.current
        expect(username).toBe('new_user')
    })
})
