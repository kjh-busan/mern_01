import { atom } from 'jotai'

export const usernameAtom = atom<string | null>(null)
export const isAdminAtom = atom<boolean>((get) => get(usernameAtom) === 'admin')
