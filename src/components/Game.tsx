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
  const [hasUsedMagicHelp, setHasUsedMagicHelp] = useState<boolean>(false);

  const typedWord = boardWords[wordIndexRef.current]?.join("");

  const handleErrorInWord = (): void => {
    const newErrors = [...isErrors];
    newErrors[wordIndexRef.current] = true;
    setIsErrors(newErrors);
  };

  const addLetterToBoard = (key: string): void => {
    setBoardWords((prev) => {
      const newBoardWords = [...prev];
      newBoardWords[wordIndexRef.current] = [...(newBoardWords[wordIndexRef.current] || []), key];
      return newBoardWords;
    });
  };

  const deleteLetterFromBoard = (): void => {
    setBoardWords((prev) => {
      const newBoardWords = [...prev];
      newBoardWords[wordIndexRef.current] = [...(newBoardWords[wordIndexRef.current] || [])];
      newBoardWords[wordIndexRef.current].pop();
      return newBoardWords;
    });
  };

  const useMagicHelp = (): void => {
    if (hasUsedMagicHelp || disableKeyBoard || boardWords[wordIndexRef.current - 1]?.join("") === rightWord) return;

    setHasUsedMagicHelp(true);
    onMagicHelpUsed();

    const revealablePositions = [1, 3, 4]; // 0-based, skip 0, 2 (center)
    const choice = Math.random() < 0.5 ? "letter" : "hint";

    if (choice === "letter") {
      // Filter positions that are not already revealed
      const availablePositions = revealablePositions.filter(index => {
        const currentRow = boardWords[wordIndexRef.current] || [];
        return !currentRow[index]; // Only use positions that are empty
      });
      
      if (availablePositions.length === 0) {
        // All positions are filled, give hint instead
        setToastData((prev) => [...prev, "جميع الحروف المكشوفة!"]);
        return;
      }
      
      const index = availablePositions[Math.floor(Math.random() * availablePositions.length)];
      const chars = rightWord.split("");

      setBoardWords((prev) => {
        const newBoardWords = [...prev];
        const currentRow = [...(newBoardWords[wordIndexRef.current] || [])];
        
        // Fill gaps before the revealed position
        for (let i = 0; i < index; i++) {
          if (!currentRow[i]) {
            currentRow[i] = '';
          }
        }
        
        // Set the revealed letter
        currentRow[index] = chars[index];
        
        newBoardWords[wordIndexRef.current] = currentRow;
        return newBoardWords;
      });

      setToastData((prev) => [...prev, "تم كشف حرف جديد!"]);
      return;
    }

    const duplicateMap: { [key: string]: number } = {};
    for (const ch of rightWord.split("")) {
      duplicateMap[ch] = (duplicateMap[ch] || 0) + 1;
    }
    const duplicateLettersCount = Object.values(duplicateMap).filter((c) => c > 1).length;

    const hints = [
      "أول حرفين: _ _",
      "آخر حرفين: _ _",
      "الحرف موجود لكنه ليس في مكانه",
      `عدد الحروف المكررة: ${duplicateLettersCount}`,
    ];

    const hint = hints[Math.floor(Math.random() * hints.length)];
    setToastData((prev) => [...prev, hint]);
  };

  const handleEnter = (): void => {
    if (typedWord.length === 5) {
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
    } else if (typedWord.length < 5) {
      handleErrorInWord();
      if (toastData.length < 6) {
        setToastData([...toastData, "عدد الحروف غير كاف"]);
      }
    }
  };

  const handleKeyboardClick = (key: string): void => {
    if (!disableKeyBoard && boardWords[wordIndexRef.current - 1]?.join("") !== rightWord) {
      if (key === "Backspace") {
        if (typedWord.length > 0) deleteLetterFromBoard();
      } else if (key === "Enter") {
        handleEnter();
      } else {
        if (typedWord.length < 5) addLetterToBoard(key);
      }
    }
  };

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (/[\u0600-\u06FF]/.test(e.key) && e.key.length === 1 && typedWord?.length < 5) {
        addLetterToBoard(e.key);
      }
      if (e.key === "Backspace" && typedWord?.length > 0) {
        deleteLetterFromBoard();
      }
      if (e.key === "Enter") {
        handleEnter();
      }
    };
    if (!disableKeyBoard && boardWords[wordIndexRef.current - 1]?.join("") !== rightWord) {
      window.addEventListener("keyup", listener);
    }
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
    if (wordColors[wordIndexRef.current - 1]?.length === 5) {
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
    if (boardWords[wordIndexRef.current - 1]?.join("") === rightWord && !disableKeyBoard) {
      setToastData(["أحسنت !"]);
      setTimeout(() => {
        setCloseModal(false);
        setGameResult("win");
      }, 1200);
    }
  }, [disableKeyBoard, setCloseModal, setGameResult, wordColors, boardWords, rightWord]);

  useEffect(() => {
    if (wordIndexRef.current === 6 && typedWord !== rightWord) {
      setTimeout(() => {
        setToastData([rightWord]);
      }, 1200);
      setTimeout(() => {
        setCloseModal(false);
        setGameResult("lose");
      }, 2000);
    }
  }, [typedWord, setGameResult, setCloseModal, wordColors, rightWord]);

  const getKeyStyle = (key: string) => {
    const baseStyle = "cursor-pointer flex justify-center items-center rounded text-xl font-bold transition-all duration-150 select-none active:scale-95 shadow-sm";
    const colorStyle = keyboardState[key] ? `${keyboardState[key]} text-white` : "bg-key-bg text-white hover:opacity-90";

    if (key === "Enter" || key === "Backspace") {
      return `${baseStyle} px-3 h-14 rounded`;
    }
    return `${baseStyle} ${colorStyle} w-10 h-14 rounded`;
  };

  return (
    <>
      <div className="grid grid-rows-6 gap-1 mb-4" dir="rtl">
        {[0, 1, 2, 3, 4, 5].map((row) => (
          <Row key={row} word={boardWords[row]} wordColors={wordColors[row] ?? []} error={isErrors[row] ?? false} />
        ))}
      </div>

      <div className="w-full max-w-lg px-1 pb-4 select-none">
        <div className="flex justify-end mb-2 px-1" dir="rtl">
          <button
            className={`cursor-pointer flex items-center justify-center rounded-lg px-3 py-2 text-sm font-semibold shadow-sm transition-all duration-150 ${
              hasUsedMagicHelp ? "bg-tile-border text-gray-400 cursor-not-allowed" : "bg-tile-active text-white hover:opacity-90"
            }`}
            onClick={useMagicHelp}
            disabled={hasUsedMagicHelp}
          >
            <span className="ml-1">✨</span>
            <span>مساعدة سحرية</span>
          </button>
        </div>
        {keyboardRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center w-full mb-2 gap-1.5" dir="rtl">
            {rowIndex === 2 && (
              <button
                className={`${getKeyStyle("Enter")} bg-key-enter text-white text-sm`}
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
                className={`${getKeyStyle("Backspace")} bg-key-delete text-white text-sm`}
                onClick={() => handleKeyboardClick("Backspace")}
              >
                مسح
              </button>
            )}
          </div>
        ))}
      </div>

      <Toast toastData={toastData} setToastData={setToastData} rightWord={rightWord} />
    </>
  );
};

export default Board;
