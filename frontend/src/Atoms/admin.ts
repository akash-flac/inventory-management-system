// import { atom } from 'recoil';
import { persistAtom } from "./atoms"

interface AdminInfo {
  id: number,
  username: string,
  location: string,
  name: string
}

// export const adminInfoState = atom<AdminInfo | null>({
//     key: 'adminInfoState', // unique ID (with respect to other atoms/selectors)
//     default: null, // default value (aka initial value)  
//   });


export const adminInfoState = persistAtom<AdminInfo | null>('adminInfoState', null)