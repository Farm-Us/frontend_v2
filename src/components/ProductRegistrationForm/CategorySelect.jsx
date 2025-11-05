// components/ProductRegistrationForm/CategorySelect.jsx
import React from 'react';
import styles from '@/pages/ProductRegistrationPage.module.css';

export const CategorySelect = ({ control, Controller, categories, validationRules, errors }) => (
  <div className={styles.inputGroup}>
    <label className={styles.label}>
      상품 카테고리 <span className={styles.required}>*</span>
    </label>
    <div className={styles.dropdown}>
      <Controller
        name='category'
        control={control}
        rules={validationRules.category}
        render={({ field }) => (
          <select {...field} className={`${styles.selectBox} ${errors.category ? styles.error : ''}`}>
            <option value='' disabled>
              상품 카테고리를 선택해 주세요
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        )}
      />
    </div>
    {errors.category && <span className={styles.errorMessage}>{errors.category.message}</span>}
  </div>
);
