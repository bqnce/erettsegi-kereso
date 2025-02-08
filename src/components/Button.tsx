type ButtonProps = {
  onClick: () => void;
  disabled: boolean;
  title: string;
  icon?: React.ReactElement;
};

const ButtonComponent: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  title,
  icon
}) => {

  return (
    <button
      className={`border border-[#1f1f1f] p-2 rounded hover:bg-[#090909] transition-colors duration-100 active:bg-[#1f1f1f] flex items-center 
        ${disabled ? "flex opacity-50 cursor-not-allowed" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      {title}
    </button>
  );
};

export default ButtonComponent;
