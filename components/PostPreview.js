// Shared post preview component - components/PostPreview.js
import Link from 'next/link';
import Image from 'next/image';

export default function PostPreview({ post }) {
    return (
        <article className="mb-12 group">
            <div className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                    {post.author_image ? (
                        <Image
                            src={post.author_image}
                            alt={post.author}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-xl">
                            {post.author?.[0]?.toUpperCase() || 'A'}
                        </div>
                    )}
                </div>
                <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                        {post.author || 'Anonymous'}
                    </p>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
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
            </div>

            <Link href={`/blogs/${post.id}`} className="block group">
                <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                    {post.title}
                </h2>
                <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 font-serif">
                    {post.preview}
                </p>
            </Link>

            <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                    {post.categories?.map(category => (
                        <Link
                            key={category}
                            href={`/category/${encodeURIComponent(category)}`}
                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            {category}
                        </Link>
                    ))}
                </div>
                
                <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                </button>
            </div>
        </article>
    );
}
