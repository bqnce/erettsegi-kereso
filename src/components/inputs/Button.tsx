import * as React from "react";

interface ButtonProps {
  onClick: () => void;
  disabled: boolean;
  darkMode: boolean;
  title: string;
  icon?: React.ReactElement;
}

export default function ButtonComponent({
  onClick, disabled, title, icon, darkMode
}: ButtonProps): React.ReactNode {
  return (
    <button
      className={`border p-2 rounded transition-all duration-300 flex items-center select-none
        ${disabled ? "flex opacity-50 cursor-not-allowed" : ""}
        ${darkMode ? "border-[#1f1f1f] hover:bg-[#090909] active:bg-[#1f1f1f]" : "border-[#cfcfcf] hover:bg-[#eeeeee] active:bg-[#e5e5e5] text-[#070707]"}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      {title}
    </button>
  );
};