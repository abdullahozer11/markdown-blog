// pages/category/[category].js
import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

export default function CategoryPage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const {category} = router.query;

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
      <Header/>
      <main className="flex flex-col lg:flex-row gap-8 max-w-screen-xl mx-auto">
        <section className="lg:w-3/4 w-full">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Category: {category}
          </h1>

          {isLoading ? (
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <article key={post.id}
                         className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
                  <Link href={`/blogs/${post.id}`}>
                    <h2
                      className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 mb-2">
                      {post.title}
                    </h2>
                  </Link>

                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    <span className="mx-2">•</span>
                    <span>{post.readingTime} min read</span>
                    {post.author && (
                      <>
                        <span className="mx-2">•</span>
                        <span>By {post.author}</span>
                      </>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.categories?.map(category => (
                      <Link
                        key={category}
                        href={`/category/${encodeURIComponent(category)}`}
                        className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors duration-200"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {post.preview}
                  </p>

                  <Link
                    href={`/blogs/${post.id}`}
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200"
                  >
                    Read more
                    <svg
                      className="ml-1 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </article>
              ))}                        </div>
          )}
        </section>

        <aside className="lg:w-1/4 w-full">
          <Sidebar/>
        </aside>
      </main>
    </div>
  );
}
