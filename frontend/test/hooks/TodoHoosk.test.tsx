import React, { ReactNode } from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import axios from 'axios'
import { Provider } from 'jotai'
import { useTodoHooks } from '../../src/hooks/todos/TodoHooks'
import { TodoType } from '../../src/types/todos/TodoTypes'
import { usernameAtom } from '../../src/atoms/atoms'
import { Types } from 'mongoose'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('useTodoHooks', () => {
    const Wrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
        <Provider>{children}</Provider>
    )

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should initialize with correct default values', () => {
        const { result } = renderHook(() => useTodoHooks(), {
            wrapper: Wrapper,
        })

        expect(result.current.todos).toEqual([])
        expect(result.current.todosOri).toEqual([])
        expect(result.current.title).toBe('Programming')
        expect(result.current.contents).toBe('')
        expect(result.current.message).toBeNull()
        expect(result.current.selectAll).toBe(false)
        expect(result.current.selectAllDelete).toBe(false)
        expect(result.current.open).toBe(false)
        expect(result.current.severity).toBe('error')
    })

    it('should fetch todos and set state correctly', async () => {
        const mockTodos: TodoType[] = [
            {
                _id: new Types.ObjectId(),
                username: 'testUser',
                title: 'Test Todo',
                contents: 'This is a test todo',
                likeCount: 0,
                completed: false,
                time: new Date(),
            },
        ]

        mockedAxios.get.mockResolvedValue({ data: mockTodos })

        const { result, waitForNextUpdate } = renderHook(() => useTodoHooks(), {
            wrapper: Wrapper,
        })

        await waitForNextUpdate()

        expect(mockedAxios.get).toHaveBeenCalledWith(
            'http://localhost:5001/api/todos?username=testUser'
        )
        expect(result.current.todos).toEqual(mockTodos)
        expect(result.current.todosOri).toEqual(mockTodos)
    })

    it('should handle param updates', () => {
        const mockTodo: TodoType = {
            _id: new Types.ObjectId(),
            username: 'testUser',
            title: 'Test Todo',
            contents: 'This is a test todo',
            likeCount: 0,
            completed: false,
            time: new Date(),
        }

        const { result } = renderHook(() => useTodoHooks(), {
            wrapper: Wrapper,
        })

        act(() => {
            result.current.onHandleParam(mockTodo, 'title', 'Updated Title')
        })

        expect(result.current.todos[0]).toEqual({
            ...mockTodo,
            title: 'Updated Title',
        })
    })

    it('should handle delete', async () => {
        const mockTodo: TodoType = {
            _id: new Types.ObjectId(),
            username: 'testUser',
            title: 'Test Todo',
            contents: 'This is a test todo',
            likeCount: 0,
            completed: false,
            time: new Date(),
        }

        mockedAxios.delete.mockResolvedValue({ status: 200 })

        const { result } = renderHook(() => useTodoHooks(), {
            wrapper: Wrapper,
        })

        await act(async () => {
            await result.current.onHandleDelete(mockTodo)
        })

        expect(mockedAxios.delete).toHaveBeenCalledWith(
            `http://localhost:5001/api/todos/${mockTodo._id}`
        )
    })

    it('should handle updates correctly', async () => {
        const mockTodo: TodoType = {
            _id: new Types.ObjectId(),
            username: 'testUser',
            title: 'Test Todo',
            contents: 'This is a test todo',
            likeCount: 0,
            completed: false,
            time: new Date(),
        }

        mockedAxios.put.mockResolvedValue({ status: 200 })

        const { result } = renderHook(() => useTodoHooks(), {
            wrapper: Wrapper,
        })

        await act(async () => {
            await result.current.onUpdateHandle(mockTodo)
        })

        expect(mockedAxios.put).toHaveBeenCalledWith(
            `http://localhost:5001/api/todos/${mockTodo._id}`,
            {
                ...mockTodo,
                time: new Date(),
            }
        )
    })

    it('should handle insertions correctly', async () => {
        const newTodo: TodoType = {
            username: 'testUser',
            title: 'Programming',
            contents: 'This is a new todo',
            likeCount: 0,
            completed: false,
            time: new Date(),
        }

        mockedAxios.post.mockResolvedValue({ status: 201 })

        const { result } = renderHook(() => useTodoHooks(), {
            wrapper: Wrapper,
        })

        act(() => {
            result.current.setContents('This is a new todo')
        })

        await act(async () => {
            await result.current.onInsertHandle()
        })

        expect(mockedAxios.post).toHaveBeenCalledWith(
            'http://localhost:5001/api/todos',
            newTodo
        )
    })

    it('should toggle select all correctly', () => {
        const mockTodos: TodoType[] = [
            {
                _id: new Types.ObjectId(),
                username: 'testUser',
                title: 'Test Todo',
                contents: 'This is a test todo',
                likeCount: 0,
                completed: false,
                time: new Date(),
            },
        ]

        const { result } = renderHook(() => useTodoHooks(), {
            wrapper: Wrapper,
        })

        act(() => {
            result.current.onToggleSelectAll()
        })

        expect(result.current.todos[0].selected).toBe(true)
        expect(result.current.selectAll).toBe(true)
    })

    it('should handle snackbar close', () => {
        const { result } = renderHook(() => useTodoHooks(), {
            wrapper: Wrapper,
        })

        act(() => {
            result.current.onHandleMessage('Test Message', 'error')
        })

        act(() => {
            result.current.handleClose()
        })

        expect(result.current.open).toBe(false)
    })
})
