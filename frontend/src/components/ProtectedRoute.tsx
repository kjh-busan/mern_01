import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import { usernameAtom } from '../atoms/atoms'

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const [username] = useAtom(usernameAtom)

    if (username !== 'admin') {
        return <Navigate to="/error" replace />
    }

    return children
}

export default ProtectedRoute
