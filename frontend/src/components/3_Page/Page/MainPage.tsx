import React, { useState } from 'react'
import axios from 'axios'
import { Button, ButtonGroup, TextField } from '@mui/material'

// User 타입 정의
export type Users = {
    _id?: string
    name: string
    email: string
    password: string
    isChecked?: boolean
    // 필요한 다른 필드들...
    handleSearch: () => void
    handleSearchUser: (row: Users) => void
    fetchUsers: () => void
    setSearchResults: () => void
}

const App: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('') // 검색어 상태
    const [searchResults, setSearchResults] = useState<Users[]>([]) // 검색 결과 상태

    // '/api/users' 엔드포인트에서 사용자 데이터를 가져온다
    const fetchUsers = async () => {
        try {
            const response = await axios.get<Users[]>(
                'http://localhost:5001/api/users'
            )
            setSearchResults(response.data) // 가져온 데이터를 상태에 저장
        } catch (error) {
            console.error('Error fetching users:', error)
        }
    }

    // 사용자 검색 함수
    const handleSearchUser = async () => {
        if (searchTerm.trim() === '') {
            alert('Please enter a name to search.')
            return
        }
        try {
            const response = await axios.get<Users[]>(
                `http://localhost:5001/api/users?name=${searchTerm}`
            )
            console.log('response:', response)
            if (response.status === 200) {
                setSearchResults(response.data) // 검색 결과를 상태에 저장
            } else {
                alert('No results found.')
            }
        } catch (error) {
            console.error('Error searching users:', error)
        }
    }

    const handleSearch = async () => {
        searchTerm.length > 0 ? handleSearchUser() : fetchUsers()
    }

    return (
        <>
            <h1>Users</h1>
            <TextField
                id="standard-basic"
                label="Search Users"
                variant="standard"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ButtonGroup variant="contained" aria-label="Basic button group">
                <Button onClick={handleSearch}>Search</Button>
            </ButtonGroup>
        </>
    )
}

export default App
