"use client";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils.ts";
import { Button } from "@/components/ui/button.tsx";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import * as React from "react";
import "../../App.css";

interface ComboboxProps {
  title: string;
  errorMsg: string;
  darkMode: boolean;
  options: { value: string; label: string }[];
  onValueChange: (value: string) => void;
}

export default function Combobox({
  title,
  errorMsg,
  options,
  onValueChange,
  darkMode,
}: ComboboxProps): React.ReactNode {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-[200px] justify-between border select-none transition-all duration-300 dark:bg-[#070707] dark:border-[#1f1f1f] dark:hover:bg-[#090909] dark:text-[#dbdbdb] bg-[#f5f5f5] border-[#dcdcdc] hover:bg-[#eeeeee] text-[#070707] hover:text-[#070707]"}`}
        >
          <span className="font-normal select-none">
            {value
              ? options.find((option) => option.value === value)?.label
              : title}
            <span className="text-red-500 font-mono ml-1">*</span>
          </span>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={`w-[200px] p-0 border bg-transparent dark:border-[#1f1f1f] border-[#dcdcdc]"}`}
      >
        <Command
          className={`dark:bg-[#070707] dark:text-[#dbdbdb] bg-[#f9f9f9] text-[#070707]"}`}
        >
          <CommandList
            className={`overflow-y-auto ${
              darkMode ? "dark-scrollbar" : "light-scrollbar"
            }`}
          >
            <CommandEmpty>{errorMsg}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    if (currentValue !== value) {
                      setValue(currentValue);
                      setOpen(false);
                      onValueChange(currentValue);
                    }
                  }}
                  className={`cursor-pointer dark:text-[#dbdbdb] dark:data-[selected=true]:bg-[#111111] dark:data-[selected=true]:text-[#dbdbdb] text-[#070707] data-[selected=true]:bg-[#e9e9e9] data-[selected=true]:text-[#070707]"}`}
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
  );
}
