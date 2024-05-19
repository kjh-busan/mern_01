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

export type TodoType = {
    _id?: string
    username: string
    title: string
    contents: string
    likeCount: number
    completed: boolean
    time?: Date
}

export type TodoTableProps = {
    todos: TodoType[]
    onHandleParam: (row: TodoType, field: keyof TodoType, value: any) => void
    onUpdateHandle: (row: TodoType) => void
    onHandleDelete: (row: TodoType) => void
}

export type TodoHeaderProps = {
    username: string
    setUsername: (value: string) => void
    title: string
    setTitle: (value: string) => void
    contents: string
    setContents: (value: string) => void
    onInsertHandle: () => void
}
