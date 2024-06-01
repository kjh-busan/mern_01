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
    TableContainer,
    Button,
    ButtonGroup,
} from '@mui/material'
import { TodoTitles, TodoTableProps } from '../../../../types/todos/TodoTypes'

const TodoTable: React.FC<TodoTableProps> = ({
    todos,
    onHandleParam,
    onSelectRow,
    onToggleEditMode,
    onToggleSelectAll,
    selectAll,
}) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Checkbox
                                checked={selectAll}
                                onChange={onToggleSelectAll}
                            />
                        </TableCell>
                        <TableCell>User Name</TableCell>
                        <TableCell align="left">Category</TableCell>
                        <TableCell align="left">Content</TableCell>
                        <TableCell align="left">Like</TableCell>
                        <TableCell align="left">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {todos.map((row) => (
                        <TableRow
                            key={row._id?.toString()}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell>
                                <Checkbox
                                    checked={row.selected || false}
                                    onChange={() => onSelectRow(row._id!)}
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
                                    disabled={!row.editMode}
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
                                    disabled={!row.editMode}
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
                                        disabled={!row.editMode}
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
                                        disabled={!row.editMode}
                                    >
                                        +
                                    </Button>
                                </ButtonGroup>
                            </TableCell>
                            <TableCell>
                                <Checkbox
                                    checked={row.delete || false}
                                    disabled={!row.editMode}
                                    onChange={() => onToggleEditMode(row._id!)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TodoTable
