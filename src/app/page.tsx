'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // 인증 상태 확인
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    if (isAuthenticated) {
      // 이미 로그인된 경우 대시보드로 리다이렉트
      router.push('/dashboard');
    } else {
      // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">로딩 중...</p>
      </div>
    </div>
  );
}
