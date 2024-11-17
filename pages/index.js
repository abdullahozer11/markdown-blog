import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

export default function Home() {
    const [blogPosts, setBlogPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetch('/api/get-blogs')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch blogs');
                }
                return res.json();
            })
            .then(data => {
                setBlogPosts(data.blogs);
                setError(null);
            })
            .catch(error => {
                console.error('Error loading blogs:', error);
                setError('Failed to load blog posts. Please try again later.');
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <section className="md:w-2/3">
                        <h1 className="text-3xl font-bold text-gray-900 mb-8">Latest Posts</h1>

                        {isLoading && (
                            <div className="text-center py-8">
                                <div className="animate-pulse space-y-4">
                                    {[1, 2, 3].map((n) => (
                                        <div key={n} className="bg-white rounded-lg shadow-md p-6">
                                            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                                            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                                            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-red-700">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {!isLoading && !error && (
                            <div className="space-y-8">
                                {blogPosts.length === 0 ? (
                                    <div className="text-center py-8 bg-white rounded-lg shadow-md">
                                        <p className="text-gray-600">No blog posts found.</p>
                                        <p className="text-sm text-gray-500 mt-2">Check back later for new content!</p>
                                    </div>
                                ) : (
                                    blogPosts.map((post) => (
                                        <article key={post.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                            <Link href={`/blogs/${post.id}`}>
                                                <h2 className="text-2xl font-bold text-gray-900 hover:text-blue-600 mb-2">
                                                    {post.title}
                                                </h2>
                                            </Link>

                                            <div className="flex items-center text-sm text-gray-500 mb-4">
                                                <time dateTime={post.date}>
                                                    {new Date(post.date).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </time>
                                                <span className="mx-2">•</span>
                                                <span>{post.readingTime} min read</span>
                                                {post.author && (
                                                    <>
                                                        <span className="mx-2">•</span>
                                                        <span>By {post.author}</span>
                                                    </>
                                                )}
                                            </div>

                                            <div className="flex gap-2 mb-4">
                                                {post.categories.map(category => (
                                                    <span
                                                        key={category}
                                                        className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                                                    >
                                                        {category}
                                                    </span>
                                                ))}
                                            </div>

                                            <p className="text-gray-600 mb-4 line-clamp-3">
                                                {post.preview}
                                            </p>

                                            <Link
                                                href={`/blogs/${post.id}`}
                                                className="inline-flex items-center text-blue-500 hover:text-blue-600 font-medium"
                                            >
                                                Read more
                                                <svg
                                                    className="ml-1 w-4 h-4"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path d="M9 5l7 7-7 7" />
                                                </svg>
                                            </Link>
                                        </article>
                                    ))
                                )}
                            </div>
                        )}
                    </section>

                    <div className="md:w-1/3">
                        <Sidebar />
                    </div>
                </div>
            </main>
        </div>
    );
}
