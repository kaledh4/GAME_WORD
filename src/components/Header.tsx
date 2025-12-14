import Statistics from "./icons/Statistics";

interface Props {
  closeModal: boolean;
  setCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ closeModal, setCloseModal }: Props) => {
  return (
    <header className="flex items-center justify-between w-full max-w-lg px-4 py-4 mb-4 border-b border-white/10 bg-white/5 backdrop-blur-md rounded-b-xl shadow-lg" dir="rtl">
      <button
        className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
        onClick={() => setCloseModal(false)}
        aria-label="Statistics"
      >
        <Statistics />
      </button>
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 font-sans">
        خمن الكلمة 3.0
      </h1>
      <div className="w-8"></div> {/* Spacer for centering */}
    </header>
  );
};

export default Header;
