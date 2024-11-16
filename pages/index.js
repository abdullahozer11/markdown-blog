import Link from 'next/link';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

export default function Home() {
    return (
        <div>
            <Header />
            <main style={{ display: 'flex', gap: '2rem' }}>
                <section className="blog-posts" style={{ flex: 3 }}>
                    <article className="blog-post">
                        <h2>Welcome to My Blog</h2>
                        <div className="meta">Posted on November 16, 2024</div>
                        <div className="blog-content">
                            Select a blog post to read...
                        </div>
                    </article>
                </section>
                <Sidebar />
            </main>
        </div>
    );
}
