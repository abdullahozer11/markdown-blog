// Shared post preview component - components/PostPreview.js
import Link from 'next/link';
import Image from 'next/image';
import CategoryTag from "@/components/CategoryTag";
import {marked} from 'marked';
import matter from 'gray-matter';

export default function PostPreview({post}) {
    const getPreviewText = (text) => {
        const {content} = matter(text);
        return marked(content)
            .replace(/<[^>]*>/g, '')
            .replace(/&quot;/g, '"')
            .replace(/&apos;/g, "'")
            .replace(/&amp;/g, '&')
            .replace(/&#39;/g, "'")
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .split('. ')
            .slice(0, 3)
            .join('. ')
            .trim() + '.';
    };

    const cleanPreview = post.preview ? getPreviewText(post.preview) : '';

    return (
        <article className="card bg-base-200 shadow-xl mb-8 hover:shadow-2xl transition-shadow">
            <div className="card-body">
                <div className="flex items-center gap-3 mb-4">
                    <Link
                        href={`/author/${encodeURIComponent(post.author || 'anonymous')}`}
                        className="flex items-center gap-3"
                    >
                        <div className="avatar placeholder">
                            <div className="w-12 rounded-full">
                                {post.author_image ? (
                                    <Image
                                        src={post.author_image}
                                        alt={post.author}
                                        width={48}
                                        height={48}
                                        className="rounded-full"
                                    />
                                ) : (
                                    <span
                                        className="flex h-full w-full items-center justify-center bg-base-300 text-base-content">
        {post.author?.[0]?.toUpperCase() || 'A'}
      </span>
                                )}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-medium hover:opacity-80 transition-opacity">
                                {post.author || 'Anonymous'}
                            </h3>
                            <div className="text-sm opacity-70">
                                <time dateTime={post.date}>
                                    {new Date(post.date).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </time>
                                <span className="mx-2">·</span>
                                <span>{post.readingTime} min read</span>
                            </div>
                        </div>
                    </Link>
                </div>

                <Link href={`/blogs/${post.id}`} className="hover:opacity-90 transition-opacity">
                    <h2 className="card-title text-2xl mb-3">
                        {post.title}
                    </h2>
                    <p className="text-lg mb-4 line-clamp-3 opacity-80">
                        {cleanPreview}
                    </p>
                </Link>

                <div className="card-actions flex flex-wrap gap-2">
                    {post.categories?.map(category => (
                        <CategoryTag key={category} category={category}/>
                    ))}
                </div>
            </div>
        </article>
    );
};
