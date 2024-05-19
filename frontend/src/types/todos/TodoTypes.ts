import { Types } from 'mongoose'

export type TodoType = {
    _id?: Types.ObjectId
    username: string
    title: string
    contents: string
    likeCount: number
    completed: boolean
    time?: Date
    selected?: boolean
    editMode?: boolean
    delete?: boolean
}

export type TodoHeaderProps = {
    username: string
    setUsername: (value: string) => void
    title: string
    setTitle: (value: string) => void
    contents: string
    setContents: (value: string) => void
    onInsertHandle: () => void
    onUpdateSelected: () => void
}

export type TodoTableProps = {
    todos: TodoType[]
    onHandleParam: (row: TodoType, field: keyof TodoType, value: any) => void
    onSelectRow: (id: Types.ObjectId) => void
    onToggleEditMode: (id: Types.ObjectId) => void
    onToggleSelectAll: () => void
    selectAll: boolean
}

export const TodoTitles = [
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
