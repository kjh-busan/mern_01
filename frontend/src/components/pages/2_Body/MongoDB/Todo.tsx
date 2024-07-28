import React from 'react'
import { useAtom } from 'jotai'
import { useTodoHooks } from '../../../../hooks/todos/TodoHooks'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import TodoTable from './TodoTable'
import TodoHeader from './TodoHeader'
import { usernameAtom } from '../../../../atoms/atoms'

const Todo: React.FC = () => {
    const [username] = useAtom(usernameAtom)
    const {
        todos,
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

    if (!username) {
        return <div>Please log in to view your todos.</div>
    }

    return (
        <div>
            <h1>{username}’s Todos</h1>
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
                isAdmin={username === 'admin' ? true : false}
            />
        </div>
    )
}

export default Todo
