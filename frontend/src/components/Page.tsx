import React from 'react'
import { Header } from './pages/1_Headers/Header'
import Footer from './pages/9_Footers/Footer'
import Todo from './pages/2_Body/MongoDB/Todo'
import LoginModal from './login/LoginModal'
import CenteredImage from './image/CenteredImage'
import { usePageHooks } from '../hooks/pages/PageHooks'

export const Page: React.FC = () => {
    const {
        user,
        isLoginModalOpen,
        onLogin,
        onLogout,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        handleOpenLoginModal,
        handleCloseLoginModal,
    } = usePageHooks()

    return (
        <div className="page-container">
            <Header user={user} onLogin={onLogin} onLogout={onLogout} />
            <main className="main-content">
                {!user?.name && <CenteredImage />}
                {user?.name && <Todo user={user} />}
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
