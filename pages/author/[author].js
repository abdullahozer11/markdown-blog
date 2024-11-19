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
        <div className="container mx-auto px-4 max-w-screen-xl">
            <Header />
            <main className="flex flex-col lg:flex-row gap-8">
                <section className="lg:w-3/4 w-full">
                    <div className="card bg-base-200 shadow-lg mb-8">
                        <div className="card-body">
                            <div className="flex items-center gap-4">
                                <div className="avatar placeholder">
                                    <div className="w-16 rounded-full bg-neutral text-neutral-content">
                                        <span className="text-2xl">
                                            {formattedAuthorName[0]?.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold">
                                        {formattedAuthorName}
                                    </h1>
                                    <div className="badge badge-neutral">
                                        {posts.length} {posts.length === 1 ? 'story' : 'stories'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="space-y-8">
                            {[1, 2, 3].map((n) => (
                                <div key={n} className="card bg-base-200 shadow animate-pulse">
                                    <div className="card-body">
                                        <div className="h-8 bg-base-300 rounded w-3/4 mb-4" />
                                        <div className="space-y-3">
                                            <div className="h-4 bg-base-300 rounded w-full" />
                                            <div className="h-4 bg-base-300 rounded w-full" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="divide-y divide-base-200">
                            {posts.length === 0 ? (
                                <div className="hero min-h-[200px] bg-base-200 rounded-lg">
                                    <div className="hero-content text-center">
                                        <div>
                                            <h2 className="text-xl font-bold">No stories published yet</h2>
                                            <p className="mt-2 opacity-75">This author hasn't published any stories.</p>
                                        </div>
                                    </div>
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
