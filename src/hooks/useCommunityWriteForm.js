import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import useCommunityWriteStore from '@/store/communityWriteStore';
import { useEffect } from 'react';
import { use } from 'react';

/**
 * react-hook-form + zustand 연동을 위한 커스텀 훅
 */
export default function useCommunityWriteForm() {
  // zustand store 에서 이전에 입력했던 값(초기값)을 가져옵니다.
  // selector 에서 object 가 아니라 primitive 와 함수만 꺼내면 무한루프가 없습니다.
  const { title, content, setTitle, setContent, reset } = useCommunityWriteStore();
  const initTitle = useCommunityWriteStore((state) => state.title);
  const initContent = useCommunityWriteStore((state) => state.content);
  const setData = useCommunityWriteStore((state) => state.setData);
  const navigate = useNavigate();

  // react-hook-form 세팅 (onChange 모드로 유효성 검사가 바로바로 일어나게)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: title,
      content: content,
    },
  });

  // ✅ watch로 입력 상태가 바뀔 때마다 zustand에 반영
  const watchedTitle = watch('title');
  const watchedContent = watch('content');

  useEffect(() => {
    setTitle(watchedTitle);
  }, [watchedTitle, setTitle]);

  useEffect(() => {
    setContent(watchedContent);
  }, [watchedContent, setContent]);

  // form submit 시 호출될 함수
  const onSubmit = (data) => {
    // zustand 에 데이터 저장
    // TODO: 실제 API 연동 시 이부분에서 API 호출
    // TODO: toast 추가
    setData({ title: data.title, content: data.content });
    alert('게시글 작성이 완료되었습니다!');
    // 다음 페이지로 이동
    navigate('/community');
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
