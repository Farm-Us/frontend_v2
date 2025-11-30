// components/ProductRegistrationForm/ImageUpload.jsx
import React from 'react';
import styles from '@/pages/ProductRegistrationPage.module.css';
import FormGuideCard from '../FormGuideCard';
import productImage from '@/assets/images/product-watermelon.jpg';
const CameraIcon = () => (
  <svg width='32' height='32' viewBox='0 0 24 24'>
    <path
      d='M4 8.25V6.75C4 5.64543 4.89543 4.75 6 4.75H8.5L10.5 2.75H13.5L15.5 4.75H18C19.1046 4.75 20 5.64543 20 6.75V8.25M4 8.25V17.25C4 18.3546 4.89543 19.25 6 19.25H18C19.1046 19.25 20 18.3546 20 17.25V8.25M4 8.25H20M12 16.25C13.6569 16.25 15 14.9069 15 13.25C15 11.5931 13.6569 10.25 12 10.25C10.3431 10.25 9 11.5931 9 13.25C9 14.9069 10.3431 16.25 12 16.25Z'
      stroke='#6a7685'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export const ImageUpload = ({
  control,
  Controller,
  validationRules,
  errors,
  handleImageChange,
  name = 'mainImage',
}) => (
  <div className={styles.inputGroup}>
    <label className={styles.label}>
      대표 이미지를 올려주세요 <span className={styles.required}>*</span>
    </label>
    <FormGuideCard
      title='상품 사진 촬영 가이드'
      guidelines={[
        '저화질, 초점이 나간 이미지는 피해주세요',
        '상품을 잘 나타내는 직관적인 이미지를 선택해주세요',
        '배경은 너무 어둡지 않게 촬영해주세요',
      ]}
      exampleImages={[{ src: productImage, alt: '좋은 예시 1' }]}
      className='mx-auto'
    />
    <Controller
      name={name}
      control={control}
      rules={validationRules.mainImage}
      render={({ field: { onChange, value } }) => (
        <>
          <label htmlFor='main-image-upload' className={styles.imgUpload}>
            {value ? (
              <img
                src={typeof value === 'string' ? value : URL.createObjectURL(value)}
                alt='대표 이미지 미리보기'
                className={styles.imagePreview}
              />
            ) : (
              <div className={styles.imgInfo}>
                <CameraIcon />
                <div>사진 올리기</div>
              </div>
            )}
          </label>
          <input
            id='main-image-upload'
            type='file'
            accept='image/*'
            style={{ display: 'none' }}
            onChange={(e) => handleImageChange(e, onChange)}
          />
        </>
      )}
    />
    {errors.mainImage && <span className={styles.errorMessage}>{errors.mainImage.message}</span>}
  </div>
);
