import React from 'react'
import { Header } from './pages/1_Headers/Header'
import Footer from './pages/9_Footers/Footer'
import Todo from './pages/2_Body/MongoDB/Todo'
import LoginModal from './login/LoginModal'
import CenteredImage from './image/CenteredImage'
import { usePageHooks } from '../hooks/pages/PageHooks'
import { useAtom } from 'jotai'
import { usernameAtom } from '../atoms/atoms'

export const Page: React.FC = () => {
    const [username] = useAtom(usernameAtom)
    const { isLoginModalOpen, onLogin, handleCloseLoginModal } = usePageHooks()

    return (
        <div className="page-container">
            <Header />
            <main className="main-content">
                {!username ? <CenteredImage /> : <Todo />}
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
