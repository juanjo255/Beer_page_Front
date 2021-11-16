import { createContext, useContext } from 'react';

export const searchContext = createContext(null);

export const useSearch = () => {
    return useContext(searchContext);
};