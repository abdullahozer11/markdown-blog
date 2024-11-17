// pages/category/[category].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import PostPreview from '@/components/PostPreview';

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
                    const filteredPosts = data.blogs.filter(post =>
                        post.categories?.includes(category)
                    );
                    setPosts(filteredPosts);
                })
                .catch(error => console.error('Error:', error))
                .finally(() => setIsLoading(false));
        }
    }, [category]);

    return (
        <div className="container mx-auto px-4 lg:px-8">
            <Header />
            <main className="flex flex-col lg:flex-row gap-8 max-w-screen-xl mx-auto">
                <section className="lg:w-3/4 w-full">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                        Category: {category}
                    </h1>

                    {isLoading ? (
                        <div className="space-y-12">
                            {[1, 2, 3].map((n) => (
                                <div key={n} className="animate-pulse">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                                        <div className="space-y-2">
                                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
                                        </div>
                                    </div>
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
                            {posts.map((post) => (
                                <PostPreview key={post.id} post={post} />
                            ))}
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
