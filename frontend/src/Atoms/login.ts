// import { atom } from 'recoil'

import { persistAtom } from "./atoms"

export const loginAtom = persistAtom<boolean>('loginAtom', false)