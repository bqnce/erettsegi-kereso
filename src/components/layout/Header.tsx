const Header = ({ darkMode }: { darkMode: boolean }) => {
  return (
    <header
      className={`h-[100px] rounded-t border-t border-b flex items-center justify-center flex-col ${
        darkMode ? "border-[#1f1f1f]" : "border-[#b5b5b5]"
      }`}
    >
      <span
        className={`text-2xl font-medium bg-gradient-to-r bg-clip-text text-transparent animate-text  ${
          darkMode
            ? "from-purple-600 via-indigo-200 to-purple-400"
            : "from-purple-600 via-indigo-500 to-purple-400"
        }`}
      >
        Érettségi Kereső
      </span>
      <p
        className={`text-sm mt-1 bg-gradient-to-r bg-clip-text text-transparent animate-text ${
          darkMode ? "from-gray-500 via-zinc-200 to-neutral-500" : "text-[#666666]"
        }`}
      >
        Válaszd ki a <span className="font-normal">tárgyat</span>, <span className="font-normal">évet</span>, <span className="font-normal">időszakot</span> és <span className="font-normal">szintet</span> a kereséshez
      </p>
    </header>
  );
};

export default Header;
