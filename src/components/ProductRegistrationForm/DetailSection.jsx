// components/ProductDetailRegistrationForm/DetailSection.jsx
import React from 'react';
import styles from '@/pages/ProductDetailRegistrationPage.module.css';
import FormGuideCard from '@/components/FormGuideCard';
import CameraIcon from '@/assets/icons/Camera.svg?react';
export const DetailSection = ({
  index,
  title: sectionTitle,
  detail,
  formGuideCard,
  handleDetailImageChange,
  handleUseExample,
  handleDetailFieldChange,
}) => {
  // console.log('formGuideCard 여부 확인:', formGuideCard);
  return (
    <div className={styles.detailSection}>
      <label className={styles.sectionLabel}>
        {sectionTitle} <span className={styles.required}>*</span>
      </label>

      {/* Tip 보여주는 부분 */}
      {formGuideCard && (
        <FormGuideCard
          title={formGuideCard.title}
          guidelines={formGuideCard.guidelines}
          exampleImages={formGuideCard.exampleImages}
        />
      )}
      <label htmlFor={`detail-image-${index}`} className={styles.imgUpload}>
        {detail?.image ? (
          <img src={detail.image} alt='상세 이미지' className={styles.imagePreview} />
        ) : (
          <div className='flex flex-col justify-center items-center space-y-2'>
            <CameraIcon color={'#3B4149'} />
            <span className='self-stretch text-lg text-gray-800 font-semibold '>사진 올리기</span>
          </div>
        )}
      </label>

      <input
        id={`detail-image-${index}`}
        type='file'
        accept='image/*'
        style={{ display: 'none' }}
        onChange={(e) => handleDetailImageChange(index, e.target.files[0])}
      />

      <div className={styles.inputGroup}>
        <div className={styles.inputHeader}>
          <label className={styles.label}>
            제목 <span className={styles.required}>*</span>
          </label>
          <button type='button' onClick={() => handleUseExample(index, 'title')} className={styles.exampleButton}>
            예시 사용
          </button>
        </div>
        <input
          type='text'
          className={styles.textInput}
          value={detail?.title || ''}
          onChange={(e) => handleDetailFieldChange(index, 'title', e.target.value)}
          placeholder={detail?.placeholder?.title || ''}
          maxLength='30'
        />
      </div>

      <div className={styles.inputGroup}>
        <div className={styles.inputHeader}>
          <label className={styles.label}>
            내용 <span className={styles.required}>*</span>
          </label>
          <button type='button' onClick={() => handleUseExample(index, 'content')} className={styles.exampleButton}>
            예시 사용
          </button>
        </div>
        <textarea
          className={styles.textarea}
          value={detail?.content || ''}
          onChange={(e) => handleDetailFieldChange(index, 'content', e.target.value)}
          placeholder={detail?.placeholder?.content || ''}
          maxLength='80'
        />
      </div>
    </div>
  );
};
