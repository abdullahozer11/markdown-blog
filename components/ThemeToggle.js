import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router'

const themes = [
    "default",
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
];

export default function ThemeToggle() {
    const [selectedTheme, setSelectedTheme] = useState('');
    const router = useRouter();

    useEffect(() => {
        // Get theme from localStorage on initial load
        const savedTheme = localStorage.getItem('theme') || 'light';
        setSelectedTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    useEffect(() => {
        // Handle theme persistence during route changes
        const handleRouteChange = () => {
            const currentTheme = localStorage.getItem('theme');
            if (currentTheme) {
                document.documentElement.setAttribute('data-theme', currentTheme);
            }
        };

        // Subscribe to router events
        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            // Cleanup subscription
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router]);

    const handleThemeChange = (theme) => {
        setSelectedTheme(theme);
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    };

    return (
        <div className="dropdown">
            <div tabIndex={0} role="button" className="btn m-1">
                Theme
                <svg
                    width="12px"
                    height="12px"
                    className="inline-block h-2 w-2 fill-current opacity-60"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 2048 2048"
                >
                    <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"/>
                </svg>
            </div>
            <ul tabIndex={0} className="dropdown-content bg-base-300 rounded-box z-[1] shadow-2xl">
                {themes.map((theme) => (
                    <li key={theme}>
                        <input
                            type="radio"
                            name="theme-dropdown"
                            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                            aria-label={theme.charAt(0).toUpperCase() + theme.slice(1)}
                            value={theme}
                            checked={selectedTheme === theme}
                            onChange={() => handleThemeChange(theme)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
