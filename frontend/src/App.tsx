import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Admin from './components/admin/Admin'
import { Page } from './components/Page'
import ErrorPage from './components/ErrorPage'
import ProtectedRoute from './components/ProtectedRoute'

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Page />} />
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <Admin />
                        </ProtectedRoute>
                    }
                />
                <Route path="/error" element={<ErrorPage />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </Router>
    )
}

export default App
