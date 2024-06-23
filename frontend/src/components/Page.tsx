import React from 'react'
import { Header } from './pages/1_Headers/Header'
import Footer from './pages/9_Footers/Footer'
import Todo from './pages/2_Body/MongoDB/Todo'

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
        <>
            <section>
                <Header
                    user={user}
                    onLogin={() => onLogin()}
                    onLogout={() => onLogout()}
                />
            </section>
            <section className="storybook-page">{user && <Todo />}</section>
            <section>
                <Footer />
            </section>
        </>
    )
}
