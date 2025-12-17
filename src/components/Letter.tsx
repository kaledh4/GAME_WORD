import { useState, useEffect } from "react";
import { letterColors } from "../data/letters-list";

interface Props {
  letter: string;
  bgColor: string;
}

const LetterComponent = ({ letter, bgColor }: Props) => {
  const { letterInitial } = letterColors;
  const [animateBgColor, setAnimateBgColor] = useState(letterInitial);

  useEffect(() => {
    if (bgColor !== letterInitial) {
      setTimeout(() => {
        setAnimateBgColor(bgColor);
      }, 300);
    } else {
      setAnimateBgColor(letterInitial);
    }
  }, [bgColor, letterInitial]);

  const isFilled = letter !== "";

  const baseClasses = "w-16 h-16 flex justify-center items-center text-3xl font-bold rounded-lg m-1 transition-all duration-300";

  const getBgColor = () => {
    if (animateBgColor === letterColors.letterRight) return 'bg-letter-right';
    if (animateBgColor === letterColors.letterExist) return 'bg-letter-exist';
    if (animateBgColor === letterColors.letterAbsent) return 'bg-letter-absent';
    return isFilled ? 'bg-tile-bg border-2 border-tile-active' : 'bg-tile-bg border-2 border-gray-500';
  };

  return (
    <div className={`${baseClasses} ${getBgColor()} text-white`}>
      {letter}
    </div>
  );
};

export default LetterComponent;
