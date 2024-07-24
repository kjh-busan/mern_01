/// <reference types="jest" />

import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider, useAtom } from 'jotai'
import { Page } from '../../src/components/Page'
import { usernameAtom } from '../../src/atoms/atoms'
import { Header } from '../../src/components/pages/1_Headers/Header'
import Footer from '../../src/components/pages/9_Footers/Footer'
import Todo from '../../src/components/pages/2_Body/MongoDB/Todo'

// Ensure the paths below are correct
jest.mock('../../src/components/pages/1_Headers/Header', () => ({
    __esModule: true,
    Header: () => <div>Mock Header</div>,
}))
jest.mock('../../src/components/pages/9_Footers/Footer', () => ({
    __esModule: true,
    Footer: () => <div>Mock Footer</div>,
}))
jest.mock('../../src/components/pages/2_Body/MongoDB/Todo', () => ({
    __esModule: true,
    Todo: () => <div>Mock Todo</div>,
}))
jest.mock('../../src/components/image/CenteredImage', () => ({
    __esModule: true,
    CenteredImage: () => <img alt="Centered" />,
}))
jest.mock('../../src/components/login/LoginModal', () => ({
    __esModule: true,
    LoginModal: ({ open }: { open: boolean }) =>
        open ? <div role="dialog">Mock LoginModal</div> : null,
}))

const MockProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [, setUsername] = useAtom(usernameAtom)
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
            expect(screen.getByText('Mock Todo')).toBeInTheDocument()
        })
    })

    it('when the login modal is open, it should render the LoginModal component in open state', () => {
        // Mock the usePageHooks to return isLoginModalOpen as true
        jest.mock('../../src/hooks/pages/PageHooks', () => ({
            usePageHooks: () => ({
                isLoginModalOpen: true,
                onLogin: jest.fn(),
                handleCloseLoginModal: jest.fn(),
            }),
        }))

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
