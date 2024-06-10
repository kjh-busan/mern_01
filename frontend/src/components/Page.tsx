import React from 'react'
import { Header } from './pages/1_Headers/Header'
import Footer from './pages/9_Footers/Footer'
import Todo from './pages/2_Body/MongoDB/Todo'
import Login from './login/Login'

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
    const onCreateAccount = () => {
        // openCreateAccountPage
        alert('会員登録画面')
    }
    return (
        <>
            <section>
                <Header
                    user={user}
                    onLogin={() => onLogin()}
                    onLogout={() => onLogout()}
                    onCreateAccount={() => onCreateAccount()}
                />
            </section>
            <section className="storybook-page">{user && <Todo />}</section>
            <section>
                <Footer />
            </section>
        </>
    )
}
