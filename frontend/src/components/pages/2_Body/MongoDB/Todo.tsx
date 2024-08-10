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
        // selectedUser가 빈칸인 경우 전체 todos를 표시
        if (!selectedUser || selectedUser === '') {
            setFilteredTodos(todos)
        } else {
            setFilteredTodos(
                todos.filter((todo) => todo.username === selectedUser)
            )
        }
    }, [selectedUser, todos])

    const handleUserChange = (event: SelectChangeEvent<string>) => {
        const value = event.target.value as string
        setSelectedUser(value)

        if (value === '') {
            // 빈칸을 선택했을 때 전체 todos 표시
            setFilteredTodos(todos)
        } else {
            // 특정 사용자를 선택했을 때 해당 사용자의 todos만 표시
            setFilteredTodos(todos.filter((todo) => todo.username === value))
        }

        onSelectUser(value)
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
                        <MenuItem value="" sx={{ height: '40px' }}>
                            {/* 여백을 추가하여 빈칸으로 표시 */}
                        </MenuItem>
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
