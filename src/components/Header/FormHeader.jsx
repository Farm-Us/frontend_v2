// components/Header /FormHeader.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '@/pages/ProductRegistrationPage.module.css';
import { ChevronLeftIcon } from '../Icons';

export const FormHeader = ({ isValid, handleSubmit, onSubmit }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <button onClick={() => navigate(-1)}>
        <ChevronLeftIcon />
      </button>
      <div className={styles.headerTitle}>상품 등록</div>

      {isValid ? (
        <Link to='/product-detail/preview' className='text-green-500' onClick={() => console.log('미리보기 클릭')}>
          미리보기
        </Link>
      ) : (
        <button type='button' className={`text-gray-300`} disabled>
          미리보기
        </button>
      )}
    </div>
  );
};
