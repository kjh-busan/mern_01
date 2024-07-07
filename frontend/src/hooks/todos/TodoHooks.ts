import { useEffect, useState } from 'react'
import axios from 'axios'
import {
    AlertColors,
    ResponseStatus,
    TodoAlertColor,
    TodoType,
} from '../../types/todos/TodoTypes'
import { Types } from 'mongoose'

export const useTodoHooks = () => {
    const [todos, setTodos] = useState<TodoType[]>([])
    const [todosOri, setTodosOri] = useState<TodoType[]>([])
    const [username, setUsername] = useState('')
    const [title, setTitle] = useState('Programming')
    const [contents, setContents] = useState('')
    const [message, setMessage] = useState<string | null>(null)
    const [selectAll, setSelectAll] = useState(false)
    const [selectAllDelete, setSelectAllDelete] = useState(false)
    const [open, setOpen] = useState(false)
    const [severity, setSeverity] = useState<AlertColors>(TodoAlertColor.error)

    useEffect(() => {
        fetchTodos()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchTodos = async () => {
        try {
            const response = await axios.get<TodoType[]>(
                'http://localhost:5001/api/todos'
            )
            if (response.data) {
                setTodos(response.data)
                setTodosOri(response.data)
            }
        } catch (error) {
            onHandleMessage(
                `Error fetching todos:${error}`,
                TodoAlertColor.error
            )
        }
    }

    const onHandleMessage = (message: string, severity: AlertColors) => {
        setMessage(message)
        setSeverity(severity)
        setOpen(true)
    }

    const onHandleParam = (
        row: TodoType,
        field: keyof TodoType,
        value: any
    ) => {
        const updatedTodo = todos.map((todo) =>
            todo._id === row._id ? { ...todo, [field]: value } : todo
        )

        setTodos(updatedTodo)
    }

    const onHandleDelete = async (row: TodoType) => {
        try {
            const response = await axios.delete(
                `http://localhost:5001/api/todos/${row._id}`
            )
            console.log(`delete: ${response.data}`)
            return response.status
        } catch (error) {
            onHandleMessage(
                `Error deleting todo: ${error}`,
                TodoAlertColor.error
            )
        }
    }

    const onUpdateHandle = async (row: TodoType) => {
        if (row.delete) {
            const deleteStatus = await onHandleDelete(row)
            if (ResponseStatus.includes(deleteStatus!)) {
                fetchTodos()
                onHandleMessage(
                    'Todo deleted successfully.',
                    TodoAlertColor.success
                )
            } else {
                onHandleMessage(
                    'Todo delete API failed.',
                    TodoAlertColor.warning
                )
            }

            setSelectAll(false)
            setSelectAllDelete(false)
            return
        }

        try {
            const originalTodo = todosOri.find((todo) => todo._id === row._id)

            if (!originalTodo) {
                onHandleMessage(
                    'Todo not found for update.',
                    TodoAlertColor.error
                )
                return
            }

            const hasChanges = Object.keys(originalTodo).some(
                (key) =>
                    originalTodo[key as keyof TodoType] !==
                    row[key as keyof TodoType]
            )
            if (!hasChanges) {
                return
            }

            const newTodo = {
                ...row,
                time: new Date(),
            }
            console.log('UPDATE newTodo:', newTodo.contents)
            const result = await axios.put(
                `http://localhost:5001/api/todos/${row._id}`,
                newTodo
            )

            if (ResponseStatus.includes(result.status)) {
                fetchTodos()
                onHandleMessage(
                    'Todo updated successfully.',
                    TodoAlertColor.success
                )
            } else {
                onHandleMessage(
                    'Todo update API failed.',
                    TodoAlertColor.warning
                )
            }

            setSelectAll(false)
            setSelectAllDelete(false)
        } catch (error) {
            onHandleMessage('Error updating todo.', TodoAlertColor.error)
        }
    }

    const onInsertHandle = async () => {
        if (checkoutInsert()) {
            onHandleMessage(
                'Please fill in all fields.',
                TodoAlertColor.warning
            )
            return
        }

        const existingTodo = todos.find(
            (todo) =>
                todo.username === username &&
                todo.title === title &&
                todo.contents === contents
        )

        if (existingTodo) {
            onHandleMessage(
                'Todo with the same username, title, and content already exists.',
                TodoAlertColor.warning
            )
            return
        }

        const newTodo: TodoType = {
            username,
            title,
            contents,
            likeCount: 0,
            completed: false,
            time: new Date(),
        }
        const response = await axios.post<TodoType>(
            'http://localhost:5001/api/todos',
            newTodo
        )
        if (response.status === 200 || response.status === 201) {
            fetchTodos()
            onHandleMessage(
                'Todo inserted successfully.',
                TodoAlertColor.success
            )
        } else {
            onHandleMessage('Error inserting todo.', TodoAlertColor.error)
        }
        setSelectAll(false)
        setSelectAllDelete(false)
    }

    const checkoutInsert = (): boolean => !username || !title || !contents
    const checkoutUpdate = (): boolean =>
        todos.filter((todo) => todo.selected).length > 0 ? false : true

    const onSelectRow = (id: Types.ObjectId) => {
        const updatedTodos = todos.map((todo) =>
            todo._id === id
                ? {
                      ...todo,
                      selected: !todo.selected,
                  }
                : todo
        )
        setTodos(updatedTodos)
    }

    const onUpdateSelected = async () => {
        const selectedTodos = todos.filter((todo) => todo.selected)
        let hasChanges = false

        for (const selectedTodo of selectedTodos) {
            const originalTodo = todosOri.find(
                (todo) => todo._id === selectedTodo._id
            )
            if (!originalTodo) continue

            const fieldsToCompare: (keyof TodoType)[] = [
                'username',
                'title',
                'contents',
                'likeCount',
                'completed',
                'delete',
            ]
            const todoHasChanges = fieldsToCompare.some(
                (key) => originalTodo[key] !== selectedTodo[key]
            )

            if (todoHasChanges) {
                hasChanges = true
                break
            }
        }

        if (!hasChanges) {
            console.log('hasChanges:', hasChanges)
            onHandleMessage('No changes detected.', TodoAlertColor.warning)
            return
        }

        for (const todo of selectedTodos) {
            await onUpdateHandle(todo)
        }
    }

    const onToggleSelectAll = () => {
        const updatedTodos = todos.map((todo) => ({
            ...todo,
            selected: !selectAll,
        }))
        setTodos(updatedTodos)
        setSelectAll(!selectAll)
    }

    const onToggleSelectAllDelete = () => {
        const updatedTodos = todos.map((todo) => ({
            ...todo,
            delete: !selectAllDelete,
        }))
        setTodos(updatedTodos)
        setSelectAllDelete(!selectAllDelete)
    }

    const handleClose = (
        _event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
        setMessage(null)
    }

    return {
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
        onSelectRow,
        onUpdateSelected,
        onToggleSelectAll,
        selectAll,
        onToggleSelectAllDelete,
        selectAllDelete,
        message,
        open,
        severity,
        handleClose,
        onHandleMessage,
        setMessage,
        checkoutInsert,
        checkoutUpdate,
    }
}
