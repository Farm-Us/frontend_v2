import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import useCommunityWriteStore from '@/store/communityWriteStore';
import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postApi } from '../services/postApi';
import toast from 'react-hot-toast';
import { communityWriteMapper } from '../utils/communityWriteDataMapper';
import { useUserStore } from '../store/userStore';

/**
 * react-hook-form + zustand 연동을 위한 커스텀 훅
 * 커뮤니티 포스트 작성 및 제출 로직 관리
 */
export default function useCommunityWriteForm() {
  // Zustand store에서 값 가져오기
  const { title, content, images, taggedProducts, setTitle, setContent, reset } = useCommunityWriteStore();
  const setData = useCommunityWriteStore((state) => state.setData);
  const producerId = useUserStore((state) => state.producerId); // 사용자 ID 가져오기

  // React Hook Form 설정
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: title || '',
      content: content || '',
    },
  });

  // 포스트 생성 mutation
  const { savePostMutation } = useCreateCommunityPost(producerId);
  const navigate = useNavigate();

  // watch로 입력 상태 추적
  const watchedTitle = watch('title');
  const watchedContent = watch('content');

  // 제목 변경 시 스토어 업데이트
  useEffect(() => {
    setTitle(watchedTitle || '');
  }, [watchedTitle, setTitle]);

  // 내용 변경 시 스토어 업데이트
  useEffect(() => {
    setContent(watchedContent || '');
  }, [watchedContent, setContent]);

  // 폼 제출 핸들러
  const onSubmit = async (data) => {
    // 유효성 검사
    if (!data.title?.trim()) {
      toast.error('제목을 입력해주세요.');
      return;
    }

    if (!data.content?.trim()) {
      toast.error('내용을 입력해주세요.');
      return;
    }

    // API 호출 데이터 준비
    const params = {
      title: data.title,
      content: data.content,
      itemIds: taggedProducts || [],
      images: images || [],
    };

    // 데이터 매핑
    const mappedData = communityWriteMapper(params);

    // API 호출
    const saveItem = savePostMutation.mutateAsync(mappedData);
    await toast.promise(saveItem, {
      loading: '글을 올리는 중...',
      success: (resp) => {
        reset();
        navigate('/community', { replace: true });
        return resp?.message || '글이 성공적으로 올려졌습니다.';
      },
      error: (error) => {
        console.error('포스트 저장 실패:', error);
        return error?.message || '글 올리기에 실패했습니다.';
      },
    });
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isValid,
    watch,
  };
}

/**
 * 커뮤니티 포스트 생성 mutation
 * @param {number} producerId - 작성자 ID
 * @returns {object} savePostMutation 객체
 */
const useCreateCommunityPost = (producerId) => {
  const queryClient = useQueryClient();

  const savePostMutation = useMutation({
    mutationFn: (postData) => postApi.createPost(producerId, postData),
    onSuccess: (resp) => {
      // React Query 캐시 업데이트
      queryClient.setQueryData(['community'], (oldData) => {
        if (oldData?.content) {
          return {
            ...oldData,
            content: [resp?.content, ...(oldData?.content || [])],
          };
        }
        return oldData;
      });

      // 커뮤니티 목록 캐시 무효화 (다음 조회 시 새로 가져옴)
      queryClient.invalidateQueries({ queryKey: ['community'] });
    },
    onError: (error) => {
      console.error('커뮤니티 포스트 생성 에러:', error);
    },
  });

  return { savePostMutation };
};
