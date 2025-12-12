'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface RoutineItem {
  id: number;
  title: string;
  completed: boolean;
  time?: string;
}

type ViewMode = 'daily' | 'weekly' | 'monthly';

export default function DashboardPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('daily');
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

  // 주간 데이터 (예시)
  const weeklyData = [
    { day: '월', progress: 80 },
    { day: '화', progress: 60 },
    { day: '수', progress: 100 },
    { day: '목', progress: 40 },
    { day: '금', progress: 90 },
    { day: '토', progress: 70 },
    { day: '일', progress: progress },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
              Learning
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {username}님, 환영합니다!
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all border border-gray-200 dark:border-gray-700"
          >
            로그아웃
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* View Mode Tabs */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-2 mb-6 inline-flex">
          <button
            onClick={() => setViewMode('daily')}
            className={`px-6 py-2.5 rounded-xl font-medium transition-all ${
              viewMode === 'daily'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/20'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            일별
          </button>
          <button
            onClick={() => setViewMode('weekly')}
            className={`px-6 py-2.5 rounded-xl font-medium transition-all ${
              viewMode === 'weekly'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/20'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            주별
          </button>
          <button
            onClick={() => setViewMode('monthly')}
            className={`px-6 py-2.5 rounded-xl font-medium transition-all ${
              viewMode === 'monthly'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/20'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            월별
          </button>
        </div>

        {/* Daily View */}
        {viewMode === 'daily' && (
          <>
            {/* Date Display */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                오늘의 날짜
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{currentDate}</p>
            </div>

            {/* Progress Section */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  오늘의 진행률
                </h2>
                <span className="text-lg font-medium text-indigo-600 dark:text-indigo-400">
                  {completedCount}/{routines.length}
                </span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-indigo-600 to-violet-600 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {progress.toFixed(0)}% 완료
              </p>
            </div>

            {/* Routine List */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                일일 루틴
              </h2>
              <div className="space-y-3">
                {routines.map((routine) => (
                  <div
                    key={routine.id}
                    className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer border border-gray-100 dark:border-gray-700"
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 text-center">
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  완료한 작업
                </p>
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  {completedCount}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 text-center">
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  남은 작업
                </p>
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                  {routines.length - completedCount}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 text-center">
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  전체 작업
                </p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {routines.length}
                </p>
              </div>
            </div>
          </>
        )}

        {/* Weekly View */}
        {viewMode === 'weekly' && (
          <>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                이번 주 학습 현황
              </h2>
              <div className="space-y-4">
                {weeklyData.map((day, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {day.day}요일
                      </span>
                      <span className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold">
                        {day.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-indigo-600 to-violet-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${day.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 text-center">
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  주간 평균
                </p>
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  74%
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 text-center">
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  최고 기록
                </p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  100%
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 text-center">
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  달성 일수
                </p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  7일
                </p>
              </div>
            </div>
          </>
        )}

        {/* Monthly View */}
        {viewMode === 'monthly' && (
          <>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                이번 달 학습 통계
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">1주차</p>
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">85%</p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">2주차</p>
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">78%</p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">3주차</p>
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">92%</p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">4주차</p>
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">74%</p>
                </div>
              </div>
            </div>

            {/* Monthly Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 text-center">
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  월간 평균
                </p>
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  82%
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 text-center">
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  총 학습 시간
                </p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  68h
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 text-center">
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  달성 일수
                </p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  25일
                </p>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
