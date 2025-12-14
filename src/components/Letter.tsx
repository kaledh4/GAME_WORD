import { useState, useEffect } from "react";
import { letterColors } from "../data/letters-list";

interface Props {
  letter: string;
  bgColor: string;
}

const LetterComponent = ({ letter, bgColor }: Props) => {
  const { letterInitial } = letterColors;
  const [animateBgColor, setAnimateBgColor] = useState(letterInitial);

  // Determine styles based on state
  const isInitial = bgColor === letterInitial;
  const isFilled = letter !== "";

  // Base classes
  const baseClasses = "w-14 h-14 sm:w-12 sm:h-12 flex justify-center items-center text-3xl sm:text-2xl font-bold rounded-xl m-1.5 transition-all duration-300 transform";

  // Border styles
  const borderClasses = isInitial
    ? (isFilled ? "border-2 border-tile-active scale-105" : "border-2 border-tile-border")
    : "border-none shadow-lg";

  // Text color
  const textColor = isInitial ? "text-white" : "text-white";

  useEffect(() => {
    if (bgColor !== letterInitial) {
      setTimeout(() => {
        setAnimateBgColor(bgColor);
      }, 300);
    } else {
      setAnimateBgColor(letterInitial);
    }
  }, [bgColor, letterInitial]);

  // Animation classes
  const animationClass = letter && isInitial ? "animate-pop" : "";
  const flipClass = bgColor !== letterInitial && animateBgColor === letterInitial ? "animate-flip-in" : "";
  const flipOutClass = bgColor !== letterInitial && animateBgColor !== letterInitial ? "animate-flip-out" : "";

  // Background color mapping
  // We need to map the tailwind classes from letters-list to our new styles if needed, 
  // or just use them if they are standard colors.
  // letters-list uses: bg-gray-500, bg-yellow-500, bg-green-700
  // We can override these with more vibrant ones in CSS or here.
  // Let's assume the passed bgColor is one of those classes.
  // We can enhance them by adding gradients if we want, but simpler to stick to classes.
  // However, for "premium" look, we might want to replace them.
  // But the logic relies on these exact strings for comparison in Game.tsx.
  // So we should keep the logic using these strings, but maybe apply different visual classes?
  // Or just update tailwind config to make these classes look better?
  // I already updated tailwind config colors, but `bg-green-700` is standard.
  // I'll stick to the passed bgColor for now but add shadow/glow.

  return (
    <div
      className={`${baseClasses} ${borderClasses} ${textColor} ${animationClass} ${flipClass} ${flipOutClass} ${animateBgColor}`}
    >
      {letter}
    </div>
  );
};

export default LetterComponent;
