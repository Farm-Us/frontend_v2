// community/CommunityWriteImagePage
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Mousewheel, Pagination } from 'swiper/modules';
import styles from '@/pages/community/CommunityWriteImagePage.module.css';
// Icons
import CameraIcon from '@/assets/icons/Camera.svg?react';
import { CloseIcon, PlusIcon } from '@/components/Icons';
import { useNavigate } from 'react-router-dom';

export default function ImageCarousel({
  images = [],
  mode = 'edit', // edit, read
  removeImage,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleDelete = () => {
    removeImage(currentIndex);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0)); // 마지막 슬라이드 삭제 시 보정
  };

  const handleAddTag = () => {
    console.log('상품추가 버튼 클릭');
    ///community/write-tag 이동
    navigate('/community/write-tag');
  };

  return (
    <div className='relative w-full h-[335px] bg-gray-100 flex justify-center rounded overflow-hidden'>
      {images.length > 0 ? (
        <>
          <Swiper
            modules={[Pagination, Mousewheel]}
            slidesPerView={1}
            pagination={{ clickable: true }}
            mousewheel
            onSlideChange={(s) => setCurrentIndex(s.activeIndex)}>
            {images.map((src, idx) => (
              <SwiperSlide key={idx}>
                <img src={src} className='w-full h-full object-fill' />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* 우측 상단 mode에 따라 바뀜 */}
          {mode === 'edit' && (
            <>
              {/* 이미지 삭제 버튼 (우측 상단) */}
              <button
                type='button'
                onClick={handleDelete}
                className={`${styles.deleteButton} shadow-sm`}
                style={{ zIndex: 20, pointerEvents: 'auto' }}>
                <CloseIcon />
              </button>

              {/* 상품 태그 추가 버튼 (하단 중앙) */}
              <button
                type='button'
                onClick={handleAddTag}
                className='
                      absolute bottom-8 left-1/2 -translate-x-1/2
                      bg-green-500 text-white
                      px-4 py-2 rounded-xl shadow-md
                      hover:bg-green-600 active:scale-95 transition-all
                      flex justify-center items-cetner gap-1 font-semibold text-sm z-20
              '>
                <PlusIcon size={18} color='#fff' /> 상품 태그 추가
              </button>
            </>
          )}
          {mode === 'read' && (
            <div className='absolute top-2 right-2 px-2 py-1 bg-black bg-opacity-50 text-white text-sm rounded-lg'>
              {currentIndex + 1}/{images.length}
            </div>
          )}
        </>
      ) : (
        <div
          onClick={() => mode === 'edit' && document.getElementById('image-upload-input')?.click()}
          className='flex flex-col gap-1 justify-center items-center'>
          <CameraIcon />
          <span className='text-lg font-semibold text-gray-800 leading-relaxed'>사진올리기</span>
          <span className='text-base font-md leading-snug text-gray-500'>10장까지 올릴 수 있어요</span>
        </div>
      )}
    </div>
  );
}
