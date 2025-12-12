'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // 더미 인증: 사용자명과 비밀번호가 비어있지 않으면 로그인 허용
    if (username.trim() && password.trim()) {
      // localStorage에 인증 상태 저장
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', username);

      // 대시보드로 이동
      router.push('/dashboard');
    } else {
      setError('사용자명과 비밀번호를 입력해주세요');
    }
  };

  const handleGuestLogin = () => {
    // 게스트로 로그인
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('username', 'Guest');

    // 대시보드로 이동
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="w-full max-w-sm">
        {/* 헤더 */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent mb-3">
            Learning
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            학습 대시보드에 오신 것을 환영합니다
          </p>
        </div>

        {/* 로그인 폼 */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 p-8 mb-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-800 border-0 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:bg-white dark:focus:bg-gray-800 transition-all"
                placeholder="사용자명"
              />
            </div>

            <div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-800 border-0 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:bg-white dark:focus:bg-gray-800 transition-all"
                placeholder="비밀번호"
              />
            </div>

            {error && (
              <div className="px-4 py-3 bg-red-50 dark:bg-red-950/50 border border-red-100 dark:border-red-900 rounded-xl">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200"
            >
              로그인
            </button>
          </form>
        </div>

        {/* 구분선 */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-gray-50 dark:bg-gray-950 text-gray-400 dark:text-gray-600">
              또는
            </span>
          </div>
        </div>

        {/* 게스트 시작 카드 */}
        <div className="bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30 rounded-3xl border border-indigo-100 dark:border-indigo-900/50 p-6">
          <div className="text-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              계정이 없으신가요?
            </h2>
          </div>
          <button
            type="button"
            onClick={handleGuestLogin}
            className="w-full py-3.5 px-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl border border-indigo-200 dark:border-indigo-800 shadow-sm transition-all duration-200"
          >
            게스트로 시작하기
          </button>
        </div>
      </div>
    </div>
  );
}
