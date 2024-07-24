import { useState } from 'react'
import { User } from '../../types/user/UserType'

export const usePageHooks = () => {
    const [user, setUser] = useState<User | undefined>()
    const [isLoginModalOpen, setLoginModalOpen] = useState(false)

    const onLogin = (userName: string) => {
        setUser({ name: userName })
        setLoginModalOpen(false)
    }

    const onLogout = () => {
        setUser(undefined)
    }

    const handleOpenLoginModal = () => {
        setLoginModalOpen(true)
    }

    const handleCloseLoginModal = () => {
        setLoginModalOpen(false)
    }

    return {
        user,
        isLoginModalOpen,
        onLogin,
        onLogout,
        handleOpenLoginModal,
        handleCloseLoginModal,
    }
}
