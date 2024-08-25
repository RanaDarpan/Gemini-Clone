import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [themeMode, setThemeMode] = useState("light");

    const lightTheme = () => {
        setThemeMode("light");
    };

    const darkTheme = () => {
        setThemeMode("dark");
    };

    useEffect(() => {
        const htmlElement = document.querySelector('html');
        htmlElement.classList.remove("light", "dark");
        htmlElement.classList.add(themeMode);
    }, [themeMode]);

    return (
        <ThemeContext.Provider value={{ themeMode, lightTheme, darkTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
