import { useState } from 'react'
import { User } from '../../types/user/UserType'

export const useHeaderHooks = (initialUser: User | undefined | null) => {
    const [user, setUser] = useState<User | null>(initialUser || null)
    const [isLoginModalOpen, setLoginModalOpen] = useState(false)

    const handleLoginClick = () => {
        setLoginModalOpen(true)
    }

    const handleClose = () => {
        setLoginModalOpen(false)
    }

    const onLogin = (userName: string) => {
        setUser({ name: userName })
        handleClose()
    }

    const onLogout = () => {
        setUser(null)
    }

    return {
        user,
        isLoginModalOpen,
        handleLoginClick,
        handleClose,
        onLogin,
        onLogout,
    }
}
