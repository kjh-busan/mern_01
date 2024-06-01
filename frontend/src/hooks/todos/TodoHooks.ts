import { useEffect, useState } from 'react'
import axios from 'axios'
import {
    AlertColors,
    TodoAlertColor,
    TodoType,
} from '../../types/todos/TodoTypes'
import { Types } from 'mongoose'
import { AlertColor } from '@mui/material/Alert'

export const useTodoHooks = () => {
    const [todos, setTodos] = useState<TodoType[]>([])
    const [username, setUsername] = useState('')
    const [title, setTitle] = useState('Programming')
    const [contents, setContents] = useState('')
    const [message, setMessage] = useState<string | null>(null)
    const [selectAll, setSelectAll] = useState(false)
    const [open, setOpen] = useState(false)
    const [severity, setSeverity] = useState<AlertColors>(TodoAlertColor.error)

    useEffect(() => {
        fetchTodos()
    }, [])

    const fetchTodos = async () => {
        try {
            const response = await axios.get<TodoType[]>(
                'http://localhost:5001/api/todos'
            )
            response && setTodos(response.data)
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
        onHandleMessage(`Updated ${field}: ${value}`, TodoAlertColor.success)

        setTodos(updatedTodo)
    }

    const onHandleDelete = async (row: TodoType) => {
        try {
            const response = await axios.delete(
                `http://localhost:5001/api/todos/${row._id}`
            )
            console.log(`delete: ${response.data}`)
            fetchTodos()
            onHandleMessage(
                'Todo deleted successfully.',
                TodoAlertColor.success
            )
        } catch (error) {
            onHandleMessage(
                `Error deleting todo: ${error}`,
                TodoAlertColor.error
            )
        }
    }

    const onUpdateHandle = async (row: TodoType) => {
        try {
            const todo = todos.find((todo) => todo._id === row._id)

            if (!todo) {
                onHandleMessage(
                    'Todo not found for update.',
                    TodoAlertColor.error
                )
                return
            }

            const hasChanges = Object.keys(todo).some(
                (key) =>
                    todo[key as keyof TodoType] !== row[key as keyof TodoType]
            )
            if (!hasChanges) {
                onHandleMessage('No changes detected.', 'warning')
                return
            }

            const newTodo = {
                ...todo,
                time: new Date(),
            }
            console.log('UPDATE newTodo:', newTodo)
            await axios.put(
                `http://localhost:5001/api/todos/${row._id}`,
                newTodo
            )

            fetchTodos()
            onHandleMessage(
                'Todo updated successfully.',
                TodoAlertColor.success
            )
        } catch (error) {
            onHandleMessage('Error updating todo.', TodoAlertColor.error)
        }
    }

    const onInsertHandle = async () => {
        if (checkoutInsert()) {
            onHandleMessage('Please fill in all fields.', 'warning')
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
                'warning'
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
    }

    const checkoutInsert = () => !username || !title || !contents

    const onSelectRow = (id: Types.ObjectId) => {
        const updatedTodos = todos.map((todo) =>
            todo._id === id
                ? {
                      ...todo,
                      selected: !todo.selected,
                      editMode: !todo.editMode,
                  }
                : todo
        )
        setTodos(updatedTodos)
    }

    const onToggleEditMode = (id: Types.ObjectId) => {
        const updatedTodos = todos.map((todo) =>
            todo._id === id ? { ...todo, delete: !todo.delete } : todo
        )
        setTodos(updatedTodos)
    }

    const onUpdateSelected = async () => {
        const selectedTodos = todos.filter((todo) => todo.selected)
        for (const todo of selectedTodos) {
            await onUpdateHandle(todo)
        }
    }

    const onToggleSelectAll = () => {
        const updatedTodos = todos.map((todo) => ({
            ...todo,
            selected: !selectAll,
            editMode: !todo.editMode,
        }))
        setTodos(updatedTodos)
        setSelectAll(!selectAll)
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
        onToggleEditMode,
        onUpdateSelected,
        onToggleSelectAll,
        selectAll,
        message,
        open,
        severity,
        handleClose,
        onHandleMessage,
        setMessage,
    }
}
