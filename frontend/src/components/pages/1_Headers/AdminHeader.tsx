import React from 'react'
import './header.css'
import { Button } from '../../../stories/Button'
import LoginModal from '../../login/LoginModal'
import { useHeaderHooks } from '../../../hooks/todos/HeaderHooks'
import { useNavigate } from 'react-router-dom'

export const AdminHeader: React.FC = () => {
    const {
        username,
        isLoginModalOpen,
        handleLoginClick,
        handleClose,
        onLogin,
        onLogout,
    } = useHeaderHooks()

    const navigate = useNavigate()

    const handleAdminStatsClick = () => {
        navigate('/admin')
    }

    const handleBackClick = () => {
        navigate(-1) // 이전 페이지로 돌아갑니다.
    }

    return (
        <header>
            <div className="storybook-header">
                <div>
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g fill="none" fillRule="evenodd">
                            <path
                                d="M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z"
                                fill="#FFF"
                            />
                            <path
                                d="M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z"
                                fill="#555AB9"
                            />
                            <path
                                d="M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z"
                                fill="#91BAF8"
                            />
                        </g>
                    </svg>
                    <h1>Admin Dashboard</h1>
                </div>
                <div>
                    {username ? (
                        <>
                            <Button
                                size="small"
                                onClick={handleAdminStatsClick}
                                label="View Admin Stats"
                            />
                            <Button
                                size="small"
                                onClick={handleBackClick}
                                label="Go Back"
                            />
                            <Button
                                size="small"
                                onClick={onLogout}
                                label="Log out"
                            />
                        </>
                    ) : (
                        <Button
                            size="small"
                            onClick={handleLoginClick}
                            label="Log in"
                        />
                    )}
                </div>
            </div>
            <LoginModal
                open={isLoginModalOpen}
                onClose={handleClose}
                onLogin={(userName: string) => {
                    onLogin(userName)
                }}
            />
        </header>
    )
}

export default AdminHeader
