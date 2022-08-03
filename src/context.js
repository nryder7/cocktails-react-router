import React, { useState, useContext, useEffect } from 'react';
import { useCallback } from 'react';

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('a');
  const [cocktails, setCocktails] = useState([]);

  const fetchCocktails = useCallback(async () => {
    setIsLoading(true);
    try {
      const resp = await fetch(`${url}${searchTerm}`);
      const data = await resp.json();
      const { drinks } = data;
      setIsLoading(false);

      if (drinks) {
        const newDrinks = drinks.map((drink) => {
          const { idDrink } = drink;
          Object.keys(drink).forEach((key) => {
            if (drink[key] === null) {
              delete drink[key];
            }
          });
          Object.keys(drink).forEach((key) => {
            let newKeySub = key.substring(3);
            let newKey = `${newKeySub[0].toLowerCase()}${newKeySub.substring(
              1
            )}`;
            if (key.startsWith('str')) {
              delete Object.assign(drink, { [newKey]: drink[key] })[key];
            }
          });
          return { ...drink, id: idDrink };
        });
        console.log(newDrinks);
        setCocktails(newDrinks);
      }
    } catch (error) {}
  }, [searchTerm]);
  useEffect(() => {
    fetchCocktails();
  }, [searchTerm, fetchCocktails]);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        setIsLoading,
        searchTerm,
        setSearchTerm,
        cocktails,
        setCocktails,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
