import Statistics from "./icons/Statistics";

interface Props {
  closeModal: boolean;
  setCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ closeModal, setCloseModal }: Props) => {
  return (
    <header className="flex items-center justify-between w-full max-w-lg px-4 py-4 mb-6" dir="rtl">
      <div className="flex gap-2">
        <button
          className="p-1 rounded hover:bg-white/10 transition-colors text-white"
          onClick={() => {}}
          aria-label="Menu"
        >
          {/* Placeholder for Menu Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <button
          className="p-1 rounded hover:bg-white/10 transition-colors text-white"
          onClick={() => {}}
          aria-label="Help"
        >
          {/* Placeholder for Help Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.79 4 4 0 2.21-1.79 4-4 4-1.742 0-3.223-.835-3.772-2M12 18v-2M12 6V4" />
          </svg>
        </button>
      </div>
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-pink-600">
        كلمة
      </h1>
      <div className="flex gap-2">
        <button
          className="p-1 rounded hover:bg-white/10 transition-colors text-white"
          onClick={() => setCloseModal(false)}
          aria-label="Statistics"
        >
          <Statistics />
        </button>
        <button
          className="p-1 rounded hover:bg-white/10 transition-colors text-white"
          onClick={() => {}}
          aria-label="Settings"
        >
          {/* Placeholder for Settings Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
