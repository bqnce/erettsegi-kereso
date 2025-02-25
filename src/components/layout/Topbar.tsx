const Topbar = ({ darkMode }: { darkMode: boolean }) => {
  return (
    <div
      className={`h-[60px] absolute top-5 rounded-xl  shadow-md w-[50%] ${
        darkMode ? "bg-[#0b0b0b]" : "text-[#070707]"
      }`}
    >
      <div className="flex justify-around items-center h-[60px]">
        <a href="/">
          <img
            src={`${
              darkMode ? "src/assets/logo.svg" : "src/assets/logoblack.svg"
            }`}
            alt="logo"
            className="h-[25px] w-[25px] select-none"
          />
        </a>
        <div className="flex gap-4">
          <a
            className={`transition-all duration-300 cursor-pointer ${
              darkMode ? "hover:text-[#ffffff]" : "hover:text-[#393939]"
            }`}
            href="/login"
          >
            Login
          </a>
          <a
            className={`transition-all duration-300 cursor-pointer ${
              darkMode ? "hover:text-[#ffffff]" : "hover:text-[#393939]"
            }`}
            href="/register"
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
