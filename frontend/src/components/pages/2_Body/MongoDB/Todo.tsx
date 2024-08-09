import React, { useEffect, useState } from 'react'
import TodoTable from './TodoTable'
import { useTodoHooks } from '../../../../hooks/todos/TodoHooks'
import {
    Card,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
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
    const [selectedUser, setSelectedUser] = useState<string>('')
    const [filteredTodos, setFilteredTodos] = useState<TodoType[]>(todos)

    useEffect(() => {
        if (selectedUser) {
            setFilteredTodos(
                todos.filter((todo) => todo.username === selectedUser)
            )
        } else {
            setFilteredTodos(todos)
        }
    }, [selectedUser, todos])

    const handleUserChange = (event: SelectChangeEvent<string>) => {
        const value = event.target.value as string
        setSelectedUser(value)
        onSelectUser(value)
    }

    return (
        <div>
            <h1>Todo List</h1>
            <InputLabel>Username</InputLabel>
            <Select value={selectedUser} onChange={handleUserChange}>
                {users.map((user) => (
                    <MenuItem key={user} value={user}>
                        {user}
                    </MenuItem>
                ))}
            </Select>
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
