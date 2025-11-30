/**
 * 커뮤니티 포스트 데이터를 API 요청 형식으로 변환
 * @param {object} data - 원본 데이터 (title, content, itemIds, images)
 * @returns {object} API 요청용 변환된 데이터
 */
export const communityWriteMapper = (data) => {
  if (!data) {
    throw new Error('커뮤니티 포스트 데이터가 필요합니다.');
  }

  // itemIds가 객체 배열인 경우 ID만 추출
  const itemIds = Array.isArray(data?.itemIds)
    ? data.itemIds.map((item) => {
        // 객체이면 id 또는 itemId 필드 사용, 숫자면 그대로 사용
        if (typeof item === 'object') {
          return item.id || item.itemId;
        }
        return item;
      })
    : [];

  // API 요청 데이터 구조 생성
  const result = {
    // JSON 데이터 (postCreateRequest)
    postCreateRequest: {
      title: data?.title || '',
      content: data?.content || '',
      itemIds: itemIds,
    },
    // 이미지 배열
    images: Array.isArray(data?.images) ? data.images : [],
  };

  console.log('📝 커뮤니티 데이터 매핑 완료:', {
    title: result.postCreateRequest.title,
    content: result.postCreateRequest.content?.substring(0, 50) + '...',
    itemIds: result.postCreateRequest.itemIds,
    itemIdsType: Array.isArray(result.postCreateRequest.itemIds) ? 'array' : typeof result.postCreateRequest.itemIds,
    imagesCount: result.images.length,
  });

  console.log('📤 최종 전송 데이터:', JSON.stringify(result, null, 2));

  return result;
};
