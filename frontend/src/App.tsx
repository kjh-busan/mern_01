import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Page } from './components/Page'
import Admin from './components/admin/Admin'

const App: React.FC = () => {
    return (
        <Router>
            <div className="centered-container">
                <Routes>
                    <Route path="/" element={<Page />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
