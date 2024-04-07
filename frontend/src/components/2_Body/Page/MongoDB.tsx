import React, { useEffect, useState } from 'react'
import axios from 'axios'

// User 타입 정의
type User = {
    _id: string
    name: string
    email: string
    // 필요한 다른 필드들...
}

const App = () => {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        // '/api/users' 엔드포인트에서 사용자 데이터를 가져온다
        const fetchUsers = async () => {
            try {
                const response = await axios.get<User[]>(
                    'http://localhost:5001/api/users'
                )
                setUsers(response.data) // 가져온 데이터를 상태에 저장
            } catch (error) {
                console.error('Error fetching users:', error)
            }
        }

        fetchUsers()
    }, []) // 빈 의존성 배열로 컴포넌트 마운트 시 한 번만 실행

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        {user.name} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default App
