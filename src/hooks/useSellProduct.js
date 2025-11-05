// 상인 유저가 판매하는 상품 관리 훅

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { itemApi } from '../services/itemApi';

export const useSellProduct = (producerId) => {
  const queryClient = useQueryClient();

  // 상인 유저의 판매 데이터 가져오기
  const sellItemData = useQuery({
    queryKey: ['get-items-producer', producerId],
    queryFn: () => itemApi.getItemsProducer(producerId),
    select: (response) => response.data,
    enabled: !!producerId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    retry: 2,
  });

  // 판매 물품 신규 등록createItem
  const saveItemMutation = useMutation({
    mutationFn: (item) => itemApi.createItem(producerId, item),
    onSuccess: (resp) => {
      console.log(resp);
      queryClient.setQueryData(['get-items-producer', producerId], (oldData) => {
        if (oldData) {
          return [...oldData, item];
        }
        return [item];
      });
    },
    onError: (error) => {
      console.error('물품 등록 에러: ', error);
    },
  });

  return {
    // 유저(판매자) 물품
    sellItemData: sellItemData.data,

    // 물품 신규 등록 관련
    saveItemMutation,

    // 상태관련
    isLoading: sellItemData.isLoading || saveItemMutation.isLoading,
    isError: sellItemData.isError || saveItemMutation.isError,
  };
};
