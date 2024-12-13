import { createContext, useContext } from 'react';

export const DataContext = createContext(null);

export function DataProvider({ children, books, authors, genres }) {
  return (
    <DataContext.Provider value={{ books, authors, genres }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
