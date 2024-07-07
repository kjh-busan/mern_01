import React, { useState } from 'react'
import { Header } from './pages/1_Headers/Header'
import Footer from './pages/9_Footers/Footer'
import Todo from './pages/2_Body/MongoDB/Todo'
import CenteredImage from './CenteredImage'
import LoginModal from './login/LoginModal'

type User = {
    name: string
}

export const Page: React.FC = () => {
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

    return (
        <div className="page-container">
            <Header user={user} onLogin={onLogin} onLogout={onLogout} />
            <main className="main-content">
                {!user?.name && <CenteredImage />}
                {user?.name && <Todo />}
            </main>
            <Footer />
            <LoginModal
                open={isLoginModalOpen}
                onClose={handleCloseLoginModal}
                onLogin={onLogin}
            />
        </div>
    )
}
