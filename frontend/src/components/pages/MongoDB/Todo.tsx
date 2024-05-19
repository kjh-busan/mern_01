import React from 'react'
import TodoTable from './TodoTable'
import TodoHeader from './TodoHeader'
import { Alert } from '@mui/material'
import { useTodoHooks } from '../../../Hooks/TodoHooks'

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
        onHandleDelete,
        onUpdateHandle,
        onInsertHandle,
        error,
    } = useTodoHooks()

    return (
        <div>
            <h1>Todos</h1>
            {error && <Alert severity="error">{error}</Alert>}
            <TodoHeader
                username={username}
                setUsername={setUsername}
                title={title}
                setTitle={setTitle}
                contents={contents}
                setContents={setContents}
                onInsertHandle={onInsertHandle}
            />
            <TodoTable
                todos={todos}
                onHandleParam={onHandleParam}
                onUpdateHandle={onUpdateHandle}
                onHandleDelete={onHandleDelete}
            />
        </div>
    )
}

export default Todo
