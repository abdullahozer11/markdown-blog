// components/CategoryTag.js
import Link from 'next/link';

export default function CategoryTag({ category }) {
    return (
        <Link
            href={`/category/${encodeURIComponent(category)}`}
            className="badge badge-primary badge-outline hover:badge-primary transition-colors cursor-pointer"
        >
            {category}
        </Link>
    );
};
