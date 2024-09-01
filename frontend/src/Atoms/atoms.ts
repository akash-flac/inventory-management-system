import { atom, AtomEffect, RecoilState } from 'recoil';

const localStorageEffect = (key: string): AtomEffect<any> => ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
  
    onSet((newValue, _, isReset) => {
      if (isReset) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

  // Define the persistAtom function with appropriate types
export const persistAtom = <T>(key: string, defaultValue: T): RecoilState<T> => atom<T>({
    key,
    default: defaultValue,
    effects: [localStorageEffect(key)]
  });