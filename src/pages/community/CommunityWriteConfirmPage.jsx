// src/pages/community/CommunityWriteConfirmPage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCommunityWriteStore from '../../store/communityWriteStore';
import { useCommunity } from '../../context/CommunityContext'; // ✨ Context import
import styles from './CommunityWriteConfirmPage.module.css';
import userAvatar from '@/assets/images/user-profile.png'; // 임시 프로필 이미지

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

export default function CommunityWriteConfirmPage() {
  const navigate = useNavigate();
  const { addPost } = useCommunity(); // ✨ Context에서 addPost 함수 가져오기
  const postData = useCommunityWriteStore.getState();

  const handleConfirm = () => {
    // ✨ 새 게시물 객체 생성
    const newPost = {
      id: Date.now(),
      user: {
        name: '새벽들딸기농원', // 임시 사용자 이름
        avatar: userAvatar,
        isFollowing: false,
      },
      content: postData.content,
      images: postData.images,
      category: postData.category,
      // taggedProducts를 tags와 product로 변환 (UI 호환성)
      product: postData.taggedProducts.length > 0 ? postData.taggedProducts[0] : null,
      tags: postData.taggedProducts.map(() => ({ y: 150, x: 150 })), // 임시 태그 위치
      stats: { likes: '0', comments: '0', isLiked: false },
      timeAgo: '방금 전',
    };

    addPost(newPost); // ✨ 새 게시물 추가
    postData.reset(); // 스토어 초기화
    navigate('/community');
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
