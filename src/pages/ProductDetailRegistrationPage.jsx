// ProductDetailRegistrationPage.jsx
import React from 'react';
import styles from './ProductDetailRegistrationPage.module.css';
import { useProductRegistrationForm } from '@/hooks/useProductRegister';
import { FormHeader } from '@/components/Header/FormHeader';
import { DetailSection } from '@/components/ProductRegistrationForm/DetailSection';
// 이미지
import sampleImage from '@/assets/images/sample/sample-detail-1.png';
import sampleImage2 from '@/assets/images/sample/sample-detail-2.png';
import sampleImage3 from '@/assets/images/sample/sample-detail-3.png';
import sampleImage4 from '@/assets/images/sample/sample-detail-4.png';

export default function ProductDetailRegistrationPage() {
  const {
    control,
    handleSubmit,
    errors,
    isValid,
    Controller,
    optionFields,
    details,
    onSubmit,
    handleAddOption,
    handleRemoveOption,
    handleDetailImageChange,
    handleUseExample,
    handleDetailFieldChange,
    validationRules,
    isLoading,
    utils,
  } = useProductRegistrationForm();

  const detailSections = [
    {
      title: '어디서 자라고/생산되고 있나요? (재배 환경 소개)',
      index: 0,
      formGuideCard: {
        title: '이런 사진이 좋아요!',
        guidelines: [
          '밭, 농장, 어장, 작업장 등 실제 생산되는 현장을 보여 주세요',
          '배경에 풍경이 함께 담기면 더욱 신뢰감을 줄 수 있어요',
          '📸 예시 이미지:\n재배지, 작업공간, 비닐하우스, 자연환경 등',
        ],
        exampleImages: [{ src: sampleImage, alt: '좋은 예시 1' }],
      },
    },
    {
      title: '어떻게 정성껏 키우고 만들고 있나요? (재배 방식/철학)',
      index: 1,
      formGuideCard: {
        title: '이런 사진이 좋아요!',
        guidelines: [
          '상품을 돌보거나 작업하는 모습, 사용하는 도구, 친환경 재배나 손질 과정 등',
          '생산 과정의 진심과 노력이 담긴 모습을 보여주세요',
          '📸 예시 이미지:\n작업 중인 농부, 수작업 장면, 손질/세척 모습 등',
        ],
        exampleImages: [{ src: sampleImage2, alt: '좋은 예시 2' }],
      },
    },
    {
      title: '수확/제작 후 어떻게 선별하고 관리하나요? (신선함 강조)',
      index: 2,
      formGuideCard: {
        title: '이런 사진이 좋아요!',
        guidelines: [
          '수확/생산 후, 품질 확인이나 선별하는 모습을 담아주세요',
          '크기, 신선도, 상태 등을 확인하는 장면이면 좋습니다',
          '📸 예시 이미지:\n크기 비교, 손으로 선별하는 장면, 포장 전 상태 등',
        ],
        exampleImages: [{ src: sampleImage3, alt: '좋은 예시 3' }],
      },
    },
    {
      title: '포장과 배송은 어떻게 하나요? (신뢰와 안전 강조)',
      index: 3,
      formGuideCard: {
        title: '이런 사진이 좋아요!',
        guidelines: [
          '포장 준비, 상자에 담는 모습, 안전 포장재 사용 등',
          '고객이 받는 모습까지 연상할 수 있도록 포장 상태를 보여주세요',
          '📸 예시 이미지:\n포장된 상품, 상자, 완충재 사용장면, 스티커 부착 등',
        ],
        exampleImages: [{ src: sampleImage4, alt: '좋은 예시 4' }],
      },
    },
  ];

  return (
    <div className={styles.wrapper}>
      <FormHeader isValid={isValid} handleSubmit={handleSubmit} onSubmit={onSubmit} />

      <form onSubmit={handleSubmit(onSubmit)} className={styles.content}>
        <div className={styles.sectionTitle}>상세 이미지 정보 등록</div>

        {/* 상세 정보 섹션들 */}
        {detailSections.map(({ title, index, formGuideCard }) => (
          <DetailSection
            key={index}
            index={index}
            title={title}
            detail={details[index]}
            formGuideCard={formGuideCard}
            handleDetailImageChange={handleDetailImageChange}
            handleUseExample={handleUseExample}
            handleDetailFieldChange={handleDetailFieldChange}
          />
        ))}
      </form>

      <div className={styles.bottomBar}>
        <button
          type='submit'
          onClick={handleSubmit(onSubmit)}
          className={styles.registerButton}
          disabled={isLoading || !isValid}>
          {isLoading ? '등록 중...' : '등록하기'}
        </button>
      </div>
    </div>
  );
}
