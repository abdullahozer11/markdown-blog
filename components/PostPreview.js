// Shared post preview component - components/PostPreview.js
import Link from 'next/link';
import Image from 'next/image';
import CategoryTag from "@/components/CategoryTag";

export default function PostPreview({post}) {
  return (
    <article className="mb-12 group">
      <div className="flex items-center gap-3 mb-4">
        <Link href={`/author/${encodeURIComponent(post.author || 'anonymous')}`} className="flex items-center gap-3">
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
            <p
              className="font-medium text-gray-900 dark:text-white hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
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
        </Link>
      </div>


      <Link href={`/blogs/${post.id}`} className="block group">
        <h2
          className="text-3xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
          {post.title}
        </h2>
        <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 font-serif">
          {post.preview}
        </p>
      </Link>

      <div className="flex flex-wrap gap-2">
        {post.categories?.map(category => (
          <CategoryTag key={category} category={category}/>
        ))}
      </div>

    </article>
  );
}
