import React, { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Page } from './components/Page'
import LogIn from './components/login/Login'
import LoginModal from './components/login/LoginModal'

const App: React.FC = () => {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false)

    const handleOpenLoginModal = () => {
        setLoginModalOpen(true)
    }

    const handleCloseLoginModal = () => {
        setLoginModalOpen(false)
    }

    return (
        <Router>
            <div className="centered-container">
                <Routes>
                    <Route path="/" element={<Page />} />
                    <Route
                        path="/login"
                        element={
                            <button onClick={handleOpenLoginModal}>
                                Open Login
                            </button>
                        }
                    />
                </Routes>
                <LoginModal
                    open={isLoginModalOpen}
                    onClose={handleCloseLoginModal}
                />
            </div>
        </Router>
    )
}

export default App
