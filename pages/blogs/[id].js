// pages/blogs/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { marked } from 'marked';
import matter from 'gray-matter';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

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
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            setIsLoading(true);
            fetch(`/blogs/${id}.md`)
                .then((res) => res.text())
                .then((text) => {
                    const { data: metadata, content } = matter(text);
                    const htmlContent = marked(content);
                    setPost({
                        ...metadata,
                        content: htmlContent
                    });
                })
                .catch((err) => {
                    console.error('Error loading blog post:', err);
                    router.push('/');
                })
                .finally(() => setIsLoading(false));
        }
    }, [id, router]);

    return (
        <div className="container mx-auto px-4 lg:px-8">
            <Header />
            <main className="flex flex-col lg:flex-row gap-8 max-w-screen-xl mx-auto">
                <article className="lg:w-3/4 w-full">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 transition-colors duration-200">
                        {isLoading ? (
                            <div className="animate-pulse">
                                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
                                <div className="space-y-3">
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                    {post.title}
                                </h1>
                                
                                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-6">
                                    {post.date && (
                                        <time dateTime={post.date}>
                                            {new Date(post.date).toLocaleDateString()}
                                        </time>
                                    )}
                                    {post.author && (
                                        <>
                                            <span className="mx-2">•</span>
                                            <span>By {post.author}</span>
                                        </>
                                    )}
                                </div>

                                <div 
                                    className="prose dark:prose-invert prose-lg max-w-none"
                                    dangerouslySetInnerHTML={{ __html: post.content }} 
                                />
                            </>
                        )}
                    </div>
                </article>
                
                <aside className="lg:w-1/4 w-full">
                    <Sidebar />
                </aside>
            </main>
        </div>
    );
}
