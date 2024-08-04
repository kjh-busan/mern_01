import React from 'react'
import TodoTable from './TodoTable'
import { useTodoHooks } from '../../../../hooks/todos/TodoHooks'
import { useAtom } from 'jotai'
import { usernameAtom } from '../../../../atoms/atoms'

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

    const [username] = useAtom(usernameAtom)

    return (
        <div>
            <h1>Todo List</h1>
            <TodoTable
                todos={todos}
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
