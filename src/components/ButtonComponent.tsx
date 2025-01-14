type ButtonProps = {
  onClick: () => void;
  disabled: boolean;
  title: string;
};

const ButtonComponent: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  title,
}) => {
  return (
    <button
      className={`mt-4 border border-[#1f1f1f] p-2 rounded hover:border-[#3f3f3f] transition-all duration-300 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default ButtonComponent;
