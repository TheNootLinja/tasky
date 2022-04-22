import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const ContextProvider = ({ children }) => {
    const [ selectedProjectId, setSelectedProjectId ] = useState()
    let appState = {
        selectedProjectId: selectedProjectId,
        setSelectedProjectId: setSelectedProjectId,
    }

    return (
        <AppContext.Provider value={ appState }>
            { children }
        </AppContext.Provider>
    )
}

export function useAppContext() {
        // Setting our context variable
    const context = useContext(AppContext);
    // Setting up error handling if useTheme is being used outside provider
    if(context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    // Returning our context variable
    return context;
}
