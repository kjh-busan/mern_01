import React, { useEffect, useState } from 'react'
import TodoTable from './TodoTable'
import TodoHeader from './TodoHeader'
import { useTodoHooks } from '../../../../hooks/todos/TodoHooks'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

const Todo: React.FC = () => {
    const {
        todos,
        username,
        setUsername,
        title,
        setTitle,
        contents,
        setContents,
        onHandleParam,
        onInsertHandle,
        onSelectRow,
        onToggleEditMode,
        onUpdateSelected,
        onToggleSelectAll,
        selectAll,
        message,
        open,
        severity,
        handleClose,
    } = useTodoHooks()

    return (
        <div>
            <h1>Todos</h1>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
            <TodoHeader
                username={username}
                setUsername={setUsername}
                title={title}
                setTitle={setTitle}
                contents={contents}
                setContents={setContents}
                onInsertHandle={onInsertHandle}
                onUpdateSelected={onUpdateSelected}
            />
            <TodoTable
                todos={todos}
                onHandleParam={onHandleParam}
                onSelectRow={onSelectRow}
                onToggleEditMode={onToggleEditMode}
                onToggleSelectAll={onToggleSelectAll}
                selectAll={selectAll}
            />
        </div>
    )
}

export default Todo
