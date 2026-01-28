'use client';

import { useRouter } from 'next/navigation';

export default function Grades() {
  const router = useRouter();

  const grades = [
    { id: 1, course: 'Mathematics 101', assignments: 8, average: 92, grade: 'A' },
    { id: 2, course: 'Physics 201', assignments: 6, average: 85, grade: 'B+' },
    { id: 3, course: 'Computer Science 150', assignments: 10, average: 95, grade: 'A' },
    { id: 4, course: 'English Literature', assignments: 5, average: 88, grade: 'B+' },
    { id: 5, course: 'Chemistry 101', assignments: 7, average: 90, grade: 'A-' },
    { id: 6, course: 'History 120', assignments: 4, average: 82, grade: 'B' },
  ];

  const overallGPA = (
    grades.reduce((acc, grade) => {
      const gradePoints: { [key: string]: number } = {
        'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7,
        'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D': 1.0, 'F': 0.0
      };
      return acc + (gradePoints[grade.grade] || 0);
    }, 0) / grades.length
  ).toFixed(2);

  const getGradeColor = (average: number) => {
    if (average >= 90) return 'text-green-600 font-bold';
    if (average >= 80) return 'text-blue-600 font-bold';
    if (average >= 70) return 'text-yellow-600 font-bold';
    return 'text-red-600 font-bold';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">My Grades</h1>
          <button
            onClick={() => router.push('/')}
            className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-6 rounded-lg transition duration-300"
          >
            Back to Home
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Overall Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Overall GPA</p>
              <p className="text-3xl font-bold text-blue-600">{overallGPA}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Total Courses</p>
              <p className="text-3xl font-bold text-green-600">{grades.length}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Average Score</p>
              <p className="text-3xl font-bold text-purple-600">
                {(grades.reduce((acc, g) => acc + g.average, 0) / grades.length).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Course</th>
                <th className="py-3 px-4 text-left">Assignments</th>
                <th className="py-3 px-4 text-left">Average</th>
                <th className="py-3 px-4 text-left">Letter Grade</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((grade, index) => (
                <tr key={grade.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-3 px-4 text-gray-800 font-semibold">{grade.course}</td>
                  <td className="py-3 px-4 text-gray-600">{grade.assignments} completed</td>
                  <td className={`py-3 px-4 ${getGradeColor(grade.average)}`}>{grade.average}%</td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                      {grade.grade}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="bg-gray-600 hover:bg-gray-700 text-white py-1 px-4 rounded text-sm">
                      View Details
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
