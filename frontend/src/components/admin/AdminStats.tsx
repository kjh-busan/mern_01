import React, { useEffect, useState } from 'react'
import axios from 'axios'

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
                ) // 서버 포트와 경로 확인
                console.log('#1 response.data: ', response.data)
                setStats(response.data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching stats:', error)
                setLoading(false)
            }
        }
        fetchStats()
    }, []) // 의존성 배열 추가

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h2>Admin TODO Stats</h2>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>Username</th>
                        <th>TODO 갯수</th>
                        <th>TODO 완성 갯수</th>
                    </tr>
                </thead>
                <tbody>
                    {stats.map((stat, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{stat.username}</td>
                            <td>{stat.totalTodos}</td>
                            <td>{stat.completedTodos}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminStats
