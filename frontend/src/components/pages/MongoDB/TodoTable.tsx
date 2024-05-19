import React from 'react'
import {
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Checkbox,
    TextField,
    MenuItem,
    Badge,
    ButtonGroup,
    Button,
    TableContainer,
} from '@mui/material'
import { TodoTableProps, TodoTitles } from '../../../types/todos/TodoTypes'

export type TodoType = {
    _id?: string
    username: string
    title: string
    contents: string
    likeCount: number
    completed: boolean
    time?: Date
}

/**
 *
 * @param param0
 * @returns
 */
const TodoTable: React.FC<TodoTableProps> = ({
    todos,
    onHandleParam,
    onUpdateHandle,
    onHandleDelete,
}) => {
    return (
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
                                    <Button onClick={() => onUpdateHandle(row)}>
                                        Update
                                    </Button>
                                    <Button onClick={() => onHandleDelete(row)}>
                                        Delete
                                    </Button>
                                </ButtonGroup>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TodoTable
