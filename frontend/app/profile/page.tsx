'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [mobile, setMobile] = useState('');
  const [gender, setGender] = useState('');
  const [student_Id, setStudentId] = useState('');
  const [class_level, setClassLevel] = useState('');
  const [address, setAddress] = useState('');
  const router = useRouter();

  useEffect(() => {
  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    if(!token) return router.push('/login');
    try {
      const res = await fetch('http://127.0.0.1:8000/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if(res.ok){
        const data = await res.json();
        setFirstName(data.first_name || '');
        setLastName(data.last_name || '');
        setEmail(data.email || '');
        setDob(data.dob || '');
        setMobile(data.mobile || '');
        setGender(data.gender || '');
        setStudentId(data.student_id || '');
        setClassLevel(data.class_level || '');
        setAddress(data.address || '');
      } else {
        router.push('/login');
      }
    } catch(err){
      console.error(err);
    }
  };
  fetchProfile();
}, []);


  const handleSave = async () => {
  const token = localStorage.getItem('token');
  const payload = { 
    first_name: firstName, 
    last_name: lastName, 
    email, 
    dob, 
    mobile, 
    gender, 
    student_id: student_Id ? parseInt(student_Id) : null, 
    class_level,
    address 
  };
  const res = await fetch('http://127.0.0.1:8000/profile', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload)
  });
  if(res.ok){
    alert("Profile saved successfully");
    router.push('/');
  } else {
    alert("Error updating profile");
  }
};

  return (
    <div className="min-h-screen bg-gray-400 p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl text-gray-800 font-bold text-center mb-6">Student Profile</h1>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Date of Birth</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Mobile</label>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800"
              >
                <option className="text-gray-500" value="">Select Gender</option>
                <option className="text-gray-500" value="Male">Male</option>
                <option className="text-gray-500" value="Female">Female</option>
                <option className="text-gray-500" value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Student ID</label>
              <input
                type="text"
                value={student_Id}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Class</label>
              <select                value={class_level}
                onChange={(e) => setClassLevel(e.target.value)}                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800"
              >
                <option className="text-gray-500" value="">Select Class</option>
                <option className="text-gray-500" value="Freshman">School</option>
                <option className="text-gray-500" value="Sophomore">College</option>
                <option className="text-gray-500" value="Junior">Junior</option>
                <option className="text-gray-500" value="Senior">Senior</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800"
                rows={3}
              ></textarea>
            </div>
          </div>
          <button
            type="button"
            onClick={handleSave}
            className="mt-6 w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-300"
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}