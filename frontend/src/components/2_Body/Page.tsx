/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { Header } from '../1_Headers/Header'
import MongoDB from './Page/MongoDB'
import { Button } from '../../stories/Button'
import Footer from '../9_Footers/Footer'

type User = {
    name: string
}

export const Page: React.FC = () => {
    const [user, setUser] = React.useState<User>()
    const [isShow, setIsShow] = React.useState(false)

    const toggle = () => setIsShow(!isShow)

    const onLogin = () => {
        setUser({
            name: 'API responseから取得したusers.nameを表示',
        })
    }
    const onLogout = () => {
        setUser(undefined)
        setIsShow(false)
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
            {user && (
                <section className="storybook-page">
                    <h2>MongoDB users collection</h2>
                    <section className="storybook-page">
                        <Button label={'Get Users'} onClick={toggle} />
                    </section>
                    <div className="tip-wrapper">{isShow && <MongoDB />}</div>
                </section>
            )}
            <section>
                <Footer />
            </section>
        </>
    )
}
