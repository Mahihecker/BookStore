import { useState, useEffect } from 'react';

export default function DarkModeToggle() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    useEffect(() => {
        const storedPreference = localStorage.getItem('theme');
        if (storedPreference) {
            setIsDarkMode(storedPreference === 'dark');
            document.documentElement.classList.toggle('dark', storedPreference === 'dark');
        } else {
            const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDarkMode(systemPreference);
            document.documentElement.classList.toggle('dark', systemPreference);
        }
    }, []);
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark', !isDarkMode);
        localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
    };

    return (
        <button
            onClick={toggleDarkMode}
            className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white p-2 rounded-md"
        >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
    );
}
