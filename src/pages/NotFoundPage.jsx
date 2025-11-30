// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.css'; // 🆕 CSS Module import

function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };

  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.notFoundContent}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.errorTitle}>페이지를 찾을 수 없습니다</h2>
        <p className={styles.errorDescription}>요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</p>

        <div className={styles.actionButtons}>
          <button onClick={handleGoHome} className={styles.btnPrimary}>
            홈으로 이동
          </button>
          <button onClick={handleGoBack} className={styles.btnSecondary}>
            이전 페이지로
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
