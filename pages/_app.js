import "@/styles/globals.css";
import {useEffect} from "react";

export default function App({ Component, pageProps }) {
    useEffect(() => {
        // Apply saved theme on initial page load
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }, []);

    return (
        <div className="min-h-screen bg-base-neutral transition-colors duration-200">
            <Component {...pageProps} />
        </div>
    );
}