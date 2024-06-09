'use client';

import { createContext, useState } from 'react';

// Create the context
export const MyContext = createContext();

// Create the provider component
export function MyContextProvider({ children }) {
    const [someValue, setSomeValue] = useState("!");


    return (
        <MyContext.Provider value={{ someValue, setSomeValue }}>
            {children}
        </MyContext.Provider>
    );
}
