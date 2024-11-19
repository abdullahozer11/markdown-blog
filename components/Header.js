// components/Header.js
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Header() {
    return (
        <header className="border-b border-base-300">
            <div className="navbar bg-base-100">
                <div className="navbar-center">
                    <Link href="/" className="btn btn-ghost text-5xl normal-case">
                        MOBICHARM
                    </Link>
                </div>
                <div className="navbar-end">
                    <div className="dropdown dropdown-end">
                        <ThemeToggle/>
                    </div>
                </div>
            </div>
        </header>
    );
}
