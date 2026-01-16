'use client';

import { useRouter } from 'next/navigation';

export default function Assignments() {
  const router = useRouter();

  const assignments = [
    { id: 1, title: 'Calculus Problem Set #5', course: 'Mathematics 101', dueDate: '2026-01-20', status: 'Pending', points: 100 },
    { id: 2, title: 'Physics Lab Report', course: 'Physics 201', dueDate: '2026-01-22', status: 'Submitted', points: 50 },
    { id: 3, title: 'Python Programming Project', course: 'Computer Science 150', dueDate: '2026-01-25', status: 'Pending', points: 150 },
    { id: 4, title: 'Essay: Modern Poetry Analysis', course: 'English Literature', dueDate: '2026-01-18', status: 'Overdue', points: 100 },
    { id: 5, title: 'Chemical Equations Worksheet', course: 'Chemistry 101', dueDate: '2026-01-28', status: 'Pending', points: 75 },
    { id: 6, title: 'History Research Paper', course: 'History 120', dueDate: '2026-02-01', status: 'Pending', points: 200 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Submitted':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Assignments</h1>
          <button
            onClick={() => router.push('/')}
            className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-6 rounded-lg transition duration-300"
          >
            Back to Home
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Assignment</th>
                <th className="py-3 px-4 text-left">Course</th>
                <th className="py-3 px-4 text-left">Due Date</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Points</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment, index) => (
                <tr key={assignment.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-3 px-4 text-gray-800 font-semibold">{assignment.title}</td>
                  <td className="py-3 px-4 text-gray-600">{assignment.course}</td>
                  <td className="py-3 px-4 text-gray-600">{assignment.dueDate}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(assignment.status)}`}>
                      {assignment.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{assignment.points}</td>
                  <td className="py-3 px-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded text-sm">
                      {assignment.status === 'Submitted' ? 'View' : 'Submit'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
