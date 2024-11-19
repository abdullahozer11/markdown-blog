// components/Header.js
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import FontSelector from './FontSelector';

export default function Header() {
    return (
        <div className="navbar bg-base-100 h-40">
            <div className="navbar-start">
                <Link href="/" className="btn btn-ghost text-xl lg:text-4xl ">MobiCharm</Link>
            </div>

            <div className="navbar-end">
                <FontSelector/>
                <ThemeToggle/>
            </div>
        </div>
    );
}
