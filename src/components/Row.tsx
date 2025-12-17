import { useState, useEffect } from "react";
import Letter from "./Letter";

interface Props {
  word: Array<string>;
  wordColors: Array<string>;
  error: boolean;
}

const Row = ({ word, wordColors, error }: Props) => {
  const defaultBgColor = "bg-tile-empty";
  const [bgColors, setBgColors] = useState<Array<string>>([]);

  useEffect(() => {
    if (wordColors.length === 4) {
      for (let i = 0; i < 4; i++) {
        setTimeout(() => {
          setBgColors((state) => [...state, wordColors[i]]);
        }, 100 * i);
      }
    }
  }, [wordColors]);
  return (
    <div className={`grid grid-cols-4 gap-1 ${error && "animate-vibrate"}`} dir="rtl">
      {[0, 1, 2, 3].map((lett) => (
        <Letter key={lett} letter={word[lett] ?? ""} bgColor={bgColors[lett] ?? defaultBgColor} />
      ))}
    </div>
  );
};
export default Row;
