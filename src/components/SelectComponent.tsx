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
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px] bg-darkBg border border-darkBorder text-[#dbdbdb] hover:border-[#3f3f3f] focus:ring-0 focus:ring-offset-0 transition-colors duration-300 select-none">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-darkBg text-[#dbdbdb] border border-darkBorder ">
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
