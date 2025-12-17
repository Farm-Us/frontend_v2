// src/pages/community/CommunityWritePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCommunityWriteStore from '../../store/communityWriteStore';
import styles from './CommunityWritePage.module.css';
// --- 컴포넌트 ---
import ImageCarousel from '../../components/carousel/ImageCarousel';
import TaggedProductsList from '../../components/community/TaggedProductsList';

// --- 아이콘 ---
import { ChevronLeftIcon } from '@/components/Icons';
import CameraIcon from '@/assets/icons/Camera.svg?react';
import useCommunityWriteForm from '../../hooks/useCommunityWriteForm';

export default function CommunityWritePage() {
  const navigate = useNavigate();
  // Zustand 스토어에서 상태와 액션을 가져옵니다.
  // 마찬가지로 object 대신 개별 selector
  const images = useCommunityWriteStore((state) => state.images);
  const addImages = useCommunityWriteStore((state) => state.addImages);
  const removeImage = useCommunityWriteStore((state) => state.removeImage);
  const taggedProducts = useCommunityWriteStore((state) => state.taggedProducts);
  const taggedProductsData = useCommunityWriteStore((state) => state.taggedProductsData);
  const toggleProductTag = useCommunityWriteStore((state) => state.toggleProductTag);

  // react-hook-form + zustand custom hook
  const { register, handleSubmit, onSubmit, errors, isValid } = useCommunityWriteForm();

  // 상품 태그 제거 핸들러
  const handleRemoveTag = (productId) => {
    // taggedProducts에서 해당 상품 찾아서 toggleProductTag 호출
    const productToRemove = taggedProducts.find((p) => p.id === productId || p.itemId === productId);
    if (productToRemove) {
      toggleProductTag(productToRemove);
    }
  };

  // const categories = ['공예품', '농산물', '수산물', '농장체험', '축산업'];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
      {/* --- 상단 헤더 --- */}
      <header className={styles.header}>
        <button type='button' onClick={() => navigate(-1)} className={styles.iconButton}>
          <ChevronLeftIcon />
        </button>
        <h1 className={styles.headerTitle}>커뮤니티 글쓰기</h1>
        <button
          type='submit'
          className={isValid ? styles.nextButtonActive : styles.nextButtonInactive}
          disabled={!isValid}>
          올리기
        </button>
      </header>

      {/* --- 메인 컨텐츠 (글쓰기 영역) --- */}
      <main className={styles.content}>
        {/* 제목 입력 */}
        <input
          type='text'
          placeholder='제목을 입력해주세요.'
          className='w-full py-2 border-b'
          {...register('title', { required: '제목을 입력해주세요.' })}
        />
        <div className='py-4'>
          {/* 이미지 미리보기 추가 */}
          <div className='h-[335px]'>
            <ImageCarousel images={images} removeImage={removeImage} mode='edit' />
          </div>

          {/* 태그된 상품 목록 */}
          <TaggedProductsList
            taggedProductIds={taggedProducts}
            products={taggedProductsData}
            onRemoveTag={handleRemoveTag}
          />

          <textarea
            className={`pt-1 ${styles.textarea}`}
            placeholder='이런 저런 상품 이야기를 나누어보세요.&#10;어떤 사진인지 짧은 소개로 시작해보세요.'
            {...register('content', { required: '내용을 입력해주세요.' })}
          />
        </div>
      </main>

      {/* --- 하단 바 (카테고리 선택 및 기능 버튼) --- */}
      <footer className={styles.bottomBar}>
        <div className={styles.functionButtons}>
          <button
            type='button'
            onClick={() => document.getElementById('image-upload-input')?.click()}
            className={styles.iconButton}>
            <CameraIcon fill='#6A7685' />
            <span>사진</span>
          </button>
          {/* 이미지 업로드를 위한 숨겨진 input */}
          <input
            id='image-upload-input'
            type='file'
            multiple
            accept='image/*'
            style={{ display: 'none' }}
            // onChange={(e) => navigate('/community/write-image', { state: { files: e.target.files } })}
            onChange={(e) => addImages(e.target.files)}
          />
        </div>
      </footer>
    </form>
  );
}
