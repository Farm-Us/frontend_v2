/**
 * 커뮤니티 포스트 데이터를 API 요청 형식으로 변환
 * @param {object} data - 원본 데이터 (title, content, itemIds, images)
 * @returns {object} API 요청용 변환된 데이터
 */
export const communityWriteMapper = (data) => {
  if (!data) {
    throw new Error('커뮤니티 포스트 데이터가 필요합니다.');
  }

  // API 요청 데이터 구조 생성
  const result = {
    // JSON 데이터 (postCreateRequest)
    postCreateRequest: {
      title: data?.title || '',
      content: data?.content || '',
      itemIds: Array.isArray(data?.itemIds) ? data.itemIds : [],
    },
    // 이미지 배열
    images: Array.isArray(data?.images) ? data.images : [],
  };

  // 개발 환경에서 로깅
  if (process.env.NODE_ENV === 'development') {
    console.log('📝 커뮤니티 데이터 매핑:', {
      title: result.postCreateRequest.title,
      content: result.postCreateRequest.content?.substring(0, 50) + '...',
      itemIds: result.postCreateRequest.itemIds,
      imagesCount: result.images.length,
    });
  }

  return result;
};
