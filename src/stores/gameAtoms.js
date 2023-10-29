import { atom } from 'jotai';

export const currentGuessAtom = atom([]);

export const guessCounterAtom = atom(0);

export const gameOverAtom = atom(false);

export const gameWonAtom = atom(false);
