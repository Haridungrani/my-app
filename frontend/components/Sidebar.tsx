import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-200 text-gray-800 min-h-screen p-4">
      <h2 className="text-lg bg-gray-200  font-bold text-center mb-4">Options</h2>
      <ul className="space-y-2">
        <li>
          <Link href="/" className="block py-2 px-4 rounded hover:bg-gray-300">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/profile" className="block py-2 px-4 rounded hover:bg-gray-300">
            My Profile
          </Link>
        </li>
        <li>
          <Link href="/courses" className="block py-2 px-4 rounded hover:bg-gray-300">
            Courses
          </Link>
        </li>
        <li>
          <Link href="/assignments" className="block py-2 px-4 rounded hover:bg-gray-300">
            Assignments
          </Link>
        </li>
        <li>
          <Link href="/grades" className="block py-2 px-4 rounded hover:bg-gray-300">
            Grades
          </Link>
        </li>
        <li>
          <Link href="/settings" className="block py-2 px-4 rounded hover:bg-gray-300">
            Settings
          </Link>
        </li>
      </ul>
    </aside>
  );
}