type ButtonProps = {
  onClick: () => void;
  disabled: boolean;
};

const ButtonComponent: React.FC<ButtonProps> = ({ onClick, disabled }) => {
  return (
    <button
      className={`mt-4 border border-[#1f1f1f] w-[140px] h-[40px] rounded hover:border-[#3f3f3f] transition-all duration-300 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      Keresés
    </button>
  );
};

export default ButtonComponent;
