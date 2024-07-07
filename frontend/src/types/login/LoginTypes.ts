export interface LoginModalProps {
    open: boolean
    onClose?: () => void
    onLogin?: () => void
    handleLoginClick?: () => void
    handleSignUpClick?: (event: React.MouseEvent) => void
    isSignUpModalOpen?: boolean
    setSignUpModalOpen?: React.Dispatch<React.SetStateAction<boolean>>
    handleSignUpClose?: () => void
}

export interface LogInProps {
    onClose: () => void
    onLogin: () => void
}
