import { useAtom } from 'jotai'
import { usernameAtom } from '../atoms'
import { useState } from 'react'

export const usePageHooks = () => {
    const [username, setUsername] = useAtom(usernameAtom)
    const [isLoginModalOpen, setLoginModalOpen] = useState(false)

    const onLogin = (userName: string) => {
        setUsername(userName)
        setLoginModalOpen(false)
    }

    const onLogout = () => {
        setUsername(null)
    }

    const handleOpenLoginModal = () => {
        setLoginModalOpen(true)
    }

    const handleCloseLoginModal = () => {
        setLoginModalOpen(false)
    }

    return {
        username,
        isLoginModalOpen,
        onLogin,
        onLogout,
        handleOpenLoginModal,
        handleCloseLoginModal,
    }
}
