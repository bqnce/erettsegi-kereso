"use client"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import * as React from "react"
import '../App.css';

interface ComboboxProps {
    title: string;
    errorMsg: string;
    options: { value: string; label: string }[];
    onValueChange: (value: string) => void;
};
  
export default function Combobox({
  title, errorMsg, options, onValueChange
}: ComboboxProps): React.ReactNode {

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
            <CommandList className="overflow-y-auto custom-scrollbar">
              <CommandEmpty>{errorMsg}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      if(currentValue !== value){
                        setValue(currentValue)
                        setOpen(false)
                        onValueChange(currentValue)
                      }
                      {/*setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                      onValueChange(currentValue)*/}
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