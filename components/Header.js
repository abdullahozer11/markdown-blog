import { useState, useEffect } from 'react';
import Link from "next/link";

export default function Header() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('/api/get-blogs')
            .then(res => res.json())
            .then(data => {
                // data.blogs is now an array of blog objects with complete metadata
                setBlogs(data.blogs.map(blog => ({
                    id: blog.id,
                    title: blog.title
                })));
            })
            .catch(error => console.error('Error loading blog list:', error));
    }, []);

    return (
        <header className="text-center py-6 border-b border-gray-200 mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">My Blog</h1>
            <nav>
                <ul className="flex justify-center gap-4 flex-wrap">
                    <li>
                        <Link href="/" className="text-blue-500 hover:bg-gray-100 px-3 py-2 rounded transition-colors">
                            Home
                        </Link>
                    </li>
                    {blogs.map(({ id, title }) => (
                        <li key={id}>
                            <Link 
                                href={`/blogs/${id}`}
                                className="text-blue-500 hover:bg-gray-100 px-3 py-2 rounded transition-colors"
                            >
                                {title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
