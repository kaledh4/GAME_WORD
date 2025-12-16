import Statistics from "./icons/Statistics";

interface Props {
  closeModal: boolean;
  setCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ closeModal, setCloseModal }: Props) => {
  return (
    <header className="flex items-center justify-between w-full max-w-lg px-4 py-4 mb-6 border-b border-tile-border" dir="rtl">
      <div className="flex gap-2">
        <button
          className="p-1 rounded hover:bg-white/10 transition-colors text-white"
          onClick={() => setCloseModal(false)}
          aria-label="Statistics"
        >
          <Statistics />
        </button>
      </div>
      <h1 className="text-3xl font-bold text-white font-sans tracking-wide">
        خمن الكلمة 3.0
      </h1>
      <div className="w-8"></div> {/* Spacer for centering */}
    </header>
  );
};

export default Header;
