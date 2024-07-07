export {}

export interface HeaderProps {
    user: { name: string } | undefined
    onLogin: (userName: string) => void
    onLogout: () => void
}
