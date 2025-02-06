import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectComponentProps = {
  placeholder: string;
  options: { value: string; label: string }[];
  onValueChange: (value: string) => void;
};

const SelectComponent: React.FC<SelectComponentProps> = ({
  placeholder,
  options,
  onValueChange,
}) => {
  return (
    <>
          <div className='absolute w-screen top-0 h-[10px] bg-indigo-500 blur-2xl sm:hidden'></div>
      <div className='absolute w-screen bottom-0 h-[5px] bg-indigo-400 blur-2xl sm:hidden'></div>
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px] bg-darkBg border border-darkBorder text-[#dbdbdb] focus:border-darkBorder focus:ring-5 hover:border-[#3f3f3f] transition-all duration-300">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-darkBg text-[#dbdbdb] border border-darkBorder">
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="hover:text-[#dbdbdb] focus:bg-[#090909] focus:text-[#dbdbdb]"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    </>
  );
};

export default SelectComponent;
