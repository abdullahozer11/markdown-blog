// pages/author/[author].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import PostPreview from '@/components/PostPreview';

export default function AuthorPage() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const { author } = router.query;

    useEffect(() => {
        if (author) {
            setIsLoading(true);
            fetch('/api/get-blogs')
                .then(res => res.json())
                .then(data => {
                    const authorPosts = data.blogs.filter(post =>
                        post.author?.toLowerCase() === decodeURIComponent(author).toLowerCase()
                    );
                    setPosts(authorPosts);
                })
                .catch(error => console.error('Error:', error))
                .finally(() => setIsLoading(false));
        }
    }, [author]);

    const formattedAuthorName = author ? decodeURIComponent(author) : '';

    return (
        <div className="container mx-auto px-4 lg:px-8 max-w-screen-xl">
            <Header />
            <main className="flex flex-col lg:flex-row gap-8 max-w-screen-xl mx-auto">
                <section className="lg:w-3/4 w-full">
                    <div className="mb-12">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-2xl text-gray-600 dark:text-gray-300">
                                {formattedAuthorName[0]?.toUpperCase()}
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                    {formattedAuthorName}
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {posts.length} {posts.length === 1 ? 'story' : 'stories'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="space-y-12">
                            {[1, 2, 3].map((n) => (
                                <div key={n} className="animate-pulse">
                                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                                    <div className="space-y-3">
                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100 dark:divide-gray-800">
                            {posts.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-xl text-gray-600 dark:text-gray-300">
                                        No stories published yet.
                                    </p>
                                </div>
                            ) : (
                                posts.map((post) => (
                                    <PostPreview key={post.id} post={post} showAuthor={false} />
                                ))
                            )}
                        </div>
                    )}
                </section>

                <aside className="lg:w-1/4 w-full">
                    <Sidebar />
                </aside>
            </main>
        </div>
    );
}

