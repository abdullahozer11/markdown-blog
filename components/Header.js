// components/Header.js
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import FontSelector from './FontSelector';

export default function Header() {
    return (
        <header className="border-b border-base-300 h-80">
            <div className="navbar bg-base-100">
                <div className="navbar-center">
                    <Link href="/" className="btn btn-ghost text-5xl normal-case">
                        MOBICHARM BLOG
                    </Link>
                </div>
                <div className="navbar-end">
                    <div className="flex gap-2">
                        <FontSelector />
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </header>
    );
}
