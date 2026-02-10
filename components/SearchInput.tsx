"use client";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "./ui/input";

type SearchInputProps = {
  search: string;
  placeholder: string;
  onChange: (value: string) => void;
};

const SearchInput = ({ search, onChange, placeholder }: SearchInputProps) => {
  const handleSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    250,
  );

  return (
    <Input
      defaultValue={search}
      onChange={handleSearch}
      placeholder={placeholder}
    />
  );
};

export { SearchInput };
