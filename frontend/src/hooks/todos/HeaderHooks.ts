import { useAtom } from 'jotai'
import { useState } from 'react'
import { usernameAtom } from '../../atoms/atoms'

export const useHeaderHooks = () => {
    const [username, setUsername] = useAtom(usernameAtom)
    const [isLoginModalOpen, setLoginModalOpen] = useState(false)

    const handleLoginClick = () => {
        setLoginModalOpen(true)
    }

    const handleClose = () => {
        setLoginModalOpen(false)
    }

    const onLogin = (userName: string) => {
        setUsername(userName)
        handleClose()
    }

    const onLogout = () => {
        setUsername(null)
    }

    return {
        username,
        isLoginModalOpen,
        handleLoginClick,
        handleClose,
        onLogin,
        onLogout,
    }
}
