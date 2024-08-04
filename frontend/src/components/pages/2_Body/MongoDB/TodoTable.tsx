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
    Select,
    FormControl,
    InputLabel,
} from '@mui/material'
import { TodoTitles, TodoTableProps } from '../../../../types/todos/TodoTypes'

const TodoTable: React.FC<TodoTableProps> = ({
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
                        {isAdmin && (
                            <TableCell align="left">
                                <FormControl sx={{ width: '150px' }}>
                                    <InputLabel>Select User</InputLabel>
                                    <Select
                                        value=""
                                        onChange={(e) =>
                                            onSelectUser(
                                                e.target.value as string
                                            )
                                        }
                                    >
                                        <MenuItem value="">
                                            <em>Select User</em>
                                        </MenuItem>
                                        {users.map((user) => (
                                            <MenuItem key={user} value={user}>
                                                {user}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </TableCell>
                        )}
                        <TableCell align="left">Category</TableCell>
                        <TableCell align="left">Content</TableCell>
                        <TableCell align="left">Like</TableCell>
                        <TableCell align="left">Completed</TableCell>
                        <TableCell align="left">
                            Delete
                            {selectAll && (
                                <Checkbox
                                    checked={selectAllDelete}
                                    onChange={onToggleSelectAllDelete}
                                />
                            )}
                        </TableCell>
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
                            {isAdmin && (
                                <TableCell align="left">
                                    {row.username}
                                </TableCell>
                            )}
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
                                    disabled={row.selected ? false : true}
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
                                    disabled={row.selected ? false : true}
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
                                        disabled={row.selected ? false : true}
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
                                        disabled={row.selected ? false : true}
                                    >
                                        +
                                    </Button>
                                </ButtonGroup>
                            </TableCell>
                            <TableCell align="left">
                                <Checkbox
                                    checked={row.completed || false}
                                    disabled={!row.selected}
                                    onChange={() =>
                                        onHandleParam(
                                            row,
                                            'completed',
                                            !row.completed
                                        )
                                    }
                                />
                            </TableCell>
                            <TableCell>
                                <Checkbox
                                    checked={row.delete || false}
                                    disabled={row.selected ? false : true}
                                    onChange={() =>
                                        onHandleParam(
                                            row,
                                            'delete',
                                            !row.delete || false
                                        )
                                    }
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
