import {useState, useEffect} from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import PostPreview from "@/components/PostPreview";

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
        <div className="container mx-auto px-4 max-w-screen-xl">
            <Header/>
            <main className="flex flex-col lg:flex-row gap-8 py-8">
                <section className="lg:w-3/4 w-full">
                    {isLoading ? (
                        <div className="space-y-8">
                            {[1, 2, 3].map((n) => (
                                <div key={n} className="card bg-base-200 shadow-sm animate-pulse">
                                    <div className="card-body">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="avatar placeholder">
                                                <div className="w-12 rounded-full bg-base-300"/>
                                            </div>
                                            <div className="space-y-2 flex-1">
                                                <div className="h-4 bg-base-300 rounded w-32"/>
                                                <div className="h-3 bg-base-300 rounded w-48"/>
                                            </div>
                                        </div>
                                        <div className="h-8 bg-base-300 rounded w-3/4 mb-4"/>
                                        <div className="space-y-3">
                                            <div className="h-4 bg-base-300 rounded w-full"/>
                                            <div className="h-4 bg-base-300 rounded w-full"/>
                                            <div className="h-4 bg-base-300 rounded w-2/3"/>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            {blogPosts.length === 0 ? (
                                <div className="hero min-h-[200px] bg-base-200 rounded-lg">
                                    <div className="hero-content text-center">
                                        <div>
                                            <h2 className="text-xl font-bold">No stories yet</h2>
                                            <p className="mt-2 opacity-75">Check back later for new content!</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="divide-y divide-base-300">
                                    {blogPosts.map((post) => (
                                        <PostPreview key={post.id} post={post}/>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </section>

                <aside className="lg:w-1/4 w-full">
                    <Sidebar/>
                </aside>
            </main>
        </div>
    );
}
