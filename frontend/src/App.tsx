import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Page } from './components/Page'
import LogIn from './components/login/Login'
import SignUp from './components/login/SignUp'

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Page />} />
                <Route
                    path="/login"
                    element={
                        <LogIn
                            open={true}
                            onClose={() => {}}
                            onLogin={() => {}}
                        />
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <SignUp
                            open={false}
                            onClose={function (): void {
                                throw new Error('Function not implemented.')
                            }}
                        />
                    }
                />{' '}
            </Routes>
        </Router>
    )
}

export default App
