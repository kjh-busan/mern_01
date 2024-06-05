import React from 'react'
import TodoHeader from './TodoHeader'
import { useTodoHooks } from '../../../../hooks/todos/TodoHooks'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import TodoTable from './TodoTable'

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
        onUpdateSelected,
        onToggleSelectAll,
        selectAll,
        message,
        open,
        severity,
        handleClose,
        checkoutInsert,
        checkoutUpdate,
        onToggleSelectAllDelete,
        selectAllDelete,
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
                checkoutInsert={checkoutInsert}
                checkoutUpdate={checkoutUpdate}
            />
            <TodoTable
                todos={todos}
                onHandleParam={onHandleParam}
                onSelectRow={onSelectRow}
                onToggleSelectAll={onToggleSelectAll}
                selectAll={selectAll}
                onToggleSelectAllDelete={onToggleSelectAllDelete}
                selectAllDelete={selectAllDelete}
            />
        </div>
    )
}

export default Todo
