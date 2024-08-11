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
import TodoHeader from './TodoHeader'

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
        title,
        setTitle,
        contents,
        setContents,
        onInsertHandle,
        onUpdateSelected,
        checkoutInsert,
        checkoutUpdate,
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
                <Box sx={{ mb: 2, width: 200 }}>
                    <InputLabel>Username List</InputLabel>
                    <Select
                        value={selectedUser}
                        onChange={handleUserChange}
                        displayEmpty
                        sx={{ height: 40, minWidth: 200 }}
                    >
                        <MenuItem value="" sx={{ height: 40 }}></MenuItem>
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
            {!isAdmin && (
                <TodoHeader
                    title={title}
                    setTitle={setTitle}
                    contents={contents}
                    setContents={setContents}
                    onInsertHandle={onInsertHandle}
                    onUpdateSelected={onUpdateSelected}
                    checkoutInsert={checkoutInsert}
                    checkoutUpdate={checkoutUpdate}
                />
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
