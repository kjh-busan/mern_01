import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    CircularProgress,
} from '@mui/material'

interface UserStats {
    username: string
    totalTodos: number
    completedTodos: number
}

const AdminStats: React.FC = () => {
    const [stats, setStats] = useState<UserStats[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get<UserStats[]>(
                    'http://localhost:5001/api/admin/stats'
                )
                console.log('#1 response.data: ', response.data)
                setStats(response.data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching stats:', error)
                setLoading(false)
            }
        }
        fetchStats()
    }, [])

    if (loading) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <CircularProgress />
            </div>
        )
    }

    return (
        <Paper style={{ padding: '16px' }}>
            <Typography variant="h4" gutterBottom>
                Admin TODO Stats
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>TODO count</TableCell>
                            <TableCell>TODO completed count</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stats.map((stat, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{stat.username}</TableCell>
                                <TableCell>{stat.totalTodos}</TableCell>
                                <TableCell>{stat.completedTodos}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default AdminStats
