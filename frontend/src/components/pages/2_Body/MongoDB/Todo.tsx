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
    } = useTodoHooks()
    const [selectedUser, setSelectedUser] = useState<string>('')
    const [filteredTodos, setFilteredTodos] = useState<TodoType[]>([])

    useEffect(() => {
        if (!selectedUser) {
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
                        sx={{ height: '40px', minWidth: '200px' }}
                    >
                        <MenuItem value="" sx={{ height: '40px' }}></MenuItem>
                        {users
                            .filter((user) => user !== 'admin')
                            .sort((a, b) => a.localeCompare(b))
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
            />
        </div>
    )
}

export default Todo
