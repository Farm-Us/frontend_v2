// components/ProductRegistrationForm/ProductNameInput.jsx
import React from 'react';
import styles from '@/pages/ProductRegistrationPage.module.css';
import FormGuideCard from '../FormGuideCard';

export const ProductNameInput = ({
  name,
  label,
  placeholder,
  maxLength = 30,
  required = true,
  showCharCount = true,
  control,
  Controller,
  validationRules,
  errors,
  watch,
  formGuideCard,
  ...props
}) => {
  const fieldError = errors[name];
  const currentLength = watch(name)?.length || 0;

  return (
    <div className={styles.inputGroup}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>

      {/* 가이드가 있는 경우 */}
      {formGuideCard && (
        <FormGuideCard
          title={formGuideCard.title}
          guidelines={formGuideCard.guidelines}
          exampleImages={formGuideCard?.exampleImages}
          className={formGuideCard?.className}
        />
      )}

      <Controller
        name={name}
        control={control}
        rules={validationRules[name]}
        render={({ field }) => (
          <input
            {...field}
            {...props}
            className={`${styles.textInput} ${fieldError ? styles.error : ''}`}
            placeholder={placeholder}
            maxLength={maxLength}
          />
        )}
      />

      <div className='flex justify-between items-center pb-8'>
        <div className='flex-1'>{fieldError && <span className={styles.errorMessage}>{fieldError.message}</span>}</div>
        {showCharCount && (
          <div className={styles.charCount}>
            {currentLength}/{maxLength}자
          </div>
        )}
      </div>
    </div>
  );
};
