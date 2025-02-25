const Header = ({ darkMode }: { darkMode: boolean }) => {
  return (
    <header
      className={`h-[80px] flex justify-center items-center rounded-t border-t border-b  ${
        darkMode ? "border-[#1f1f1f]" : "border-[#b5b5b5]"
      }`}
    >
      <span
        className={`text-xl font-medium bg-gradient-to-r bg-clip-text text-transparent animate-text  ${
          darkMode
            ? "from-purple-600 via-indigo-200 to-purple-400"
            : "from-purple-600 via-indigo-500 to-purple-400"
        }`}
      >
        Érettségi Kereső
      </span>
    </header>
  );
};

export default Header;
