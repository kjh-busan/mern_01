import { render, screen } from '@testing-library/react'
import { Provider, useAtom } from 'jotai'
import { Page } from '../../src/components/Page'
import Todo from '../../src/components/pages/2_Body/MongoDB/Todo'
import { Header } from '../../src/components/1_Headers/Header'
import { usernameAtom } from '../../src/atoms/atoms'
import Footer from '../../src/components/9_Footers/Footer'

// Ensure the paths below are correct
jest.mock('../../src/components/1_Headers/Header', () => ({
    Header: Header,
}))
jest.mock('../../src/components/9_Footers/Footer', () => ({
    Footer: Footer,
}))
jest.mock('../../src/components/pages/2_Body/MongoDB/Todo', () => ({
    Todo: Todo,
}))

const MockProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [username, setUsername] = useAtom(usernameAtom)
    ;(global as any).setUsername = setUsername // global scope에 setUsername 추가
    return <Provider>{children}</Provider>
}

describe('Page Component', () => {
    it('when the user is not logged in, it should render the CenteredImage component', () => {
        render(
            <MockProvider>
                <Page />
            </MockProvider>
        )
        given('usernameAtom', null)
        then(() => {
            expect(screen.getByAltText('Centered')).toBeInTheDocument()
        })
    })

    it('when the user is logged in, it should render the Todo component', () => {
        given('usernameAtom', 'testUser')
        render(
            <MockProvider>
                <Page />
            </MockProvider>
        )
        then(() => {
            expect(screen.getByText('testUser’s Todos')).toBeInTheDocument()
        })
    })

    it('when the login modal is open, it should render the LoginModal component in open state', () => {
        given('isLoginModalOpen', true)
        render(
            <MockProvider>
                <Page />
            </MockProvider>
        )
        then(() => {
            expect(screen.getByRole('dialog')).toBeInTheDocument()
        })
    })
})

function given(atomName: string, value: any) {
    switch (atomName) {
        case 'usernameAtom':
            ;(global as any).setUsername(value)
            break
        default:
            throw new Error(`Unknown atom: ${atomName}`)
    }
}

function then(assertion: () => void) {
    try {
        assertion()
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Assertion failed: ${error.message}`)
        } else {
            throw new Error('Unknown assertion error')
        }
    }
}
