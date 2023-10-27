import { atom } from 'jotai';

export const userAtom = atom({
  id: "",
  token: "",
  isLoggedIn: false,
});
