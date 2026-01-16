'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    const email = localStorage.getItem('userEmail') || '';
    setIsLoggedIn(loggedIn);
    setUserEmail(email);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-2xl p-10 max-w-4xl w-full mx-auto text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 leading-tight">
          {isLoggedIn ? `Welcome back, ${userEmail.split('@')[0]}!` : 'Welcome to Student Education Portal'}
        </h1>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          {isLoggedIn
            ? 'You are logged in. Explore your courses, assignments, grades, and resources.'
            : 'Empowering students with comprehensive educational resources. Access interactive courses, submit assignments on time, review grades, and build your academic profile for a successful future in learning and career development.'
          }
        </p>
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg transition duration-300"
          >
            Logout
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl text-gray-800 font-bold mb-2">Courses</h2>
          <p className="text-gray-600">Discover a wide range of subjects and enroll in courses tailored to your interests and academic goals.</p>
          <button 
            onClick={() => router.push('/courses')}
            className="mt-4 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
          >
            View Courses
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl text-gray-800 font-bold mb-2">Assignments</h2>
          <p className="text-gray-600">Stay organized with upcoming assignments, submission deadlines, and progress tracking.</p>
          <button 
            onClick={() => router.push('/assignments')}
            className="mt-4 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
          >
            View Assignments
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl text-gray-800 font-bold mb-2">Grades</h2>
          <p className="text-gray-600">Monitor your grades, understand your strengths, and identify areas for improvement.</p>
          <button 
            onClick={() => router.push('/grades')}
            className="mt-4 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
          >
            View Grades
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl text-gray-800 font-bold mb-2">Resources</h2>
          <p className="text-gray-600">Access study materials, tutorials, and additional resources to enhance your learning experience.</p>
          <button 
            onClick={() => router.push('/resources')}
            className="mt-4 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
          >
            View Resources
          </button>
        </div>
      </div>
    </div>
  );
}
