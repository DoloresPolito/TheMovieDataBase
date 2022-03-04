import { useState, createContext } from "react";

const valorInicialSearch = { search: [], changeSearch: () => null };
export const SearchContext = createContext(valorInicialSearch);

const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState({
    search: [],
    changeSearch: () => null,
  });

  const changeSearch = (list) => setSearch({ search: list });

  return (
    <SearchContext.Provider value={{ ...search, changeSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
