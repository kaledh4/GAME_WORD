import { useState, useEffect, useRef, useMemo } from "react";
import { compare } from "../utils/compare";
import { wordsList, getWordOfTheDay } from "../data/words-list";
import { keyboardRows } from "../data/keyboard-layout";
import { letterColors } from "../data/letters-list";
import Row from "./Row";
import Toast from "./Toast";

interface Props {
  wordColors: any[];
  setWordColors: React.Dispatch<React.SetStateAction<any[]>>;
  setCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
  setGameResult: React.Dispatch<React.SetStateAction<string>>;
  onNewGame: () => void;
  onMagicHelpUsed: () => void;
}

const Board = ({ wordColors, setWordColors, setCloseModal, setGameResult, onNewGame, onMagicHelpUsed }: Props) => {
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
      setTimeout(() => {
        setCloseModal(false);
        setGameResult("win");
      }, 2000);
    }
  }, [setCloseModal, setGameResult, wordColors, boardWords, rightWord]);

  useEffect(() => {
    if (wordIndexRef.current === 6 && typedWord !== rightWord) {
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
      if (keyboardState[key] === letterColors.letterRight) return 'bg-green-600 text-white';
      if (keyboardState[key] === letterColors.letterExist) return 'bg-amber-500 text-white';
      if (keyboardState[key] === letterColors.letterAbsent) return 'bg-gray-700 text-gray-400';
      return 'bg-gray-600 text-white hover:bg-gray-500';
    };

    return `${baseStyle} w-9 ${getColorClass()}`;
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      {/* Tiles Grid */}
      <div className="grid grid-rows-6 gap-1.5 mb-6" dir="rtl">
        {[0, 1, 2, 3, 4, 5].map((row) => (
          <Row key={row} word={boardWords[row]} wordColors={wordColors[row] ?? []} error={isErrors[row] ?? false} />
        ))}
      </div>

      {/* Magic Help Button */}
      <div className="flex justify-center mb-3 w-full" dir="rtl">
        <button
          className="cursor-pointer flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold shadow-md transition-all duration-150 bg-amber-500 text-white hover:bg-amber-600 active:scale-95"
          onClick={useMagicHelp}
        >
          <span className="ml-1">✨</span>
          <span>مساعدة سحرية</span>
        </button>
      </div>

      {/* Keyboard */}
      <div className="w-full px-1 pb-2 select-none">
        {keyboardRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center w-full mb-1.5 gap-1" dir="rtl">
            {rowIndex === 2 && (
              <button
                className="cursor-pointer flex justify-center items-center rounded-md text-sm font-bold transition-all duration-150 select-none active:scale-95 shadow-sm h-12 px-3 bg-blue-600 text-white hover:bg-blue-700"
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
                className="cursor-pointer flex justify-center items-center rounded-md text-sm font-bold transition-all duration-150 select-none active:scale-95 shadow-sm h-12 px-3 bg-red-600 text-white hover:bg-red-700"
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