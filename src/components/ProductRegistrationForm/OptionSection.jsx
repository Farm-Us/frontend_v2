// components/ProductDetailRegistrationForm/OptionSection.jsx
import React, { useState } from 'react';
import styles from '@/pages/ProductDetailRegistrationPage.module.css';
import { ProductNameInput } from './ProductNameInput';

const TrashIcon = () => (
  <svg width='20' height='20' viewBox='0 0 24 24'>
    <path
      d='M4 7H20M10 11V17M14 11V17M5 7L6 19C6 20.1046 6.89543 21 8 21H16C17.1046 21 18 20.1046 18 19L19 7M9 7V4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V7'
      stroke='#6a7685'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const PlusIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24'>
    <path d='M12 5V19M5 12H19' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

export const OptionSection = ({
  control,
  Controller,
  optionFields,
  handleAddOption,
  handleRemoveOption,
  errors,
  watch,
}) => {
  return (
    <div className={styles.optionSection}>
      <div className={styles.sectionTitle}>옵션 및 가격</div>

      {optionFields.map((field, index) => (
        <div key={field.id} className={styles.optionGroup}>
          <div className={styles.optionHeader}>
            <div>옵션 {index + 1}</div>
            {optionFields.length > 1 && (
              <button type='button' onClick={() => handleRemoveOption(index)}>
                <TrashIcon />
              </button>
            )}
          </div>

          <ProductNameInput
            name={`options.${index}.name`}
            label='옵션명' // 라벨이 필요없다면 빈 문자열
            placeholder='옵션명 (예: 무게)'
            maxLength={20} // 적절한 길이 설정
            required={true}
            control={control}
            Controller={Controller}
            validationRules={{
              [`options.${index}.name`]: { required: '예) 무게 / 개수 / 포장단위 / 크기' },
            }}
            errors={errors}
            watch={watch}
            className={styles.optionInput} // 기존 스타일 유지
          />
          <ProductNameInput
            name={`options.${index}.value`}
            label='옵션값' // 라벨이 필요없다면 빈 문자열
            placeholder='옵션값 (예: 1kg)'
            maxLength={20} // 적절한 길이 설정
            required={true}
            control={control}
            Controller={Controller}
            validationRules={{
              [`options.${index}.value`]: { required: '예) 1kg / 3개입 / 1박스 / 대' },
            }}
            errors={errors}
            watch={watch}
            className={styles.optionInput} // 기존 스타일 유지
          />
          <ProductNameInput
            name={`options.${index}.price`}
            label='가격' // 라벨이 필요없다면 빈 문자열
            placeholder='15000'
            type='number'
            maxLength={20} // 적절한 길이 설정
            required={true}
            control={control}
            Controller={Controller}
            validationRules={{
              [`options.${index}.price`]: {
                required: '옵션 가격 숫자만 입력해주세요.',
                min: {
                  value: 0,
                  message: '가격은 0 이상이어야 합니다.',
                },
              },
            }}
            errors={errors}
            watch={watch}
            className={styles.optionInput} // 기존 스타일 유지
          />
        </div>
      ))}

      <button 
        type='button' 
        onClick={(e) => {
          e.preventDefault();
          handleAddOption();
        }} 
        className={styles.addButton}>
        <PlusIcon /> 옵션 추가
      </button>
    </div>
  );
};
