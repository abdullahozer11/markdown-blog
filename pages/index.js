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
    <div className="container mx-auto px-4 lg:px-8 max-w-screen-xl">
      <Header/>
      <main className="flex flex-col lg:flex-row gap-12 py-8">
        <section className="lg:w-3/4 w-full">
          {isLoading ? (
            <div className="space-y-12">
              {[1, 2, 3].map((n) => (
                <div key={n} className="animate-pulse">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"/>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"/>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-48"/>
                    </div>
                  </div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"/>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"/>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"/>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"/>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {blogPosts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-600 dark:text-gray-300">No stories yet.</p>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">Check back later for new content!</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
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
