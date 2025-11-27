// src/pages/community/CommunityWriteConfirmPage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCommunityWriteStore from '../../store/communityWriteStore';
import styles from './CommunityWriteConfirmPage.module.css';
import toast from 'react-hot-toast';

const CheckCircleIcon = () => (
  <svg width='64' height='64' viewBox='0 0 24 24' fill='none'>
    <path
      d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
      stroke='#15C47E'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

/**
 * 커뮤니티 글 작성 완료 페이지
 * API 연동 완료 후 표시되는 확인 페이지
 */
export default function CommunityWriteConfirmPage() {
  const navigate = useNavigate();
  const reset = useCommunityWriteStore((state) => state.reset);

  const handleConfirm = () => {
    // 스토어 초기화
    reset();

    // 커뮤니티 메인으로 이동
    navigate('/community', { replace: true });

    // 성공 메시지 (선택사항)
    // toast.success('글이 올려졌습니다!');
  };

  return (
    <div className={styles.wrapper}>
      <CheckCircleIcon />
      <h1 className={styles.title}>게시글 등록 완료!</h1>
      <p className={styles.message}>작성한 글은 커뮤니티에서 확인할 수 있어요.</p>
      <button onClick={handleConfirm} className={styles.button}>
        확인
      </button>
    </div>
  );
}
