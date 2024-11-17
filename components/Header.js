// components/Header.js
import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Header() {

    return (
        <header className="border-b border-gray-200 dark:border-gray-700 mb-6 transition-colors duration-200">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-3 lg:py-6">
                    {/* Logo container */}
                    <div className="w-24 sm:w-32 lg:w-56">
                        <Link href="/">
                            <div className="relative">
                                <Image
                                    src="/logo.png"
                                    alt="MOBICHARM"
                                    width={240}
                                    height={240}
                                    className="hover:opacity-80 transition-opacity block dark:hidden w-full h-auto"
                                />
                                <Image
                                    src="/logo.white.png"
                                    alt="MOBICHARM"
                                    width={240}
                                    height={240}
                                    className="hover:opacity-80 transition-opacity hidden dark:block w-full h-auto"
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Title */}
                    <Link
                        href="/"
                        className="flex flex-col items-center hover:opacity-80 transition-opacity px-2"
                    >
                        <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
                            MOBICHARM
                        </h1>
                    </Link>

                    {/* Theme Toggle */}
                    <div className="w-24 sm:w-32 lg:w-56 flex justify-end">
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </header>
    );
}
