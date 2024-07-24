import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'jotai'
import { Page } from '../../src/components/Page'
import { usePageHooks } from '../../src/hooks/pages/PageHooks'
import 'jest-given'
import { given } from 'jest-given'

jest.mock('../../src/hooks/pages/PageHooks', () => ({
    usePageHooks: jest.fn(),
}))

const MockHeader = () => <div>Header</div>
const MockFooter = () => <div>Footer</div>
const MockTodo = () => <div>Todo</div>
const MockCenteredImage = () => <div>CenteredImage</div>
const MockLoginModal = ({
    open,
    onClose,
    onLogin,
}: {
    open: boolean
    onClose: () => void
    onLogin: (username: string) => void
}) => <div>{open ? 'LoginModal Open' : 'LoginModal Closed'}</div>

jest.mock('../../src/components/pages/1_Headers/Header', () => ({
    Header: MockHeader,
}))
jest.mock('../../src/components/9_Footers/Footer', () => ({
    Footer: MockFooter,
}))
jest.mock('../../src/components/pages/2_Body/MongoDB/Todo', () => ({
    Todo: MockTodo,
}))
jest.mock('../../src/components/image/CenteredImage', () => ({
    CenteredImage: MockCenteredImage,
}))
jest.mock('../../src/components/login/LoginModal', () => ({
    LoginModal: MockLoginModal,
}))

describe('Page Component', () => {
    beforeEach(() => {
        ;(usePageHooks as jest.Mock).mockReturnValue({
            isLoginModalOpen: false,
            onLogin: jest.fn(),
            handleCloseLoginModal: jest.fn(),
        })
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('when the user is not logged in', () => {
        given('the user is not logged in', () => {
            ;(usePageHooks as jest.Mock).mockReturnValue({
                isLoginModalOpen: false,
                onLogin: jest.fn(),
                handleCloseLoginModal: jest.fn(),
            })
        })

        then('it should render the CenteredImage component', () => {
            render(
                <Provider>
                    <Page />
                </Provider>
            )

            expect(screen.getByText('Header')).toBeInTheDocument()
            expect(screen.getByText('Footer')).toBeInTheDocument()
            expect(screen.getByText('CenteredImage')).toBeInTheDocument()
            expect(screen.queryByText('Todo')).not.toBeInTheDocument()
        })
    })

    describe('when the user is logged in', () => {
        given('the user is logged in', () => {
            ;(usePageHooks as jest.Mock).mockReturnValue({
                isLoginModalOpen: false,
                onLogin: jest.fn(),
                handleCloseLoginModal: jest.fn(),
            })
            localStorage.setItem('username', 'testuser')
        })

        then('it should render the Todo component', () => {
            render(
                <Provider>
                    <Page />
                </Provider>
            )

            expect(screen.getByText('Header')).toBeInTheDocument()
            expect(screen.getByText('Footer')).toBeInTheDocument()
            expect(screen.queryByText('CenteredImage')).not.toBeInTheDocument()
            expect(screen.getByText('Todo')).toBeInTheDocument()
        })
    })

    describe('when the login modal is open', () => {
        given('the login modal is open', () => {
            ;(usePageHooks as jest.Mock).mockReturnValue({
                isLoginModalOpen: true,
                onLogin: jest.fn(),
                handleCloseLoginModal: jest.fn(),
            })
        })

        then('it should render the LoginModal component in open state', () => {
            render(
                <Provider>
                    <Page />
                </Provider>
            )

            expect(screen.getByText('LoginModal Open')).toBeInTheDocument()
        })
    })
})
function then(arg0: string, arg1: () => void) {
    throw new Error('Function not implemented.')
}
