// utils/formData.js
export const createFormData = (data) => {
  const formData = new FormData();
  console.log('파싱 원본 데이터', data);
  Object.keys(data).forEach((key) => {
    const value = data[key];

    if (value instanceof File) {
      // 파일인 경우
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      // 배열인 경우
      if (value.every((item) => item instanceof File)) {
        // 파일 배열
        value.forEach((file) => {
          formData.append(key, file);
        });
      } else {
        // 일반 배열
        value.forEach((item) => {
          formData.append(`${key}[]`, item);
        });
      }
    } else if (typeof value === 'object' && value !== null) {
      // 객체인 경우 JSON 문자열로 변환
      formData.append(key, JSON.stringify(value));
    } else {
      // 일반 값
      formData.append(key, value);
    }
  });

  return formData;
};

// 디버깅용 FormData 로깅 함수
export const logFormData = (formData, label = 'FormData') => {
  console.log(`📎 ${label}:`);
  for (let [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(`  ${key}: File(${value.name}, ${value.size} bytes)`);
    } else {
      console.log(`  ${key}:`, value);
    }
  }
};
