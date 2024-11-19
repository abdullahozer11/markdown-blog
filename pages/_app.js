// pages/_app.js

import "@/styles/globals.css";
import {useEffect} from 'react';
import Layout from "@/components/Layout";

export default function App({Component, pageProps}) {
    useEffect(() => {
        // Apply saved theme and font on initial page load
        const savedTheme = localStorage.getItem('theme');
        const savedFont = localStorage.getItem('selectedFont');

        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        }

        if (savedFont) {
            const fonts = [
                {value: 'inter', className: 'font-sans'},
                {value: 'merriweather', className: 'font-serif'},
                {value: 'roboto-mono', className: 'font-mono'},
                {value: 'playfair', className: 'font-serif'},
            ];

            document.documentElement.classList.remove(
                ...fonts.map(f => f.className)
            );

            const newFont = fonts.find(f => f.value === savedFont);
            if (newFont) {
                document.documentElement.classList.add(newFont.className);
            }
        }
    }, []);

    return (
        <div className="min-h-screen bg-base-neutral transition-colors duration-200">
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </div>
    );
}
