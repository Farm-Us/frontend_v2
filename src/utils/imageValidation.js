// utils/imageValidation.js
export const validateImage = (file, options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB
    allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
    maxWidth = 2000,
    maxHeight = 2000,
  } = options;

  const errors = [];

  // 파일 크기 검증
  if (file.size > maxSize) {
    errors.push(`파일 크기가 너무 큽니다. (최대 ${Math.round(maxSize / 1024 / 1024)}MB)`);
  }

  // 파일 타입 검증
  if (!allowedTypes.includes(file.type)) {
    errors.push('지원하지 않는 이미지 형식입니다.');
  }

  return {
    isValid: errors.length === 0,
    errors,
    file: errors.length === 0 ? file : null,
  };
};

// 이미지 크기(해상도) 검증 (선택사항)
export const validateImageDimensions = (file, maxWidth = 2000, maxHeight = 2000) => {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      const isValid = img.width <= maxWidth && img.height <= maxHeight;
      resolve({
        isValid,
        dimensions: { width: img.width, height: img.height },
        error: isValid
          ? null
          : `이미지 크기가 너무 큽니다. (${img.width}x${img.height}, 최대 ${maxWidth}x${maxHeight})`,
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({
        isValid: false,
        error: '이미지를 읽을 수 없습니다.',
      });
    };

    img.src = url;
  });
};
