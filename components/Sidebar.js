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
        <aside className="card bg-base-200">
            <div className="card-body p-4">
                <div className="mb-6">
                    <h3 className="card-title text-xl mb-4">
                        Recent Posts
                    </h3>
                    <ul className="menu bg-base-200 rounded-box">
                        {recentPosts.map(post => (
                            <li key={post.id}>
                                <Link href={`/blogs/${post.id}`} className="hover:bg-base-300">
                                    <div>
                                        <span className="block">{post.title}</span>
                                        <span className="text-sm opacity-70">
                      {new Date(post.date).toLocaleDateString()} • {post.readingTime} min read
                    </span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="card-title text-xl mb-4">
                        Categories
                    </h3>
                    <ul className="menu bg-base-200 rounded-box">
                        {Object.entries(categories).map(([category, posts]) => (
                            <li key={category}>
                                <Link
                                    href={`/category/${encodeURIComponent(category)}`}
                                    className="flex justify-between hover:bg-base-300"
                                >
                                    <span>{category}</span>
                                    <span className="badge badge-neutral">
                    {posts.length}
                  </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </aside>
    );
}
