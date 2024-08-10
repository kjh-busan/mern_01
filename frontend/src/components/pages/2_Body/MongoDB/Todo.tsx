import React, { useEffect, useState } from 'react'
import TodoTable from './TodoTable'
import { useTodoHooks } from '../../../../hooks/todos/TodoHooks'
import {
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    Box,
} from '@mui/material'
import { TodoType } from '../../../../types/todos/TodoTypes'

const Todo: React.FC = () => {
    const {
        todos,
        onHandleParam,
        onSelectRow,
        onToggleSelectAll,
        selectAll,
        onToggleSelectAllDelete,
        selectAllDelete,
        isAdmin,
        users,
        onSelectUser,
    } = useTodoHooks()
    const [selectedUser, setSelectedUser] = useState<string>('') // Default to an empty string
    const [filteredTodos, setFilteredTodos] = useState<TodoType[]>(todos)

    useEffect(() => {
        if (selectedUser) {
            setFilteredTodos(
                todos.filter((todo) => todo.username === selectedUser)
            )
        } else {
            setFilteredTodos(todos) // Show all todos if no user is selected
        }
    }, [selectedUser, todos])

    const handleUserChange = (event: SelectChangeEvent<string>) => {
        const value = event.target.value as string
        setSelectedUser(value)
        if (value) {
            onSelectUser(value)
        } else {
            // 빈칸 선택 시 모든 사용자의 todos 표시
            setFilteredTodos(todos)
        }
    }

    return (
        <div>
            <h1>Todo List</h1>
            {isAdmin && (
                <Box sx={{ mb: 2, width: '200px' }}>
                    <InputLabel>Username List</InputLabel>
                    <Select
                        value={selectedUser}
                        onChange={handleUserChange}
                        displayEmpty
                        sx={{ height: '40px', minWidth: '200px' }} // Adjust the height and width
                    >
                        <MenuItem value="" sx={{ height: '40px' }}></MenuItem>
                        {users
                            .filter((user) => user !== 'admin') // Filter out 'admin'
                            .sort((a, b) => a.localeCompare(b)) // Sort users in ascending order
                            .map((user) => (
                                <MenuItem key={user} value={user}>
                                    {user}
                                </MenuItem>
                            ))}
                    </Select>
                </Box>
            )}
            <TodoTable
                todos={filteredTodos}
                onHandleParam={onHandleParam}
                onSelectRow={onSelectRow}
                onToggleSelectAll={onToggleSelectAll}
                selectAll={selectAll}
                onToggleSelectAllDelete={onToggleSelectAllDelete}
                selectAllDelete={selectAllDelete}
                isAdmin={isAdmin}
                users={users}
                onSelectUser={onSelectUser}
            />
        </div>
    )
}

export default Todo
