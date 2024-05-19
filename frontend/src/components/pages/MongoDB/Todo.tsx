import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Checkbox from '@mui/material/Checkbox'
import {
    Badge,
    Button,
    ButtonGroup,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from '@mui/material'

type TodoType = {
    _id?: string
    username: string
    title: string
    contents: string
    likeCount: number
    completed: boolean
    time?: Date
}

const TodoTitles = [
    {
        value: 'Programming',
        label: '🖥️',
    },
    {
        value: 'Exercise',
        label: '🏃‍♂️',
    },
    {
        value: 'Drinking',
        label: '🍺',
    },
    {
        value: 'Music',
        label: '🥁',
    },
]

const Todo: React.FC = () => {
    const [todos, setTodos] = useState<TodoType[]>([])
    const [username, setUsername] = useState('')
    const [title, setTitle] = useState('Programming')
    const [contents, setContents] = useState('')

    useEffect(() => {
        fetchTodos()
    }, [])

    const fetchTodos = async () => {
        try {
            const response = await axios.get<TodoType[]>(
                `http://localhost:5001/api/todos`
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
            todo._id === row._id
                ? {
                      ...todo,
                      [field]: value,
                  }
                : todo
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

            const newTodo = {
                ...todo!,
                time: new Date(),
            }
            console.log('UPDATE newTodo:', newTodo)
            await axios.put(
                `http://localhost:5001/api/todos/${row._id}`,
                newTodo
            )

            console.log('OK UPDATE')
            fetchTodos()
        } catch (error) {
            console.error('Error updating user:', error)
        }
    }

    const checkoutInsert = () => {
        return !username || !title || !contents ? true : false
    }

    const onInsertHandle = async () => {
        if (checkoutInsert()) {
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
        } else {
            console.log('ERROR: Response')
        }
    }

    return (
        <div>
            <h1>Todos</h1>
            <TextField
                id="todo-username"
                label="User Name"
                variant="outlined"
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                id="todo-title"
                select
                label="Category"
                value={title}
                helperText="Please select your todos"
                onChange={(e) => setTitle(e.target.value)}
            >
                {TodoTitles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                id="todo-content"
                label="Content"
                variant="outlined"
                onChange={(e) => setContents(e.target.value)}
            />
            <Button
                onClick={onInsertHandle}
                sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    border: '1px solid',
                    borderColor: 'primary.main',
                    '&:hover': {
                        backgroundColor: 'primary.dark',
                        borderColor: 'primary.dark',
                    },
                }}
            >
                Insert
            </Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Completed</TableCell>
                            <TableCell>User Name</TableCell>
                            <TableCell align="left">Category</TableCell>
                            <TableCell align="left">Content</TableCell>
                            <TableCell align="left">Like</TableCell>
                            <TableCell align="left">Update/Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {todos.map((row, index) => (
                            <TableRow
                                key={row.username + index}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell>
                                    <Checkbox
                                        value="completed"
                                        id={`todo${index}`}
                                        onChange={(e) =>
                                            onHandleParam(
                                                row,
                                                'completed',
                                                e.target.checked
                                            )
                                        }
                                        checked={row.completed}
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.username}
                                </TableCell>
                                <TableCell align="left">
                                    <TextField
                                        select
                                        value={row.title}
                                        label="Category"
                                        onChange={(e) =>
                                            onHandleParam(
                                                row,
                                                'title',
                                                e.target.value
                                            )
                                        }
                                        sx={{ width: '100px' }}
                                    >
                                        {TodoTitles.map((option) => (
                                            <MenuItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </TableCell>
                                <TableCell align="left">
                                    <TextField
                                        value={row.contents}
                                        label="Content"
                                        onChange={(e) =>
                                            onHandleParam(
                                                row,
                                                'contents',
                                                e.target.value
                                            )
                                        }
                                    />
                                </TableCell>
                                <TableCell align="left">
                                    <Badge
                                        color="secondary"
                                        badgeContent={row.likeCount}
                                    >
                                        👍
                                    </Badge>
                                    <ButtonGroup>
                                        <Button
                                            aria-label="reduce"
                                            onClick={() => {
                                                onHandleParam(
                                                    row,
                                                    'likeCount',
                                                    row.likeCount - 1
                                                )
                                            }}
                                        >
                                            -
                                        </Button>
                                        <Button
                                            aria-label="increase"
                                            onClick={() => {
                                                onHandleParam(
                                                    row,
                                                    'likeCount',
                                                    row.likeCount + 1
                                                )
                                            }}
                                        >
                                            +
                                        </Button>
                                    </ButtonGroup>
                                </TableCell>
                                <TableCell>
                                    <ButtonGroup>
                                        <Button
                                            onClick={() => onUpdateHandle(row)}
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            onClick={() => onHandleDelete(row)}
                                        >
                                            Delete
                                        </Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Todo
