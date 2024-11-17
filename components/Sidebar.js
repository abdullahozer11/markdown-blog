import { useState, useEffect } from 'react';
import Link from "next/link";

export default function Sidebar() {
    const [recentPosts, setRecentPosts] = useState([]);
    const [categories, setCategories] = useState({});

    useEffect(() => {
        fetch('/api/get-blogs')
            .then(res => res.json())
            .then(data => {
                setRecentPosts(data.blogs.slice(0, 5));
                setCategories(data.categories);
            })
            .catch(error => console.error('Error loading blog data:', error));
    }, []);

    return (
        <aside className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md transition-colors duration-200">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Recent Posts
            </h3>
            <ul className="space-y-2">
                {recentPosts.map(post => (
                    <li key={post.id}>
                        <Link
                            href={`/blogs/${post.id}`}
                            className="text-blue-600 dark:text-blue-400 hover:underline block py-1"
                        >
                            {post.title}
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                {new Date(post.date).toLocaleDateString()} • {post.readingTime} min read
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
                Categories
            </h3>
            <ul className="space-y-2">
                {Object.entries(categories).map(([category, posts]) => (
                    <li key={category} className="flex items-center justify-between">
                        <Link
                            href={`/category/${encodeURIComponent(category)}`}
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            {category}
                        </Link>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            ({posts.length})
                        </span>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
