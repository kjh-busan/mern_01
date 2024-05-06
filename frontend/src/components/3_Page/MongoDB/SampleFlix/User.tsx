import React, { useEffect, useState } from 'react'
import axios from 'axios'

// User 타입 정의
type UserMongoDB = {
    _id: string
    name: string
    email: string
    // 필요한 다른 필드들...
}
interface UserMongoDBProps {
    searchTerm: string
}
const User: React.FC<UserMongoDBProps> = ({ searchTerm }) => {
    const [users, setUsers] = useState<UserMongoDB[]>([])

    useEffect(() => {
        // alert(searchTerm)
        fetchUsers()
    }, [])

    const fetchUsers = async (name = searchTerm) => {
        try {
            const response = await axios.get<UserMongoDB[]>(
                `http://localhost:5001/api/users`,
                {
                    params: { name }, // 검색어를 매개변수로 전달
                }
            )
            setUsers(response.data)
        } catch (error) {
            console.error('Error fetching users:', error)
        }
    }

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

export default User
