import Link from "next/link";

export default function Header() {
  return (
    <header className="text-center py-6 border-b border-gray-200 mb-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">My Markdown Blog</h1>
      <nav>
        <ul className="flex justify-center gap-4 flex-wrap">
          <li>
            <Link legacyBehavior href="/">
              <a className="text-blue-500 hover:bg-gray-100 px-3 py-2 rounded">Home</a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/blogs/blog1">
              <a className="text-blue-500 hover:bg-gray-100 px-3 py-2 rounded">Blog 1</a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/blogs/blog2">
              <a className="text-blue-500 hover:bg-gray-100 px-3 py-2 rounded">Blog 2</a>
            </Link>
          </li>
          <li>
            <a href="#about" className="text-blue-500 hover:bg-gray-100 px-3 py-2 rounded">About</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
