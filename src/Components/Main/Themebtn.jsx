import React, { useContext } from 'react';
// import { ThemeContext } from '../context/ThemeContext';
import { ThemeContext } from '../../context/Theme';
const ThemeBtn = () => {
    const { themeMode, lightTheme, darkTheme } = useContext(ThemeContext);

    return (
        <button
            onClick={themeMode === "light" ? darkTheme : lightTheme}
            className="p-2   rounded-full border border-gray-400 "
        >
            {themeMode === "light" ? "Dark Mode" : "Light Mode"}
        </button>
    );
};

export default ThemeBtn;
