// components/CategoryTag.js
import Link from 'next/link';

export default function CategoryTag({ category }) {
    return (
        <Link
            href={`/category/${encodeURIComponent(category)}`}
            className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors duration-200"
        >
            {category}
        </Link>
    );
}
