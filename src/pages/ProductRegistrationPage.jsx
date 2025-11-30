// ProductRegistrationPage.jsx
import React from 'react';
import styles from './ProductRegistrationPage.module.css';
import { useProductRegistrationForm } from '@/hooks/useProductRegister';
import { FormHeader } from '@/components/Header/FormHeader';
import { CategorySelect } from '@/components/ProductRegistrationForm/CategorySelect';
import { ImageUpload } from '@/components/ProductRegistrationForm/ImageUpload';
import { ProductNameInput } from '@/components/ProductRegistrationForm/ProductNameInput';
import CustomButton from '@/components/button/CustomButton';
import { OptionSection } from '@/components/ProductRegistrationForm/OptionSection';

export default function ProductRegistrationPage() {
  const {
    control,
    handleSubmit,
    watch,
    errors,
    isValid,
    categories,
    onSubmit,
    handleImageChange,
    validationRules,
    Controller,
    optionFields,
    handleAddOption,
    handleRemoveOption,
    utils,
  } = useProductRegistrationForm();

  return (
    <div className={styles.wrapper}>
      {/* <FormHeader isValid={isValid} handleSubmit={handleSubmit} onSubmit={onSubmit} /> */}
      <FormHeader isValid={isValid} handleSubmit={handleSubmit} onSubmit={onSubmit} />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.content}>
        <div className={styles.sectionTitle}>기본 정보 등록</div>
        <div className={styles.formGroup}>
          <CategorySelect
            control={control}
            Controller={Controller}
            categories={categories}
            validationRules={validationRules}
            errors={errors}
          />

          <ImageUpload
            control={control}
            Controller={Controller}
            validationRules={validationRules}
            errors={errors}
            handleImageChange={handleImageChange}
          />

          <ProductNameInput
            name='itemName'
            label='상품명을 작성해주세요'
            placeholder='상품명을 입력해주세요'
            maxLength={30}
            control={control}
            Controller={Controller}
            validationRules={validationRules}
            errors={errors}
            watch={watch}
            formGuideCard={{
              title: '이런 이름이 좋아요!',
              guidelines: [
                '식품 인증을 강조한 이름\n예) GAP 인증',
                '지역, 제철을 강조한 이름\n예) 경북 햇 사과, 부서 꿀사과',
              ],
            }}
          />

          <ProductNameInput
            name='marketName'
            label='마켓'
            placeholder='마켓명을 입력해주세요'
            // maxLength={30}
            showCharCount={false}
            control={control}
            Controller={Controller}
            validationRules={validationRules}
            errors={errors}
            watch={watch}
          />

          <ProductNameInput
            name='farmerName'
            label='농부'
            placeholder='이름을 입력해주세요'
            maxLength={20}
            control={control}
            Controller={Controller}
            validationRules={validationRules}
            errors={errors}
            watch={watch}
          />

          <ProductNameInput
            name='career'
            label='경력'
            placeholder='예) 1년'
            maxLength={20}
            control={control}
            Controller={Controller}
            validationRules={validationRules}
            errors={errors}
            watch={watch}
          />
          {/* TODO: name 바꾸기-재배방식 */}
          <ProductNameInput
            name='farmingOption'
            label='재배방식'
            placeholder='예) 무농약'
            maxLength={20}
            control={control}
            Controller={Controller}
            validationRules={validationRules}
            errors={errors}
            watch={watch}
          />
          {/* TODO: name 바꾸기-보관방법 */}
          <ProductNameInput
            name='storageOption'
            label='보관방법'
            placeholder='예) 냉장보관 또는 실온보관'
            maxLength={20}
            control={control}
            Controller={Controller}
            validationRules={validationRules}
            errors={errors}
            watch={watch}
          />

          {/* 옵션 및 가격 섹션 */}
          <OptionSection
            control={control}
            Controller={Controller}
            optionFields={optionFields}
            handleAddOption={handleAddOption}
            handleRemoveOption={handleRemoveOption}
            errors={errors}
            watch={watch}
          />

          {/* 할인 설정 섹션 */}
          <ProductNameInput
            name='discount'
            label='[선택]기본 할인률'
            placeholder='할인율을 숫자로 입력 (예: 20)'
            maxLength={20}
            required={false}
            control={control}
            Controller={Controller}
            validationRules={validationRules}
            errors={errors}
            watch={watch}
            type='number'
          />
        </div>
        <CustomButton disabled={false} onClick={handleSubmit}>
          다음
        </CustomButton>
      </form>
    </div>
  );
}
