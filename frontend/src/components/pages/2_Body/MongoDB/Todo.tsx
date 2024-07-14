import React from 'react'
import TodoHeader from './TodoHeader'
import { useTodoHooks } from '../../../../hooks/todos/TodoHooks'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import TodoTable from './TodoTable'
import { TodoProps } from '../../../../types/todos/TodoTypes'

const Todo: React.FC<TodoProps> = ({ user }) => {
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

    const handleInsert = () => {
        onInsertHandle(user) // 비동기 함수를 동기 함수로 감싸서 호출
    }

    return (
        <div>
            <h1>{user.name}’s Todos</h1>
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
                user={user}
                title={title}
                setTitle={setTitle}
                contents={contents}
                setContents={setContents}
                onInsertHandle={handleInsert} // 동기 함수로 변경
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
