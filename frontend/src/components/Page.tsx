import React from 'react'
import { Header } from './pages/1_Headers/Header'
import Footer from './pages/9_Footers/Footer'
import Todo from './pages/2_Body/MongoDB/Todo'
import CenteredImage from './CenteredImage'

type User = {
    name: string
}

export const Page: React.FC = () => {
    const [user, setUser] = React.useState<User>()

    const onLogin = () => {
        setUser({
            name: 'API responseから取得したusers.nameを表示',
        })
    }
    const onLogout = () => {
        setUser(undefined)
    }

    return (
        <div className="page-container">
            <Header user={user} onLogout={onLogout} />
            <main className="main-content">
                {!user && <CenteredImage />}
                {user && <Todo />}
            </main>
            <Footer />
        </div>
    )
}
