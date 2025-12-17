import React from 'react';

interface Props {
  toastData: string[];
  setToastData: React.Dispatch<React.SetStateAction<string[]>>;
  rightWord?: string;
}

const Toast: React.FC<Props> = ({ toastData, setToastData, rightWord }) => {
  // This is a placeholder component to fix the build.
  return null;
};

export default Toast;
