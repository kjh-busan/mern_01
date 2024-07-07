export interface LoginModalProps {
    open: boolean
    onClose?: () => void
    onLogin?: (userName: string) => void
}

export interface LogInProps {
    onClose: () => void
    onLogin: (userName: string) => void
}
