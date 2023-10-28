import { atom } from 'jotai';

export const userAtom = atom({
  id: "",
  token: "",
  username: "",
  isLoggedIn: false,
});
