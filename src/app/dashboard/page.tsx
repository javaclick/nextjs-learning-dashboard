'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface RoutineItem {
  id: number;
  title: string;
  completed: boolean;
  time?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [routines, setRoutines] = useState<RoutineItem[]>([
    { id: 1, title: '아침 운동', completed: false, time: '07:00' },
    { id: 2, title: '영어 공부 30분', completed: false, time: '09:00' },
    { id: 3, title: '프로그래밍 학습 1시간', completed: false, time: '10:00' },
    { id: 4, title: '독서 30분', completed: false, time: '14:00' },
    { id: 5, title: '복습 및 정리', completed: false, time: '20:00' },
  ]);

  useEffect(() => {
    // 인증 확인
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const storedUsername = localStorage.getItem('username');

    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    setUsername(storedUsername || '사용자');

    // 현재 날짜 설정
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    };
    setCurrentDate(today.toLocaleDateString('ko-KR', options));

    // 로컬스토리지에서 오늘의 루틴 상태 불러오기
    const savedRoutines = localStorage.getItem('routines');
    if (savedRoutines) {
      setRoutines(JSON.parse(savedRoutines));
    }
  }, [router]);

  const toggleRoutine = (id: number) => {
    const updatedRoutines = routines.map((routine) =>
      routine.id === id ? { ...routine, completed: !routine.completed } : routine
    );
    setRoutines(updatedRoutines);
    localStorage.setItem('routines', JSON.stringify(updatedRoutines));
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    router.push('/login');
  };

  const completedCount = routines.filter((r) => r.completed).length;
  const progress = (completedCount / routines.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              학습 대시보드
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {username}님, 환영합니다!
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            로그아웃
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Date Display */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            오늘의 날짜
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{currentDate}</p>
        </div>

        {/* Progress Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              오늘의 진행률
            </h2>
            <span className="text-lg font-medium text-indigo-600 dark:text-indigo-400">
              {completedCount}/{routines.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
            <div
              className="bg-indigo-600 dark:bg-indigo-500 h-4 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {progress.toFixed(0)}% 완료
          </p>
        </div>

        {/* Routine List */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            일일 루틴
          </h2>
          <div className="space-y-3">
            {routines.map((routine) => (
              <div
                key={routine.id}
                className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition cursor-pointer"
                onClick={() => toggleRoutine(routine.id)}
              >
                <input
                  type="checkbox"
                  checked={routine.completed}
                  onChange={() => toggleRoutine(routine.id)}
                  className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                />
                <div className="ml-4 flex-1">
                  <p
                    className={`font-medium ${
                      routine.completed
                        ? 'line-through text-gray-500 dark:text-gray-500'
                        : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    {routine.title}
                  </p>
                  {routine.time && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {routine.time}
                    </p>
                  )}
                </div>
                {routine.completed && (
                  <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                    완료
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
              완료한 작업
            </p>
            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              {completedCount}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
              남은 작업
            </p>
            <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
              {routines.length - completedCount}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
              전체 작업
            </p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {routines.length}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
