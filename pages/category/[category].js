// pages/category/[category].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

export default function CategoryPage() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const { category } = router.query;

    useEffect(() => {
        if (category) {
            setIsLoading(true);
            fetch('/api/get-blogs')
                .then(res => res.json())
                .then(data => {
                    // Filter posts by category
                    const filteredPosts = data.blogs.filter(post => 
                        post.categories.includes(category)
                    );
                    setPosts(filteredPosts);
                })
                .catch(error => console.error('Error:', error))
                .finally(() => setIsLoading(false));
        }
    }, [category]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <section className="md:w-2/3">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Category: {category}
                        </h1>
                        <p className="text-gray-600 mb-8">
                            {posts.length} {posts.length === 1 ? 'post' : 'posts'} in this category
                        </p>

                        {isLoading ? (
                            <div className="animate-pulse space-y-4">
                                {[1, 2, 3].map((n) => (
                                    <div key={n} className="bg-white rounded-lg shadow-md p-6">
                                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {posts.length === 0 ? (
                                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                                        <p className="text-gray-600">No posts found in this category.</p>
                                        <Link href="/" className="text-blue-500 hover:text-blue-600 mt-4 inline-block">
                                            Return to home
                                        </Link>
                                    </div>
                                ) : (
                                    posts.map((post) => (
                                        <article key={post.id} className="bg-white rounded-lg shadow-md p-6">
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
                                            </div>
                                            <p className="text-gray-600 mb-4">{post.preview}</p>
                                            <Link 
                                                href={`/blogs/${post.id}`}
                                                className="text-blue-500 hover:text-blue-600 font-medium inline-flex items-center"
                                            >
                                                Read more 
                                                <svg 
                                                    className="ml-1 w-4 h-4" 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path 
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round" 
                                                        strokeWidth={2} 
                                                        d="M9 5l7 7-7 7" 
                                                    />
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
