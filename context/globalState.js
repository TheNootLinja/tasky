import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const ContextProvider = ({ children }) => {
    let appState = {
        projectId: '',
    }

    return (
        <AppContext.Provider value={ appState }>
            { children }
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext);
}
