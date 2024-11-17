// pages/blogs/[id].js

import SEO from '@/components/SEO';

import {useState, useEffect} from 'react';
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
    const {id} = router.query;

    useEffect(() => {
        if (id) {
            setIsLoading(true);
            fetch(`/blogs/${id}.md`)
                .then((res) => res.text())
                .then((text) => {
                    const {data: metadata, content} = matter(text);
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

    // Extract first paragraph for description
    const getDescription = (content) => {
        const firstParagraph = content.split('\n\n')[0]
            .replace(/<[^>]*>/g, '') // Remove HTML tags
            .trim()
            .substring(0, 160); // Limit to 160 characters
        return firstParagraph;
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
            <div className="container mx-auto px-4 lg:px-8">
                <Header/>
                <main className="flex flex-col lg:flex-row gap-8 max-w-screen-xl mx-auto">
                    <article className="lg:w-3/4 w-full">
                        <div
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 transition-colors duration-200">
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

                                    <Link
                                        href={`/author/${encodeURIComponent(post.author || 'anonymous')}`}
                                        className="font-medium text-gray-900 dark:text-white hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                                    >
                                        <div className="flex items-center gap-3 mb-8">
                                            <div
                                                className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                        <span className="text-xl text-gray-500 dark:text-gray-400">
                                            {post.author?.[0]?.toUpperCase() || 'A'}
                                        </span>
                                            </div>
                                            <div>
                                                {post.author || 'Anonymous'}
                                                <div
                                                    className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                                    {post.date && (
                                                        <time dateTime={post.date}>
                                                            {new Date(post.date).toLocaleDateString('en-US', {
                                                                month: 'long',
                                                                day: 'numeric',
                                                                year: 'numeric'
                                                            })}
                                                        </time>
                                                    )}
                                                    <span className="mx-2">•</span>
                                                    <span>{post.readingTime} min read</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                    <div
                                        className="prose dark:prose-invert prose-lg max-w-none"
                                        dangerouslySetInnerHTML={{__html: post.content}}
                                    />

                                    {/* Share buttons */}
                                    <div className="border-t border-gray-200 dark:border-gray-700 mt-8">
                                        <ShareButtons
                                            title={post.title}
                                            tags={post.categories}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </article>

                    <aside className="lg:w-1/4 w-full">
                        <Sidebar/>
                    </aside>
                </main>
            </div>
        </>

    );
}

// Add static generation for better SEO
export async function getStaticPaths() {
    // Get all blog post files
    const fs = require('fs');
    const path = require('path');
    const blogsDirectory = path.join(process.cwd(), 'public/blogs');
    const files = fs.readdirSync(blogsDirectory);
    const paths = files
        .filter(file => file.endsWith('.md'))
        .map(file => ({
            params: {id: file.replace('.md', '')}
        }));

    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({params}) {
    const fs = require('fs');
    const path = require('path');
    const matter = require('gray-matter');

    const filePath = path.join(process.cwd(), 'public/blogs', `${params.id}.md`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const {data: metadata, content} = matter(fileContents);

    return {
        props: {
            post: {
                ...metadata,
                content,
                id: params.id
            }
        }
    };
}
