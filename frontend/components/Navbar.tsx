'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface NavbarProps {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
  onProfileClick?: () => void;
}

export default function Navbar({ onLoginClick, onSignupClick, onProfileClick }: NavbarProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check login status on mount
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <nav className="bg-gray-600 text-white p-2 shadow-md h-16 flex items-center">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image loading="lazy" src="/logo.png" alt="Logo" width={80} height={80} className="rounded-full" />
        </Link>
        <div className="space-x-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          {isLoggedIn ? (
            <>
              {onProfileClick ? (
                <button onClick={onProfileClick} className="hover:underline">
                  Profile
                </button>
              ) : (
                <Link href="/profile" className="hover:underline">
                  Profile
                </Link>
              )}
              <button onClick={handleLogout} className="hover:underline">
                Logout
              </button>
            </>
          ) : (
            <>
              {onLoginClick ? (
                <button onClick={onLoginClick} className="hover:underline">
                  Login
                </button>
              ) : (
                <Link href="/login" className="hover:underline">
                  Login
                </Link>
              )}
              {onSignupClick ? (
                <button onClick={onSignupClick} className="hover:underline">
                  Signup
                </button>
              ) : (
                <Link href="/signup" className="hover:underline">
                  Signup
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}