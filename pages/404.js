import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      
      <Link href="/">
        <a className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition duration-300">
          Go back to Home
        </a>
      </Link>
    </div>
  );
}