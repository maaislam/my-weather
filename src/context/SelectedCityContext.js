import React, { createContext, useState } from 'react';

export const SelectedCityContext = createContext();

const SelectedCityContextProvider = ({ children }) => {
  const [city, setCity] = useState('');

  return (
    <SelectedCityContext.Provider value={{ city, setCity }}>
      {children}
    </SelectedCityContext.Provider>
  );
};

export default SelectedCityContextProvider;
