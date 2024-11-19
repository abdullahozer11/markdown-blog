import SEO from '@/components/SEO';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {marked} from 'marked';
import matter from 'gray-matter';
import Link from 'next/link';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ShareButtons from "@/components/ShareButtons";

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

    const getDescription = (content) => {
        return content.split('\n\n')[0]
            .replace(/<[^>]*>/g, '')
            .trim()
            .substring(0, 160);
    };

    return (
        <>
            <SEO
                title={post.title}
                description={post.description || getDescription(post.content)}
                ogImage={post.coverImage || '/default-og-image.jpg'}
                article={true}
                author={post.author}
                publishedTime={post.date}
                modifiedTime={post.lastModified}
                tags={post.categories}
                canonicalUrl={`${process.env.NEXT_PUBLIC_SITE_URL}/blogs/${id}`}
            />
            <div className="container mx-auto px-4 max-w-screen-xl">
                <Header />
                <main className="flex flex-col lg:flex-row gap-8">
                    <article className="lg:w-3/4 w-full">
                        <div className="card bg-base-200 shadow-xl">
                            <div className="card-body">
                                {isLoading ? (
                                    <div className="animate-pulse">
                                        <div className="h-8 bg-base-300 rounded w-3/4 mb-4" />
                                        <div className="h-4 bg-base-300 rounded w-1/4 mb-8" />
                                        <div className="space-y-3">
                                            <div className="h-4 bg-base-300 rounded w-full" />
                                            <div className="h-4 bg-base-300 rounded w-full" />
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <h1 className="card-title text-3xl mb-4">
                                            {post.title}
                                        </h1>

                                        <Link
                                            href={`/author/${encodeURIComponent(post.author || 'anonymous')}`}
                                            className="hover:opacity-80 transition-opacity"
                                        >
                                            <div className="flex items-center gap-3 mb-8">
                                                <div className="avatar placeholder">
                                                    <div className="w-12 rounded-full bg-neutral text-neutral-content">
                                                        <span className="text-xl">
                                                            {post.author?.[0]?.toUpperCase() || 'A'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-medium">
                                                        {post.author || 'Anonymous'}
                                                    </div>
                                                    <div className="text-sm opacity-70">
                                                        {post.date && (
                                                            <time dateTime={post.date}>
                                                                {new Date(post.date).toLocaleDateString('en-US', {
                                                                    month: 'long',
                                                                    day: 'numeric',
                                                                    year: 'numeric'
                                                                })}
                                                            </time>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>

                                        {/* Categories */}
                                        {post.categories && post.categories.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-8">
                                                {post.categories.map(category => (
                                                    <Link
                                                        key={category}
                                                        href={`/category/${encodeURIComponent(category)}`}
                                                        className="badge badge-primary badge-outline"
                                                    >
                                                        {category}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}

                                        <div
                                            className="prose dark:prose-invert prose-lg max-w-none"
                                            dangerouslySetInnerHTML={{ __html: post.content }}
                                        />

                                        {/* Share buttons */}
                                        <div className="divider mt-8" />
                                        <ShareButtons
                                            title={post.title}
                                            tags={post.categories}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </article>

                    <aside className="lg:w-1/4 w-full">
                        <Sidebar />
                    </aside>
                </main>
            </div>
        </>
    );
}
