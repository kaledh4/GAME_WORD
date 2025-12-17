import { letterColors } from "../data/letters-list";

export function compare(word: any, rightWord: any): (string | null)[] {
  const { letterAbsent, letterExist, letterRight } = letterColors;
  const lettersColors = [];
  const rightWordCopy = [...rightWord]; // Don't mutate original
  
  // Check if letter exists in the right place
  for (let i = 0; i < 4; i++) {
    if (word[i] === rightWordCopy[i]) {
      lettersColors.push(letterRight);
      rightWordCopy[i] = null;
    } else {
      lettersColors.push(null);
    }
  }
  // Check letter if exists or not
  for (let i = 0; i < 4; i++) {
    // Check empty spot letters colors array
    if (!lettersColors[i]) {
      const letterPosition = rightWordCopy.indexOf(word[i]);
      if (letterPosition !== -1) {
        lettersColors[i] = letterExist;
        rightWordCopy[letterPosition] = null;
      } else {
        lettersColors[i] = letterAbsent;
      }
    }
  }

  return lettersColors;
}
