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
    if (animateBgColor === letterColors.letterRight) return 'bg-brand-sage text-white';
    if (animateBgColor === letterColors.letterExist) return 'bg-brand-sand text-white';
    if (animateBgColor === letterColors.letterAbsent) return 'bg-brand-taupe text-white';
    return isFilled
      ? 'bg-white border-2 border-brand-charcoal text-brand-charcoal'
      : 'bg-white/50 border-2 border-brand-charcoal/10 text-brand-charcoal';
  };

  return (
    <div className={`${baseClasses} ${getBgColor()}`}>
      {letter}
    </div>
  );
};

export default LetterComponent;
