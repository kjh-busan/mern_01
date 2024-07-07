import { User } from '../user/UserType'

export interface HeaderProps {
    user?: User
    onLogin?: (userName: string) => void
    onLogout?: () => void
    onCreateAccount?: () => void
}
