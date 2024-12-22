"use client";

import { ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/utilities/shadcn-utils";

export function Combobox({
  options,
  searchText,
  noResultFoundText,
  value,
  setValue,
  hideSearch,
  className,
}: {
  value: string;
  setValue: (value: string) => void;
  searchText?: string;
  noResultFoundText?: string;
  options: { label: string; value: string }[];
  hideSearch?: boolean;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", className)}
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : (searchText ?? "Select...")}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          {!hideSearch && <CommandInput placeholder="Search..." />}
          <CommandList>
            <CommandEmpty>
              {noResultFoundText ?? "No result found."}
            </CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={() => {
                    setValue(option.value === value ? "" : option.value);
                    setOpen(false);
                  }}
                  className="font-mono"
                >
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
