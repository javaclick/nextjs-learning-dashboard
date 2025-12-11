// 클라이언트 사이드 인증 유틸리티 함수

export const auth = {
  // 로그인 처리
  login: (username: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', username);
    }
  },

  // 로그아웃 처리
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('username');
      localStorage.removeItem('routines');
    }
  },

  // 인증 상태 확인
  isAuthenticated: (): boolean => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('isAuthenticated') === 'true';
    }
    return false;
  },

  // 현재 사용자명 가져오기
  getUsername: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('username');
    }
    return null;
  },
};
