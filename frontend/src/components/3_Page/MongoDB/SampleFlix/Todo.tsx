import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Checkbox from '@mui/material/Checkbox'
import {
    Badge,
    Box,
    Button,
    ButtonGroup,
    InputLabel,
    MenuItem,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material'

// Todo 타입 정의
type TodoType = {
    _id?: string
    username: string
    title: string
    contents: string
    likeCount?: number
    completed?: boolean
    time?: Date
}

const TodoTitles = [
    {
        value: 'Prgramming',
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
    // const [todo, setTodo] = useState<TodoType>()
    const [modal, setModal] = useState<boolean>(false)

    const [completed, setCompleted] = useState<boolean>(false)
    const [username, setUsername] = useState('')
    const [title, setTitle] = useState('')
    const [contents, setContents] = useState('')
    const [likeCount, setLikeCount] = useState<number>()

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
    const onChecked = (row: TodoType) => {
        // 해당 항목의 _id를 사용하여 수정할 항목을 찾습니다.
        const updatedTodos = todos.map((todo) =>
            todo._id === row._id
                ? { ...todo, completed: !todo.completed }
                : todo
        )
        // 변경된 배열을 상태로 설정합니다.
        setTodos(updatedTodos)
    }

    const setUserCount = (row: TodoType, count: number) => {
        // const likeCount: number = row.likeCount! + count
        // console.log('likeCount', likeCount)
        // setTodo(row)
        setLikeCount(likeCount! + count)
    }
    const toggleModal = () => setModal(!modal)
    const onHandleDelete = async (row: TodoType) => {
        toggleModal()
        try {
            // Axios를 사용하여 DELETE 요청을 보냅니다.
            const response = await axios.delete(
                `http://localhost:5001/api/todos/${row._id}`
            )
            console.log(response.data) // 삭제 성공 시 서버에서 보낸 응답을 출력합니다.
            fetchTodos()
        } catch (error) {
            console.error('Error deleting user:', error)
            // 삭제 실패에 대한 추가 처리를 여기에 추가하세요
        }
    }

    const onUpdateHandle = async (row: TodoType) => {
        // Update
        try {
            const newTodo: TodoType = {
                // _id: new Date(new Date().getTime()).toString(),
                username,
                title,
                contents,
                likeCount,
                completed,
                time: new Date(),
            }
            // Axios를 사용하여 UPDATE 요청을 보냅니다.
            console.log('UPDATE newTodo:', newTodo)
            const response = await axios.put(
                `http://localhost:5001/api/todos/${row._id}`,
                newTodo
            )

            if (response.status) {
                console.log('OK UPDATE')
                fetchTodos()
            } else {
                alert('ERROR fetch')
            }
            // setCompleted(false)
            setUsername('')
            setTitle('')
            setContents('')
            // setLikeCount(0)
        } catch (error) {
            console.error('Error deleting user:', error)
            // 삭제 실패에 대한 추가 처리를 여기에 추가하세요
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
            // _id: new Date(new Date().getTime()).toString(),
            username,
            title,
            contents,
            likeCount: 0,
            completed: false,
            time: new Date(),
        }
        console.log('onInsertHandle:', newTodo)
        // Axios를 사용하여 POST 요청을 보냅니다.
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
        // TODO
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
            <Modal
                open={modal}
                onClose={toggleModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Are you want to delete?
                    </Typography>
                </Box>
            </Modal>
            <h1>Todos</h1>

            {/* Input area */}
            <TextField
                id="toto-username"
                label="User Name"
                variant="outlined"
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                id="todo-title"
                select
                label="Select"
                helperText="Please select your todos"
                onChange={(e) => setTitle(e.target.value)}
            >
                {TodoTitles.map((option) => (
                    <MenuItem
                        key="todo-title-key"
                        id="todo-title"
                        value={option.value}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                id="toto-content"
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
                            <TableCell align="left">Title</TableCell>
                            <TableCell align="left">Content</TableCell>
                            <TableCell align="left">Like</TableCell>
                            <TableCell align="left">Delete Item</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {todos.map((row, index) => (
                            <TableRow
                                key={row.username}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <Checkbox
                                    value="completed"
                                    id={`todo${index}`}
                                    onChange={() => onChecked(row)}
                                    checked={row.completed}
                                />
                                <TableCell
                                    key="username"
                                    component="th"
                                    scope="row"
                                >
                                    {row.username}
                                </TableCell>
                                <TextField
                                    id="todo-title"
                                    select
                                    label={showSelectTitle(row.title)}
                                    helperText="Please select your todos"
                                    onChange={(e) => setTitle(e.target.value)}
                                >
                                    {TodoTitles.map((option) => (
                                        <MenuItem
                                            key="todo-title-key"
                                            id="todo-title"
                                            value={option.value}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TableCell key="content" align="left">
                                    <TextField
                                        label={row.contents}
                                        onChange={(e) =>
                                            setContents(e.target.value)
                                        }
                                    />
                                </TableCell>
                                <TableCell key="likeCount" align="left">
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
                                <ButtonGroup>
                                    <Button onClick={() => onHandleDelete(row)}>
                                        Delete
                                    </Button>
                                    <Button onClick={() => onUpdateHandle(row)}>
                                        Update
                                    </Button>
                                </ButtonGroup>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
export default Todo
