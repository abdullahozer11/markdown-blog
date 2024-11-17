import { useState, useEffect } from 'react';
import Link from "next/link";
import ThemeToggle from './ThemeToggle';

export default function Header() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('/api/get-blogs')
            .then(res => res.json())
            .then(data => {
                setBlogs(data.blogs);
            })
            .catch(error => console.error('Error loading blog list:', error));
    }, []);

    return (
        <header className="relative py-6 border-b border-gray-200 dark:border-gray-700 mb-6 transition-colors duration-200">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                    MOBICHARM
                </h1>
            </div>
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>
        </header>
    );
}
