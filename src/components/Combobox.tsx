"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import '../App.css';

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type ComboboxProps = {
    title: string;
    errorMsg: string;
    placeholder: string
    options: { value: string; label: string }[];
    onValueChange: (value: string) => void;
};
  
const Combobox: React.FC<ComboboxProps> = ({
    title,
    placeholder,
    errorMsg,
    options,
    onValueChange,

  }) => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    return (
      <Popover open={open} onOpenChange={setOpen}>
          
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between bg-[#070707] border border-[#1f1f1f] hover:bg-[#090909] hover:text-[#dbdbdb]"
          >
          <span className="font-normal">
            {value
              ? options.find((option) => option.value === value)?.label
              : (title)}
          </span>
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[200px] p-0 border border-[#1f1f1f] bg-transparent">
          <Command className="bg-[#070707] text-[#dbdbdb]">

            {/*<CommandInput placeholder={placeholder} />*/}

            <CommandList className="overflow-y-auto custom-scrollbar">
              <CommandEmpty>{errorMsg}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                      onValueChange(currentValue)
                    }}
                    className="text-[#dbdbdb] cursor-pointer data-[selected=true]:bg-[#111111] data-[selected=true]:text-[#dbdbdb]"
                  >
                    {option.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
};

export default Combobox;  