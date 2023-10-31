import { atom } from 'jotai';

export const guessesAtom = atom([]);

export const currentGuessAtom = atom(['','','','','']);


export const gameOverAtom = atom(false);

export const gameWonAtom = atom(false);
