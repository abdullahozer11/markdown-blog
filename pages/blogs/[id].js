import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { marked } from 'marked';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import matter from 'gray-matter';

export default function BlogPost() {
    const [post, setPost] = useState({
        title: '',
        content: '',
        date: '',
        author: '',
        categories: [],
        readingTime: 0,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            setIsLoading(true);
            fetch(`/blogs/${id}.md`)
                .then((res) => {
                    if (!res.ok) throw new Error('Failed to load blog post');
                    return res.text();
                })
                .then((text) => {
                    // Parse front matter and content
                    const { data: metadata, content } = matter(text);
                    
                    // Calculate reading time
                    const wordsPerMinute = 200;
                    const words = content.trim().split(/\s+/).length;
                    const readingTime = Math.ceil(words / wordsPerMinute);

                    setPost({
                        title: metadata.title || '',
                        content: marked(content),
                        date: metadata.date || '',
                        author: metadata.author || 'Anonymous',
                        categories: metadata.categories || [],
                        readingTime,
                    });
                    setError(null);
                })
                .catch((err) => {
                    console.error('Error loading blog post:', err);
                    setError('Failed to load the blog post. Please try again later.');
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [id]);

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-red-50 border-l-4 border-red-500 p-4">
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
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <article className="md:w-2/3">
                        <div className="bg-white rounded-lg shadow-md p-8">
                            {isLoading ? (
                                <div className="animate-pulse">
                                    <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
                                    <div className="space-y-3">
                                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
                                    
                                    <div className="flex items-center text-sm text-gray-500 mb-4">
                                        {post.date && (
                                            <time dateTime={post.date}>
                                                {new Date(post.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </time>
                                        )}
                                        <span className="mx-2">•</span>
                                        <span>{post.readingTime} min read</span>
                                        {post.author && (
                                            <>
                                                <span className="mx-2">•</span>
                                                <span>By {post.author}</span>
                                            </>
                                        )}
                                    </div>

                                    {post.categories.length > 0 && (
                                        <div className="flex gap-2 mb-6">
                                            {post.categories.map(category => (
                                                <span 
                                                    key={category}
                                                    className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                                                >
                                                    {category}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    
                                    <div 
                                        className="prose prose-lg max-w-none prose-blue"
                                        dangerouslySetInnerHTML={{ __html: post.content }}
                                    />
                                </>
                            )}
                        </div>
                    </article>
                    <div className="md:w-1/3">
                        <Sidebar />
                    </div>
                </div>
            </main>
        </div>
    );
}
