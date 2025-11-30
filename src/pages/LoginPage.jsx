// src/pages/LoginPage.jsx
import React from 'react';
import { LogoIcon } from '../components/Icons.jsx';
import { Toaster } from 'react-hot-toast';

const KakaoIcon = () => (
  <svg className='w-5 h-5' viewBox='0 0 32 32'>
    <path
      fill='currentColor'
      d='M16 4.64c-6.96 0-12.64 4.48-12.64 10.08 0 3.52 2.32 6.64 5.76 8.48l-1.92 7.04 7.68-4.16c.4.08.8.08 1.12.08 6.96 0 12.64-4.48 12.64-10.08S22.96 4.64 16 4.64z'></path>
  </svg>
);

export default function LoginPage() {
  const handleKakaoLogin = () => {
    alert('카카오 로그인 테스트');
  };
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4'>
      <Toaster position='top-center' reverseOrder={false} />
      <div className='w-full max-w-sm flex flex-col items-center'>
        <LogoIcon />
        <p className='mt-4 text-center text-gray-600'>
          농부와 소비자를 잇는 새로운 경험,
          <br />
          팜어스에 오신 것을 환영합니다!
        </p>
        <div className='w-full mt-10'>
          <button
            onClick={handleKakaoLogin}
            className='w-full h-12 flex items-center justify-center bg-[#FEE500] text-black rounded-lg font-bold space-x-2 hover:bg-yellow-400 transition'>
            <KakaoIcon />
            <span>카카오로 시작하기</span>
          </button>
        </div>
        <p className='mt-6 text-xs text-gray-400 text-center'>
          로그인 시 <span className='underline'>이용약관</span> 및 <span className='underline'>개인정보 처리방침</span>
          에<br />
          동의하는 것으로 간주됩니다.
        </p>
      </div>
    </div>
  );
}
