// hooks/useProduct.js
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { itemApi } from '../services/itemApi';
import { farmerStoriesProd } from '../data';
// 임시로 넣은 파일
import userAvatarImg1 from '@/assets/images/user-profile-1.png';

// 상품 호출 전체
export const useProduct = (prodcerId) => {
  const navigate = useNavigate();
  return useQuery({
    queryKey: ['product', prodcerId],
    queryFn: async () => itemApi.getItemsProducer(prodcerId),
    select: (data) => data.content,
    enabled: !!prodcerId, // prodcerId 존재할 때만 실행
    retry: 1, // 에러 시 1번만 재시도
    onError: (error) => {
      console.error('상품 조회 에러:', error);
      navigate('/seller-market');
    },
  });
};

// 상품 디테일 호출
export const useProductDetail = (productId) => {
  const navigate = useNavigate();
  return useQuery({
    queryKey: ['product', productId],
    queryFn: async () => itemApi.getItemDetail(productId),
    select: (data) => {
      if (!data) return {};
      else {
        const details = [
          {
            title: data.origin,
            content: data.originDetails,
            image: data.originImage,
          },
          {
            title: data.farmingMethod,
            content: data.farmingDetails,
            image: data.farmingImage,
          },
          {
            title: data.manageMethod,
            content: data.manageDetails,
            image: data.manageImage,
          },
          {
            title: data.packageMethod,
            content: data.packageDetails,
            image: data.packageImage,
          },
        ];
        return {
          itemName: data?.itemName,
          categoryId: data?.categoryId,
          categoryName: data?.categoryName,
          description: data?.description,
          discountedPrice: data?.discountedPrice,
          farmingDetails: data?.farmingDetails,
          productName: data?.itemName,
          itemId: data?.itemId,
          farmingImageUrl: data?.farmingImageUrl,
          options: data?.options,
          producerId: data?.producerId,
          stockQuantity: data?.stockQuantity,
          storageMethod: data?.storageMethod,
          thumbnailImageUrl: data?.thumbnailImageUrl,
          details,
          farmerName: '김준식',
          career: '1년',
          cultivationMethod: '유기농',
          marketName: '새벽들딸기농원',
          userImage: userAvatarImg1,
        };
      }
    },
    enabled: !!productId, // 상품 아이디가 존재할 때만 실행
    retry: 1, // 에러 시 1번만 재시도
    onError: (error) => {
      console.error('상품 조회 에러:', error);
      navigate('/seller-market');
    },
  });
};

// 카테고리 호출
export const useCategoryCall = () => {
  // react query 호출
  return useQuery({
    queryKey: ['categories'],
    queryFn: itemApi.getItemsCategories,
    staleTime: 10000 * 60 * 5,
  });
};
