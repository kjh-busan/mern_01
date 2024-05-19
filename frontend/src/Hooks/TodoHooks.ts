import { useEffect, useState } from 'react'
import axios from 'axios'
import { TodoType } from '../types/todos/TodoTypes'
import { Types } from 'mongoose'

export const useTodoHooks = () => {
    const [todos, setTodos] = useState<TodoType[]>([])
    const [username, setUsername] = useState('')
    const [title, setTitle] = useState('Programming')
    const [contents, setContents] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [selectAll, setSelectAll] = useState(false)

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
            console.error('Error fetching todos:', error)
        }
    }

    const onHandleParam = (
        row: TodoType,
        field: keyof TodoType,
        value: any
    ) => {
        const updatedTodo = todos.map((todo) =>
            todo._id === row._id ? { ...todo, [field]: value } : todo
        )
        console.log(`Updated ${field}: ${value}`)
        setTodos(updatedTodo)
    }

    const onHandleDelete = async (row: TodoType) => {
        try {
            const response = await axios.delete(
                `http://localhost:5001/api/todos/${row._id}`
            )
            console.log(response.data)
            fetchTodos()
        } catch (error) {
            console.error('Error deleting user:', error)
        }
    }

    const onUpdateHandle = async (row: TodoType) => {
        try {
            const todo = todos.find((todo) => todo._id === row._id)

            if (!todo) {
                setError('Todo not found for update.')
                return
            }

            const hasChanges = Object.keys(todo).some(
                (key) =>
                    todo[key as keyof TodoType] !== row[key as keyof TodoType]
            )
            if (!hasChanges) {
                setError('No changes detected.')
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

            console.log('OK UPDATE')
            fetchTodos()
            setError(null)
        } catch (error) {
            console.error('Error updating user:', error)
            setError('Error updating todo.')
        }
    }

    const onInsertHandle = async () => {
        if (checkoutInsert()) {
            setError('Please fill in all fields.')
            return
        }

        const existingTodo = todos.find(
            (todo) =>
                todo.username === username &&
                todo.title === title &&
                todo.contents === contents
        )

        if (existingTodo) {
            setError(
                'Todo with the same username, title, and content already exists.'
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
        console.log('onInsertHandle:', newTodo)
        const response = await axios.post<TodoType>(
            'http://localhost:5001/api/todos',
            newTodo
        )
        console.log('response.status:', response.status)
        if (response.status === 200 || response.status === 201) {
            fetchTodos()
            setError(null)
        } else {
            console.log('ERROR: Response')
            setError('Error inserting todo.')
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
        }))
        setTodos(updatedTodos)
        setSelectAll(!selectAll)
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
        error,
    }
}
