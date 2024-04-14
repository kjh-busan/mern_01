import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Users } from '../../2_Body/Page/MongoDB'
import { Button, Checkbox, TextField } from '@mui/material'
import axios from 'axios'

// BasicTable 컴포넌트의 props 타입 정의
type BasicTableProps = {
    searchResults: Users[] // searchResults 속성 추가
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

export default function BasicTable({ searchResults }: BasicTableProps) {
    const [checkedItems, setCheckedItems] = React.useState<{
        [key: string]: boolean
    }>({})
    const [name, setName] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [email, setEmail] = React.useState('')

    const handleCheckbox = (name: string) => {
        setCheckedItems((prevState) => ({
            ...prevState,
            [name]: !prevState[name], // 현재 상태의 반대로 변경
        }))
        console.log(`checkedItems: `, checkedItems)
    }

    const handleDelete = async (row: Users) => {
        const userId = row._id // 사용자의 _id를 추출합니다.
        try {
            // Axios를 사용하여 DELETE 요청을 보냅니다.
            const response = await axios.delete(
                `http://localhost:5001/api/users/${userId}`
            )
            console.log(response.data) // 삭제 성공 시 서버에서 보낸 응답을 출력합니다.
            // 삭제 성공에 따른 추가 작업을 여기에 추가하세요
        } catch (error) {
            console.error('Error deleting user:', error)
            // 삭제 실패에 대한 추가 처리를 여기에 추가하세요
        }
    }

    const handleCreate = async () => {
        try {
            const newUser: Users = {
                name: name,
                email: email,
                password: password,
                handleSearch: function (): void {
                    throw new Error('Function not implemented.')
                },
                handleSearchUser: function (row: Users): void {
                    throw new Error('Function not implemented.')
                },
                fetchUsers: function (): void {
                    throw new Error('Function not implemented.')
                },
            }
            console.log(`newUser:${newUser}`)
            // Axios를 사용하여 POST 요청을 보냅니다.
            const response = await axios.post(
                'http://localhost:5001/api/users',
                newUser
            )
            console.log(response.data) // 삽입된 사용자 정보를 콘솔에 출력합니다.
            // 삽입 성공에 따른 추가 작업을 여기에 추가하세요
            return response.data // 삽입된 사용자 정보를 반환합니다.
        } catch (error) {
            console.error('Error inserting user:', error)
            // 삽입 실패에 대한 추가 처리를 여기에 추가하세요
            throw error // 에러를 다시 던져서 상위 레벨에서 처리할 수 있도록 합니다.
        }
    }

    React.useEffect(() => {
        // checked가 true인 것만 남기기
        setCheckedItems((prevState) => {
            const newState: { [key: string]: boolean } = {}
            Object.keys(prevState).forEach((key) => {
                if (prevState[key]) {
                    newState[key] = true
                }
            })
            return newState
        })
    }, []) // 빈 배열로 의존성을 제거하여 useEffect가 한 번만 실행되도록 설정

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">
                            <TextField
                                onChange={(e) => setName(e.target.value)}
                                label="name"
                            />
                            <TextField
                                onChange={(e) => setPassword(e.target.value)}
                                label="password"
                            />
                            <TextField
                                onChange={(e) => setEmail(e.target.value)}
                                label="email"
                            />
                            <Button
                                variant="contained"
                                color="info"
                                onClick={() => handleCreate()}
                            >
                                Insert
                            </Button>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="right">☑️</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {searchResults.map((row, index) => (
                        <TableRow
                            key={row.name}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                <Checkbox
                                    id={`checkout-${index}`}
                                    {...label}
                                    checked={checkedItems[row.name] || false} // 해당 항목의 checked 상태를 checkedItems에서 가져옴
                                    onChange={() => handleCheckbox(row.name)} // 체크 상태 변경 시 handleCheckbox 호출
                                />
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.name}
                                {checkedItems[row.name] && ( // Checkbox가 선택된 경우에만 버튼 표시
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleDelete(row)}
                                    >
                                        Delete
                                    </Button>
                                )}
                            </TableCell>
                            <TableCell align="right">{row.email}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
