// import { atom } from 'recoil';
import { persistAtom } from "./atoms"

interface AdminInfo {
  id: number,
  username: string,
  location: string,
  name: string
}


export const adminInfoState = persistAtom<AdminInfo | null>('adminInfoState', null)