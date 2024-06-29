import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Page } from './components/Page'
import LogIn from './components/login/Login'

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Page />} />
                <Route path="/login" element={<LogIn />} />
            </Routes>
        </Router>
    )
}

export default App
