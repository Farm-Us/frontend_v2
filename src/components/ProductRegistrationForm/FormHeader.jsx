// components/ProductRegistrationForm/FormHeader.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '@/pages/ProductRegistrationPage.module.css';
import { ChevronLeftIcon } from '../Icons';

export const FormHeader = ({ isValid, handleSubmit, onSubmit, pageNo = 1 }) => (
  <div className={styles.header}>
    <Link to='/seller-market'>
      <ChevronLeftIcon />
    </Link>
    <div className={styles.headerTitle}>상품 등록</div>

    {pageNo === 1 ? (
      isValid ? (
        <Link to='/register-product/detail' className={styles.nextButton} onClick={() => handleSubmit(onSubmit)()}>
          다음
        </Link>
      ) : (
        <button
          type='button'
          onClick={handleSubmit(onSubmit)}
          className={`${styles.nextButton} ${styles.disabled}`}
          disabled>
          다음
        </button>
      )
    ) : (
      <Link to='/product-detail/preview' className={styles.previewButton}>
        미리보기
      </Link>
    )}
  </div>
);
