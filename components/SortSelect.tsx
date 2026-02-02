"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortSelectOption = {
  label: string;
  sortKey: string;
  sortValue: string;
};

type SortObject = {
  sortKey: string;
  sortValue: string;
};

type SortSelectProps = {
  options: SortSelectOption[];
  sort: SortObject;
  onChange: (sort: SortObject) => void;
};

const SortSelect = ({ options, sort, onChange }: SortSelectProps) => {
  const handleSort = (key: string) => {
    const [sortKey, sortValue] = key.split("_");

    onChange({ sortKey, sortValue });
  };

  return (
    <Select
      defaultValue={sort.sortKey + "_" + sort.sortValue}
      onValueChange={handleSort}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem
              key={option.sortKey + "_" + option.sortValue}
              value={option.sortKey + "_" + option.sortValue}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export { SortSelect };
