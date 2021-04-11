import React, { useState, createContext } from 'react';

export const SearchSuccessContext = createContext();

const SearchSuccessContextProvider = ({ children }) => {
  const [searchSuccess, setSearchSuccess] = useState(null);

  return (
    <SearchSuccessContext.Provider value={{ searchSuccess, setSearchSuccess }}>
      {children}
    </SearchSuccessContext.Provider>
  );
};

export default SearchSuccessContextProvider;
