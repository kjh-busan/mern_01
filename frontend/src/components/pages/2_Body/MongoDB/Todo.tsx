import React from 'react'
import TodoTable from './TodoTable'
import TodoHeader from './TodoHeader'
import { useTodoHooks } from '../../../../hooks/TodoHooks'

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
        error,
    } = useTodoHooks()

    return (
        <div>
            <h1>Todos</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}
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
