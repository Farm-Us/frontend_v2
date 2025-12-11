// hooks/useProductRegistrationForm.js
import { useForm, useFieldArray, Controller, useWatch } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import useProductStore from '../store/productStore';
import { useCreateNewSell } from './useSellProduct';
import { dataLogics, findCategoryNo } from '../utils/productWriteDataMapper';

export const useProductRegistrationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 단계 판단 (URL 기반)
  const currentStep = location.pathname.includes('detail') ? 'detail' : 'basic';

  const {
    // 기본 정보
    itemName,
    category,
    mainImage,
    setData,
    setMainImage,
    farmerName,
    marketName,

    // 상세 정보
    details,
    options,
    discount,
    setDetailField,
    setDetailImage,
    addOption,
    updateOption,
    removeOption,
    reset,

    ...productData
  } = useProductStore();

  const categories = ['과일', '채소', '축산', '수산', '김치/젓갈', '쌀/잡곡'];
  const { saveItemMutation } = useCreateNewSell(1);

  // 통합 폼 설정
  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      // 기본 정보 (1단계)
      // category: category || '',
      // categoryId: findCategoryNo(category, categories),
      category: '과일',
      itemName: itemName || '',
      itemPrice: productData.itemPrice || 0,
      mainImage: mainImage || null,
      marketName: marketName || '',
      farmerName: farmerName || '',
      career: productData.career || '1년',
      storageOption: '', // 보관 방법
      farmingOption: '', // 재배 방식
      // 상세 정보
      details: details || [],
      options: options.length > 0 ? options : [{ name: '', value: '', price: '' }],
      discount: discount || '',
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = form;

  // 옵션 필드 배열 관리 (2단계에서만 사용)
  const {
    fields: optionFields,
    append: appendOption,
    remove: removeOptionField,
  } = useFieldArray({
    control,
    name: 'options',
  });

  // const watchedValues = watch();
  const watchedCategory = useWatch({ control, name: 'category' });
  const watchedProductName = useWatch({ control, name: 'itemName' });
  const watchedOptions = useWatch({ control, name: 'options' });
  const watchedDiscount = useWatch({ control, name: 'discount' });

  // 스토어 데이터와 폼 동기화 (초기 로드 시에만)
  useEffect(() => {
    // 기본 정보 동기화
    setValue('category', category || '');
    setValue('itemName', itemName || '');
    setValue('mainImage', mainImage || null);

    // 상세 정보 동기화
    setValue('details', details || []);
    // options는 초기 로드 시에만 동기화 (이후에는 폼이 단일 진실 공급원)
    if (optionFields.length === 0) {
      setValue('options', options.length > 0 ? options : [{ name: '', value: '', price: '' }]);
    }
    setValue('discount', discount || 0);
  }, [category, itemName, mainImage, details, discount, setValue]);

  // 기본 정보만 watch
  useEffect(() => {
    if (watchedCategory !== category) {
      setData({ category: watchedCategory });
    }
    if (watchedProductName !== itemName) {
      setData({ itemName: watchedProductName });
    }
  }, [watchedCategory, watchedProductName]);

  // 상세 정보는 detail 단계에서만
  useEffect(() => {
    if (currentStep !== 'detail') return;

    if (JSON.stringify(watchedOptions) !== JSON.stringify(options)) {
      watchedOptions.forEach((option, index) => {
        updateOption(index, 'name', option.name);
        updateOption(index, 'value', option.value);
        updateOption(index, 'price', option.price);
      });
    }

    if (watchedDiscount !== discount) {
      setData({ discount: watchedDiscount });
    }
  }, [currentStep, watchedOptions, watchedDiscount]);

  // 1단계 제출 (기본 정보 -> 상세 정보로)
  const onBasicSubmit = (data) => {
    console.log('1단계 데이터확인: ', data);
    setData(data);
    // 가격 업데이터
    setData({ itemPrice: data?.options[0].price });
    navigate('/register-product/detail');
  };

  // 2단계 제출 (최종 상품 등록)
  const onDetailSubmit = async (data) => {
    const newProduct = {
      ...productData,
      ...data,
      id: Date.now(),
    };
    console.log('data:', newProduct);
    console.log('newProduct');
    const dataParsed = dataLogics(1, newProduct);
    console.log(dataParsed);
    const saveItem = saveItemMutation.mutateAsync(dataParsed);
    await toast.promise(saveItem, {
      loading: '저장하는 중...',
      success: (response) => {
        reset();
        navigate('/seller-market', { replace: true });
        return response?.message || '상품이 성공적으로 저장되었습니다!';
      },
      error: (error) => {
        // reset();
        // navigate('/seller-market', { replace: true });
        return '상품 저장에 실패했습니다.';
      },
    });
  };

  // 단계에 따른 제출 함수 선택
  const onSubmit = currentStep === 'basic' ? onBasicSubmit : onDetailSubmit;

  // === 기본 정보 관련 핸들러 (1단계) ===
  const handleImageChange = (e, onChange) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onChange(file);
      setMainImage(file);
      setValue('imagePreview', imageUrl);
    }
  };

  // === 상세 정보 관련 핸들러 (2단계) ===
  const handleAddOption = () => {
    // 폼에만 추가 (스토어는 watchedOptions useEffect에서 자동 동기화)
    appendOption({ name: '', value: '', price: '' });
  };

  const handleRemoveOption = (index) => {
    if (optionFields.length > 1) {
      // 폼에서만 제거 (스토어는 watchedOptions useEffect에서 자동 동기화)
      removeOptionField(index);
    }
  };

  const handleDetailImageChange = (index, file) => {
    if (file) {
      setDetailImage(index, file);
    }
  };

  const handleUseExample = (index, field) => {
    const detail = details[index];
    if (detail && detail.placeholder) {
      setDetailField(index, field, detail.placeholder[field]);
    }
  };

  const handleDetailFieldChange = (index, field, value) => {
    setDetailField(index, field, value);
  };

  // 단계별 유효성 검사 규칙
  const getValidationRules = () => {
    const basicRules = {
      category: {
        required: '상품 카테고리를 선택해주세요.',
      },
      mainImage: {
        required: '대표 이미지를 업로드해주세요.',
      },
      itemName: {
        required: '상품명을 입력해주세요.',
        maxLength: {
          value: 30,
          message: '상품명은 30자 이하로 입력해주세요.',
        },
      },
    };

    const detailRules = {
      options: {
        validate: (options) => {
          const hasEmptyFields = options.some((opt) => !opt.name || !opt.value || !opt.price);
          return !hasEmptyFields || '모든 옵션 필드를 입력해주세요.';
        },
      },
      discount: {
        min: {
          value: 0,
          message: '할인율은 0 이상이어야 합니다.',
        },
        max: {
          value: 100,
          message: '할인율은 100 이하여야 합니다.',
        },
      },
    };

    return currentStep === 'basic' ? basicRules : { ...basicRules, ...detailRules };
  };

  const validationRules = getValidationRules();

  return {
    // 현재 단계 정보
    currentStep,

    // 폼 관련
    control,
    handleSubmit,
    watch,
    errors,
    isValid,
    Controller,

    // 필드 배열 관련 (2단계에서만 사용)
    optionFields,

    // 공통 데이터
    categories,
    // watchedValues,
    details,
    validationRules,

    // 공통 핸들러
    onSubmit,

    // 1단계 전용 핸들러
    handleImageChange,

    // 2단계 전용 핸들러
    handleAddOption,
    handleRemoveOption,
    handleDetailImageChange,
    handleUseExample,
    handleDetailFieldChange,

    // 로딩 상태
    isLoading: saveItemMutation.isLoading,

    // 유틸리티 함수들
    utils: {
      // 현재 단계가 기본 정보인지 확인
      isBasicStep: () => currentStep === 'basic',
      // 현재 단계가 상세 정보인지 확인
      isDetailStep: () => currentStep === 'detail',
      // 특정 필드가 현재 단계에서 필요한지 확인
      isFieldRequired: (fieldName) => {
        const basicFields = ['category', 'mainImage', 'itemName'];
        const detailFields = ['options', 'discount'];

        if (currentStep === 'basic') {
          return basicFields.includes(fieldName);
        }
        return detailFields.includes(fieldName);
      },
    },
  };
};

// 별도로 각 단계에서 필요한 데이터만 추출하는 헬퍼 훅들 (선택사항)
export const useBasicFormData = () => {
  const formData = useProductRegistrationForm();

  return {
    ...formData,
    // 기본 정보 단계에서만 필요한 것들을 필터링
    validationRules: {
      category: formData.validationRules.category,
      mainImage: formData.validationRules.mainImage,
      itemName: formData.validationRules.productName,
    },
  };
};

export const useDetailFormData = () => {
  const formData = useProductRegistrationForm();

  return {
    ...formData,
    // 상세 정보 단계에서만 필요한 것들을 필터링
    validationRules: {
      options: formData.validationRules.options,
      discount: formData.validationRules.discount,
    },
  };
};
