import { useEffect } from "react";

interface Props {
  toastData: Array<any>;
  setToastData: React.Dispatch<React.SetStateAction<any[]>>;
  rightWord?: string;
}

const Toast = ({ toastData, setToastData, rightWord }: Props) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (toastData.length > 0 && toastData[0] !== rightWord) {
      timer = setTimeout(() => {
        setToastData((state) => {
          const newData = [...state];
          newData.pop();
          return newData;
        });
      }, 800 / toastData.length);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [rightWord, toastData, setToastData]);
  return (
    <div className="absolute top-[5.3rem]">
      {toastData
        ? toastData.map((toast: string, index: number) => (
          <div key={index} className="flex justify-center items-center w-auto px-6 py-3 rounded-lg bg-glass-black backdrop-blur-md border border-white/10 text-white mb-4 shadow-xl font-bold animate-fade-in-up">
            {toast === rightWord ? `الكلمة الصحيحة :  ${rightWord}` : toast}
          </div>
        ))
        : null}
    </div>
  );
};

export default Toast;
