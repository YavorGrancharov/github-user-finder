import { ChangeEvent, useState } from "react";
import { Input as SearchInput } from "@ui";

type SearchProps = {
  onSearch: (search: string) => void;
};

export const Search = ({ onSearch }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <SearchInput
      value={searchTerm}
      onChange={handleChange}
      name="search-users"
      id="search-users"
      type="text"
      placeholderText="Search by username..."
    />
  );
};

export default Search;
