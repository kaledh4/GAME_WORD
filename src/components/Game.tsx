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
}

const Board = ({ wordColors, setWordColors, setCloseModal, setGameResult, onNewGame }: Props) => {
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
    const newBoardWords = [...boardWords];
    newBoardWords[wordIndexRef.current].push(key);
    setBoardWords(newBoardWords);
  };

  const deleteLetterFromBoard = (): void => {
    const newBoardWords = [...boardWords];
    newBoardWords[wordIndexRef.current].pop();
    setBoardWords(newBoardWords);
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
  }, [wordColors]);

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
    const baseStyle = "cursor-pointer flex justify-center items-center rounded-md text-lg font-bold m-0.5 transition-all duration-150 select-none active:scale-95 shadow-md";
    const colorStyle = keyboardState[key] ? `${keyboardState[key]} text-white` : "bg-gray-200 text-gray-900 hover:bg-gray-300";

    if (key === "Enter" || key === "Backspace") {
      return `${baseStyle} ${colorStyle} px-4 h-12 flex-grow`;
    }
    return `${baseStyle} ${colorStyle} w-8 h-12 flex-1`;
  };

  return (
    <>
      <div className="grid grid-rows-6 gap-1 mb-4" dir="rtl">
        {[0, 1, 2, 3, 4, 5].map((row) => (
          <Row key={row} word={boardWords[row]} wordColors={wordColors[row] ?? []} error={isErrors[row] ?? false} />
        ))}
      </div>

      <div className="w-full max-w-lg px-2 pb-4">
        {keyboardRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center w-full mb-1" dir="rtl">
            {rowIndex === 2 && (
              <button className={getKeyStyle("Enter")} onClick={() => handleKeyboardClick("Enter")}>إدخال</button>
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
              <button className={getKeyStyle("Backspace")} onClick={() => handleKeyboardClick("Backspace")}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
                </svg>
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
