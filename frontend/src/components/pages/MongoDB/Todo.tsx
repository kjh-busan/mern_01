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
    const [titleItem, setTitleItem] = useState('Programming')
    const [contents, setContents] = useState('')

    useEffect(() => {
        fetchTodos()
    }, [])

    const fetchTodos = async (name = '') => {
        try {
            const response = await axios.get<TodoType[]>(
                `http://localhost:5001/api/todos`
            )
            response && setTodos(response.data)
        } catch (error) {
            console.error('Error fetching todos:', error)
        }
    }

    const onCompleted = (row: TodoType) => {
        const updatedTodo = todos.map((todo) =>
            todo._id === row._id
                ? { ...todo, completed: !todo.completed }
                : todo
        )
        setTodos(updatedTodo)
    }

    const setUserCount = (row: TodoType, count: number) => {
        const updatedTodo = todos.map((todo) =>
            todo._id === row._id
                ? {
                      ...todo,
                      likeCount: todo.likeCount
                          ? todo.likeCount + count
                          : count,
                  }
                : todo
        )
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
        // Update
        try {
            const newTodo: TodoType = {
                username,
                title: titleItem,
                contents,
                likeCount: row.likeCount,
                completed: row.completed,
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
        // validate check
        if (checkoutInsert()) {
            return
        }

        // Insert
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

    const showSelectTitle = (titleValue: string) => {
        const selectedItem = TodoTitles.find((t) => t.value === titleValue)
        return (
            <MenuItem
                key="todo-title-key"
                id="todo-title"
                defaultValue={selectedItem?.value}
            >
                {selectedItem?.label}
            </MenuItem>
        )
    }
    return (
        <div>
            <h1>Todos</h1>
            {/* Input area */}
            <TextField
                id="todo-username"
                label="User Name"
                variant="outlined"
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                id="todo-title"
                select
                label="Category Select"
                value={title} // 초기값 설정
                helperText="Please select your todos"
                onChange={(e) => setTitle(e.target.value)} // 선택된 값을 title 상태에 저장
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
            <Button onClick={onInsertHandle}>Insert</Button>
            {/* contents area */}
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
                                        onChange={() => onCompleted(row)}
                                        checked={row.completed}
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.username}
                                </TableCell>
                                <TableCell align="left">
                                    <TextField
                                        select
                                        label={showSelectTitle(row.title)}
                                        onChange={(e) =>
                                            setTitleItem(e.target.value)
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
                                        label={row.contents}
                                        onChange={(e) =>
                                            setContents(e.target.value)
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
                                                setUserCount(row, -1)
                                            }}
                                        >
                                            -
                                        </Button>
                                        <Button
                                            aria-label="increase"
                                            onClick={() => {
                                                setUserCount(row, +1)
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
