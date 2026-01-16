'use client';

import { useRouter } from 'next/navigation';

export default function Resources() {
  const router = useRouter();

  const resources = [
    {
      id: 1,
      category: 'Study Guides',
      items: [
        { name: 'Mathematics Study Guide', type: 'PDF', size: '2.5 MB' },
        { name: 'Physics Formula Sheet', type: 'PDF', size: '1.2 MB' },
        { name: 'Chemistry Periodic Table', type: 'PDF', size: '800 KB' },
      ]
    },
    {
      id: 2,
      category: 'Video Tutorials',
      items: [
        { name: 'Python Programming Basics', type: 'Video', size: '45 min' },
        { name: 'Calculus Explained', type: 'Video', size: '30 min' },
        { name: 'Essay Writing Tips', type: 'Video', size: '25 min' },
      ]
    },
    {
      id: 3,
      category: 'Practice Tests',
      items: [
        { name: 'Mathematics Practice Test #1', type: 'Quiz', size: '20 questions' },
        { name: 'Physics Mock Exam', type: 'Quiz', size: '30 questions' },
        { name: 'History Practice Quiz', type: 'Quiz', size: '15 questions' },
      ]
    },
    {
      id: 4,
      category: 'E-Books',
      items: [
        { name: 'Introduction to Algorithms', type: 'PDF', size: '15 MB' },
        { name: 'World History Atlas', type: 'PDF', size: '25 MB' },
        { name: 'Scientific Writing Guide', type: 'PDF', size: '3 MB' },
      ]
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'PDF':
        return 'bg-red-100 text-red-800';
      case 'Video':
        return 'bg-purple-100 text-purple-800';
      case 'Quiz':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Learning Resources</h1>
          <button
            onClick={() => router.push('/')}
            className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-6 rounded-lg transition duration-300"
          >
            Back to Home
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((resource) => (
            <div key={resource.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                {resource.category}
              </h2>
              <div className="space-y-3">
                {resource.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200">
                    <div className="flex-1">
                      <p className="text-gray-800 font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.size}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(item.type)}`}>
                        {item.type}
                      </span>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded text-sm">
                        {item.type === 'Video' ? 'Watch' : item.type === 'Quiz' ? 'Start' : 'Download'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
