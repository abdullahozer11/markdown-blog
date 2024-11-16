import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="p-4 bg-gray-100 rounded-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Posts</h3>
      <ul className="space-y-2">
        <li>
          <Link legacyBehavior href="/blogs/blog1">
            <a className="text-blue-500 hover:underline">First Blog Post</a>
          </Link>
        </li>
        <li>
          <Link legacyBehavior href="/blogs/blog2">
            <a className="text-blue-500 hover:underline">Second Blog Post</a>
          </Link>
        </li>
      </ul>
      <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">Categories</h3>
      <ul className="space-y-2">
        <li>
          <a href="#" className="text-blue-500 hover:underline">Technology</a>
        </li>
        <li>
          <a href="#" className="text-blue-500 hover:underline">Personal</a>
        </li>
        <li>
          <a href="#" className="text-blue-500 hover:underline">Travel</a>
        </li>
      </ul>
    </aside>
  );
}
