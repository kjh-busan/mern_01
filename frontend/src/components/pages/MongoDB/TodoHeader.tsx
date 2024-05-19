import React from 'react'
import { Button, MenuItem, TextField } from '@mui/material'
import { TodoHeaderProps, TodoTitles } from '../../../types/todos/TodoTypes'

const TodoHeader: React.FC<TodoHeaderProps> = ({
    username,
    setUsername,
    title,
    setTitle,
    contents,
    setContents,
    onInsertHandle,
}) => {
    return (
        <>
            <TextField
                id="todo-username"
                label="User Name"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                id="todo-title"
                select
                label="Category"
                value={title}
                helperText="Please select your todos"
                onChange={(e) => setTitle(e.target.value)}
            >
                {TodoTitles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                id="todo-content"
                label="Content"
                variant="outlined"
                value={contents}
                onChange={(e) => setContents(e.target.value)}
            />
            <Button
                onClick={onInsertHandle}
                sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    border: '1px solid',
                    borderColor: 'primary.main',
                    '&:hover': {
                        backgroundColor: 'primary.dark',
                        borderColor: 'primary.dark',
                    },
                }}
            >
                Insert
            </Button>
        </>
    )
}

export default TodoHeader
