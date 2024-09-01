// import { atom } from 'recoil'

import { persistAtom } from "./atoms"

// export const loginAtom = atom({
//     key: 'loginAtom', // unique ID (with respect to other atoms/selectors)
//     default: false, // default value (aka initial value)
//     effects: [localStorageEffect(key)]
//   });



export const loginAtom = persistAtom<boolean>('loginAtom', false)