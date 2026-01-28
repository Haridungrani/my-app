'use client';

import { useRouter } from 'next/navigation';

export default function Courses() {
  const router = useRouter();

  const courses = [
    { id: 1, name: 'Mathematics 101', instructor: 'Dr. Smith', enrolled: 45, description: 'Introduction to Calculus and Algebra' },
    { id: 2, name: 'Physics 201', instructor: 'Prof. Johnson', enrolled: 38, description: 'Classical Mechanics and Thermodynamics' },
    { id: 3, name: 'Computer Science 150', instructor: 'Dr. Williams', enrolled: 52, description: 'Programming Fundamentals with Python' },
    { id: 4, name: 'English Literature', instructor: 'Prof. Brown', enrolled: 30, description: 'Modern and Contemporary Literature' },
    { id: 5, name: 'Chemistry 101', instructor: 'Dr. Davis', enrolled: 42, description: 'General Chemistry and Lab Techniques' },
    { id: 6, name: 'History 120', instructor: 'Prof. Martinez', enrolled: 35, description: 'World History: Ancient to Modern' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">My Courses</h1>
          <button
            onClick={() => router.push('/')}
            className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-6 rounded-lg transition duration-300"
          >
            Back to Home
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{course.name}</h2>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Instructor:</span> {course.instructor}
              </p>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{course.enrolled} students enrolled</span>
                <button className="bg-gray-600 hover:bg-gray-700 text-white py-1 px-4 rounded text-sm">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
