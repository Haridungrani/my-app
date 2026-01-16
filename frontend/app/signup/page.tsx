'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }
  try {
    const res = await fetch('http://127.0.0.1:8000/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: "include",
      body: JSON.stringify({name, email, password})
    });
    if(res.ok){
      router.push('/login');
    } else {
      const data = await res.json();
      alert(data.detail || "Signup failed");
    }
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl text-gray-800 font-bold mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800"
              autoComplete="name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800"
              autoComplete="email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800"
              autoComplete="new-password"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800"
              autoComplete="new-password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-gray-500 text-center">
          Already have an account? <Link href="/login" className="text-gray-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}