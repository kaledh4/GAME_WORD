import { useState, useEffect, useRef, useMemo } from "react";
import { compare } from "../utils/compare";
import { wordsList, getWordOfTheDay } from "../data/words-list";
import { keyboardRows } from "../data/keyboard-layout";
import { letterColors } from "../data/letters-list";
import { saveGameResult } from "../utils/stats";
import Row from "./Row";
import Toast from "./Toast";
import magicIcon from "./icons/icons8-magic-48.png";
import speedIcon from "./icons/icons8-speed-48.png";

interface Props {
  wordColors: any[];
  setWordColors: React.Dispatch<React.SetStateAction<any[]>>;
  setCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
  setGameResult: React.Dispatch<React.SetStateAction<string>>;
  onNewGame: () => void;
  onMagicHelpUsed: () => void;
  setInfoModalType: React.Dispatch<React.SetStateAction<"settings" | "menu" | null>>;
}

const Board = ({ wordColors, setWordColors, setCloseModal, setGameResult, onNewGame, onMagicHelpUsed, setInfoModalType }: Props) => {
  const rightWord = useMemo(() => getWordOfTheDay(), []);

  let wordIndexRef = useRef(0);

  const [keyboardState, setKeyboardState] = useState<{ [key: string]: string }>({});
  const [boardWords, setBoardWords] = useState<Array<any>>([[], [], [], [], [], []]);
  const [isErrors, setIsErrors] = useState<Array<boolean>>([]);
  const [disableKeyBoard, setDisableKeyboard] = useState<boolean>(false);
  const [toastData, setToastData] = useState<Array<any>>([]);

  const typedWord = boardWords[wordIndexRef.current]?.join("");

  const handleErrorInWord = (): void => {
    const newErrors = [...isErrors];
    newErrors[wordIndexRef.current] = true;
    setIsErrors(newErrors);
  };

  const addLetterToBoard = (key: string): void => {
    setBoardWords((prev) => {
      const newBoardWords = [...prev];
      const currentRow = [...(newBoardWords[wordIndexRef.current] || [])];

      // Find the first empty position
      for (let i = 0; i < 4; i++) {
        if (!currentRow[i]) {
          currentRow[i] = key;
          break;
        }
      }

      newBoardWords[wordIndexRef.current] = currentRow;
      return newBoardWords;
    });
  };

  const deleteLetterFromBoard = (): void => {
    setBoardWords((prev) => {
      const newBoardWords = [...prev];
      const currentRow = [...(newBoardWords[wordIndexRef.current] || [])];

      // Find and remove the last filled position
      for (let i = 3; i >= 0; i--) {
        if (currentRow[i]) {
          currentRow[i] = undefined;
          break;
        }
      }

      newBoardWords[wordIndexRef.current] = currentRow;
      return newBoardWords;
    });
  };

  const useMagicHelp = (): void => {
    if (disableKeyBoard || boardWords[wordIndexRef.current - 1]?.join("") === rightWord) return;

    onMagicHelpUsed();

    const solvedIndices = new Set<number>();
    wordColors.forEach((rowColors) => {
      rowColors.forEach((color: string, index: number) => {
        if (color === letterColors.letterRight) {
          solvedIndices.add(index);
        }
      });
    });

    const revealablePositions = [0, 1, 2, 3];
    const availablePositions = revealablePositions.filter((index) => {
      const currentRow = boardWords[wordIndexRef.current] || [];
      return !currentRow[index] && !solvedIndices.has(index);
    });

    if (availablePositions.length === 0) {
      setToastData((prev) => [...prev, "لا توجد حروف جديدة للكشف!"]);
      return;
    }

    const index = availablePositions[Math.floor(Math.random() * availablePositions.length)];
    const chars = rightWord.split("");

    setBoardWords((prev) => {
      const newBoardWords = [...prev];
      const currentRow = [...(newBoardWords[wordIndexRef.current] || [])];
      currentRow[index] = chars[index];
      newBoardWords[wordIndexRef.current] = currentRow;
      return newBoardWords;
    });

    setToastData((prev) => [...prev, "تم كشف حرف جديد!"]);
  };

  const useAccelerate = (): void => {
    if (disableKeyBoard || wordIndexRef.current >= 4) return;

    const accelerateWords = ["ايمن", "سلوك", "تهدف", "برقع"];
    const newBoardWords = [...boardWords];
    const newWordColors = [...wordColors];
    const newKeyboardState = { ...keyboardState };

    let stopAt = 4;
    for (let i = 0; i < 4; i++) {
      const word = accelerateWords[i];
      const wordChars = word.split("");
      newBoardWords[i] = wordChars;
      const resultColors = compare(wordChars, rightWord.split(""));

      if (i < newWordColors.length) {
        newWordColors[i] = resultColors;
      } else {
        newWordColors.push(resultColors);
      }

      wordChars.forEach((char, charIndex) => {
        const color = resultColors[charIndex];
        const currentColor = newKeyboardState[char];
        if (color === letterColors.letterRight) {
          newKeyboardState[char] = letterColors.letterRight;
        } else if (color === letterColors.letterExist && currentColor !== letterColors.letterRight) {
          newKeyboardState[char] = letterColors.letterExist;
        } else if (color === letterColors.letterAbsent && !currentColor) {
          newKeyboardState[char] = letterColors.letterAbsent;
        }
      });

      if (word === rightWord) {
        stopAt = i + 1;
        break;
      }
    }

    setBoardWords(newBoardWords);
    setWordColors(newWordColors);
    setKeyboardState(newKeyboardState);
    wordIndexRef.current = stopAt;

    setToastData((prev) => [...prev, "تم التسريع!"]);
  };

  const handleEnter = (): void => {
    if (typedWord.length === 4) {
      if (wordsList.includes(typedWord)) {
        setDisableKeyboard(true);
        const newWordColors = [...wordColors];
        const resultColors = compare(typedWord.split(""), rightWord.split(""));
        newWordColors.push(resultColors);
        setWordColors(newWordColors);
        wordIndexRef.current++;
      } else {
        handleErrorInWord();
        if (toastData.length < 6) {
          setToastData([...toastData, "لا توجد في لائحة الكلمات"]);
        }
      }
    } else if (typedWord.length < 4) {
      handleErrorInWord();
      if (toastData.length < 6) {
        setToastData([...toastData, "عدد الحروف غير كاف"]);
      }
    }
  };

  const handleKeyboardClick = (key: string): void => {
    if (disableKeyBoard) return;
    if (key === "Backspace") {
      if (typedWord.length > 0) deleteLetterFromBoard();
    } else if (key === "Enter") {
      handleEnter();
    } else {
      if (typedWord.length < 4) addLetterToBoard(key);
    }
  };

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (disableKeyBoard) return;
      if (/[\u0600-\u06FF]/.test(e.key) && e.key.length === 1 && typedWord?.length < 4) {
        addLetterToBoard(e.key);
      }
      if (e.key === "Backspace" && typedWord?.length > 0) {
        deleteLetterFromBoard();
      }
      if (e.key === "Enter") {
        handleEnter();
      }
    };
    window.addEventListener("keyup", listener);
    return () => {
      window.removeEventListener("keyup", listener);
    };
  });

  useEffect(() => {
    if (isErrors[wordIndexRef.current]) {
      setTimeout(() => {
        const newErrors = [...isErrors];
        newErrors[wordIndexRef.current] = false;
        setIsErrors(newErrors);
      }, 400);
    }
  }, [isErrors]);

  useEffect(() => {
    if (wordColors[wordIndexRef.current - 1]?.length === 4) {
      const currentWordColors = wordColors[wordIndexRef.current - 1];
      const currentWord = boardWords[wordIndexRef.current - 1];

      setTimeout(() => {
        setKeyboardState((prev) => {
          const newState = { ...prev };
          currentWord.forEach((char: string, index: number) => {
            const color = currentWordColors[index];
            const currentColor = newState[char];
            if (color === letterColors.letterRight) {
              newState[char] = letterColors.letterRight;
            } else if (color === letterColors.letterExist && currentColor !== letterColors.letterRight) {
              newState[char] = letterColors.letterExist;
            } else if (color === letterColors.letterAbsent && !currentColor) {
              newState[char] = letterColors.letterAbsent;
            }
          });
          return newState;
        });
        setDisableKeyboard(false);
      }, 1200);
    }
  }, [wordColors, boardWords]);

  useEffect(() => {
    if (boardWords[wordIndexRef.current - 1]?.join("") === rightWord) {
      setToastData(["أحسنت !"]);
      saveGameResult(true, wordIndexRef.current);
      setTimeout(() => {
        setCloseModal(false);
        setGameResult("win");
      }, 2000);
    }
  }, [setCloseModal, setGameResult, wordColors, boardWords, rightWord]);

  useEffect(() => {
    if (wordIndexRef.current === 6 && typedWord !== rightWord) {
      saveGameResult(false, 6);
      setTimeout(() => {
        setToastData([rightWord]);
      }, 1200);
      setTimeout(() => {
        setCloseModal(false);
        setGameResult("lose");
      }, 5000);
    }
  }, [typedWord, setGameResult, setCloseModal, wordColors, rightWord]);

  const getKeyStyle = (key: string) => {
    const baseStyle = "cursor-pointer flex justify-center items-center rounded-md text-lg font-bold transition-all duration-150 select-none active:scale-95 shadow-sm h-12";

    const getColorClass = () => {
      if (keyboardState[key] === letterColors.letterRight) return 'bg-brand-sage text-white';
      if (keyboardState[key] === letterColors.letterExist) return 'bg-brand-sand text-white';
      if (keyboardState[key] === letterColors.letterAbsent) return 'bg-brand-taupe text-gray-500 opacity-60';
      return 'bg-white text-brand-charcoal hover:bg-gray-50 border border-brand-charcoal/10';
    };

    return `${baseStyle} w-9 ${getColorClass()}`;
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      {/* Tiles Grid */}
      <div className="grid grid-rows-6 gap-1.5 mb-8" dir="rtl">
        {[0, 1, 2, 3, 4, 5].map((row) => (
          <Row key={row} word={boardWords[row]} wordColors={wordColors[row] ?? []} error={isErrors[row] ?? false} />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center items-center gap-10 mb-8 w-full" dir="rtl">
        <button
          className="transition-all duration-200 hover:scale-110 active:scale-95"
          onClick={useMagicHelp}
          title="مساعدة سحرية"
        >
          <img src={magicIcon} alt="Magic" className="w-10 h-10" />
        </button>

        <button
          className="transition-all duration-200 hover:scale-110 active:scale-95 text-brand-charcoal/30 hover:text-brand-charcoal"
          onClick={() => setInfoModalType("menu")}
          title="معلومات"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>

        <button
          className="transition-all duration-200 hover:scale-110 active:scale-95"
          onClick={useAccelerate}
          title="تسريع"
        >
          <img src={speedIcon} alt="Speed" className="w-10 h-10" />
        </button>
      </div>

      {/* Keyboard */}
      <div className="w-full px-1 pb-2 select-none">
        {keyboardRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center w-full mb-1.5 gap-1" dir="rtl">
            {rowIndex === 2 && (
              <button
                className="cursor-pointer flex justify-center items-center rounded-md text-sm font-bold transition-all duration-150 select-none active:scale-95 shadow-sm h-12 px-4 bg-brand-muted-blue text-white hover:bg-brand-muted-blue/90"
                onClick={() => handleKeyboardClick("Enter")}
              >
                إدخال
              </button>
            )}
            {row.map((key) => (
              <button
                key={key}
                className={getKeyStyle(key)}
                onClick={() => handleKeyboardClick(key)}
              >
                {key}
              </button>
            ))}
            {rowIndex === 2 && (
              <button
                className="cursor-pointer flex justify-center items-center rounded-md text-sm font-bold transition-all duration-150 select-none active:scale-95 shadow-sm h-12 px-4 bg-brand-muted-red text-white hover:bg-brand-muted-red/90"
                onClick={() => handleKeyboardClick("Backspace")}
              >
                مسح
              </button>
            )}
          </div>
        ))}
      </div>

      <Toast toastData={toastData} setToastData={setToastData} rightWord={rightWord} />
    </div>
  );
};

export default Board;