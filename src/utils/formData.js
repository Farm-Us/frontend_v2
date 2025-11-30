// utils/formData.js
// utils/formData.js
// export const createFormData = (data, options = {}) => {
//   const {
//     arrayKeyFormat = 'multiple', // 'brackets', 'multiple', 'indexed'
//     maxFileSize = 10 * 1024 * 1024,
//     maxTotalSize = 50 * 1024 * 1024,
//     maxFileCount = 10,
//     validateFiles = true,
//   } = options;

//   const formData = new FormData();
//   let totalSize = 0;
//   let fileCount = 0;

//   console.log('📝 FormData 변환 시작:', data);

//   const addFileWithValidation = (key, file) => {
//     if (validateFiles) {
//       if (file.size > maxFileSize) {
//         throw new Error(`파일 "${file.name}"이 최대 크기를 초과했습니다.`);
//       }

//       totalSize += file.size;
//       if (totalSize > maxTotalSize) {
//         throw new Error('전체 파일 크기 제한을 초과했습니다.');
//       }

//       fileCount++;
//       if (fileCount > maxFileCount) {
//         throw new Error('파일 개수 제한을 초과했습니다.');
//       }
//     }

//     formData.append(key, file);
//   };

//   try {
//     Object.keys(data).forEach((key) => {
//       const value = data[key];

//       if (value === null || value === undefined) {
//         formData.append(key, '');
//       } else if (value instanceof File) {
//         addFileWithValidation(key, value);
//       } else if (isBase64(value)) {
//         const filename = `${key}_${Date.now()}.${getExtensionFromBase64(value)}`;
//         const file = base64ToBlob(value, filename);
//         if (file) {
//           addFileWithValidation(key, file);
//         } else {
//           formData.append(key, value);
//         }
//       } else if (Array.isArray(value)) {
//         handleArrayValue(formData, key, value, arrayKeyFormat, addFileWithValidation);
//       } else if (typeof value === 'object') {
//         formData.append(key, JSON.stringify(value));
//       } else {
//         formData.append(key, String(value));
//       }
//     });

//     console.log('✅ FormData 변환 완료');
//     return formData;
//   } catch (error) {
//     console.error('❌ FormData 변환 실패:', error);
//     throw error;
//   }
// };
export const createFormData = (data, options = {}) => {
  const {
    maxFileSize = 10 * 1024 * 1024,
    maxTotalSize = 50 * 1024 * 1024,
    maxFileCount = 10,
    validateFiles = true,
  } = options;

  const formData = new FormData();
  let totalSize = 0;
  let fileCount = 0;

  console.log('📝 FormData 변환 시작:', data);

  // ✅ JSON 데이터만 모을 객체
  const requestPayload = {};

  const addFileWithValidation = (key, file) => {
    if (validateFiles) {
      if (file.size > maxFileSize) {
        throw new Error(`파일 "${file.name}"이 최대 크기를 초과했습니다.`);
      }

      totalSize += file.size;
      if (totalSize > maxTotalSize) {
        throw new Error('전체 파일 크기 제한을 초과했습니다.');
      }

      fileCount++;
      if (fileCount > maxFileCount) {
        throw new Error('파일 개수 제한을 초과했습니다.');
      }
    }

    formData.append(key, file);
  };

  try {
    Object.keys(data).forEach((key) => {
      const value = data[key];

      if (value instanceof File) {
        // ✅ 파일은 그냥 append
        addFileWithValidation(key, value);
      } else if (isBase64(value)) {
        // ✅ Base64는 파일로 처리
        const filename = `${key}_${Date.now()}.${getExtensionFromBase64(value)}`;
        const file = base64ToBlob(value, filename);
        if (file) {
          addFileWithValidation(key, file);
        } else {
          // Base64가 아닌 경우 JSON에 넣음
          requestPayload[key] = value;
        }
      } else if (value !== null && value !== undefined) {
        // ✅ 나머지 값은 JSON 객체에 추가
        requestPayload[key] = value;
      }
    });

    // ✅ JSON 객체를 Blob으로 변환해서 request 키로 추가
    const requestBlob = new Blob([JSON.stringify(requestPayload)], {
      type: 'application/json',
    });
    formData.append('request', requestBlob);

    console.log('✅ FormData 변환 완료');
    return formData;
  } catch (error) {
    console.error('❌ FormData 변환 실패:', error);
    throw error;
  }
};

// export const createFormDataForMultipart = (mappedData, options = {}) => {
//   const formData = new FormData();

//   console.log('🔍 입력 데이터 확인:', mappedData);

//   // postCreateRequest를 JSON 문자열로 추가
//   if (mappedData.postCreateRequest) {
//     const jsonString = JSON.stringify(mappedData.postCreateRequest);
//     formData.append('postCreateRequest', jsonString);
//     console.log('📄 postCreateRequest 추가:', jsonString);
//   }

//   // images 처리 - base64 문자열을 File 객체로 변환
//   if (mappedData.images && Array.isArray(mappedData.images)) {
//     console.log('🔍 images 배열 확인:', mappedData.images.length, '개');

//     mappedData.images.forEach((image, index) => {
//       console.log(`🔍 이미지 ${index} 타입 확인:`, {
//         isFile: image instanceof File,
//         isString: typeof image === 'string',
//         isBase64: typeof image === 'string' && image.startsWith('data:'),
//         preview: typeof image === 'string' ? image.substring(0, 50) + '...' : 'File object',
//       });

//       if (image instanceof File) {
//         // 이미 File 객체인 경우
//         formData.append('images', image);
//         console.log(`📎 File 객체 추가 ${index + 1}:`, image.name, image.type);
//       } else if (typeof image === 'string' && image.startsWith('data:')) {
//         // base64 문자열인 경우 File 객체로 변환
//         try {
//           const timestamp = Date.now();
//           const filename = `image_${timestamp}_${index}.png`; // 기본 확장자

//           // base64에서 실제 확장자 추출
//           const mimeMatch = image.match(/data:image\/([^;]+)/);
//           const actualExtension = mimeMatch ? mimeMatch[1] : 'png';
//           const actualFilename = `image_${timestamp}_${index}.${actualExtension}`;

//           const file = base64ToBlob(image, actualFilename);

//           if (file) {
//             formData.append('images', file);
//             console.log(`📎 Base64 변환 파일 추가 ${index + 1}:`, actualFilename, file.type, `${file.size} bytes`);
//           } else {
//             console.error(`❌ Base64 변환 실패 - 이미지 ${index}`);
//           }
//         } catch (error) {
//           console.error(`❌ Base64 변환 중 에러 - 이미지 ${index}:`, error);
//         }
//       } else if (image instanceof Blob) {
//         // Blob 객체인 경우 File로 변환
//         const filename = `image_${Date.now()}_${index}.png`;
//         const file = new File([image], filename, { type: image.type || 'image/png' });
//         formData.append('images', file);
//         console.log(`📎 Blob 변환 파일 추가 ${index + 1}:`, filename, file.type);
//       } else {
//         console.warn(`⚠️ 지원하지 않는 이미지 형식 ${index}:`, typeof image, image);
//       }
//     });
//   } else {
//     console.warn('⚠️ images가 없거나 배열이 아닙니다:', mappedData.images);
//   }

//   // 기타 필드 처리
//   Object.keys(mappedData).forEach((key) => {
//     if (key !== 'postCreateRequest' && key !== 'images') {
//       const value = mappedData[key];

//       if (value === null || value === undefined) {
//         // null, undefined는 건너뜀
//         return;
//       }

//       if (value instanceof File) {
//         formData.append(key, value);
//         console.log(`📎 추가 파일: ${key}`, value.name);
//       } else if (Array.isArray(value)) {
//         // 배열 처리
//         value.forEach((item, idx) => {
//           if (item instanceof File) {
//             formData.append(key, item);
//             console.log(`📎 배열 파일 ${key}[${idx}]:`, item.name);
//           } else if (typeof item === 'string' && item.startsWith('data:')) {
//             // 배열 내 base64 처리
//             try {
//               const filename = `${key}_${Date.now()}_${idx}.png`;
//               const file = base64ToBlob(item, filename);
//               if (file) {
//                 formData.append(key, file);
//                 console.log(`📎 배열 Base64 변환 ${key}[${idx}]:`, filename);
//               }
//             } catch (error) {
//               console.error(`❌ 배열 Base64 변환 실패 ${key}[${idx}]:`, error);
//             }
//           } else {
//             formData.append(key, String(item));
//             console.log(`📝 배열 값 ${key}[${idx}]:`, item);
//           }
//         });
//       } else if (typeof value === 'string' && value.startsWith('data:')) {
//         // 단일 base64 처리
//         try {
//           const filename = `${key}_${Date.now()}.png`;
//           const file = base64ToBlob(value, filename);
//           if (file) {
//             formData.append(key, file);
//             console.log(`📎 Base64 변환 ${key}:`, filename);
//           }
//         } catch (error) {
//           console.error(`❌ Base64 변환 실패 ${key}:`, error);
//           formData.append(key, String(value));
//         }
//       } else {
//         // 일반 값들
//         formData.append(key, String(value));
//         console.log(`📝 일반 값 ${key}:`, value);
//       }
//     }
//   });

//   // FormData 최종 확인
//   console.log('🔍 최종 FormData 확인:');
//   let entryCount = 0;
//   for (let [key, value] of formData.entries()) {
//     entryCount++;
//     if (value instanceof File) {
//       console.log(`  ${key}: File(${value.name}, ${value.type}, ${Math.round(value.size / 1024)}KB)`);
//     } else {
//       const preview = String(value).length > 50 ? String(value).substring(0, 50) + '...' : String(value);
//       console.log(`  ${key}: ${preview}`);
//     }
//   }

//   console.log(`📊 총 ${entryCount}개의 항목이 FormData에 추가됨`);

//   if (entryCount === 0) {
//     console.error('❌ FormData가 비어있습니다!');
//     console.error('원본 데이터:', mappedData);
//     throw new Error('FormData가 비어있습니다. 데이터를 확인해주세요.');
//   }

//   return formData;
// };

// 배열 처리 함수 분리

export const createFormDataForMultipart = (mappedData) => {
  const formData = new FormData();

  // JSON을 Blob으로 명확하게 추가
  if (mappedData.postCreateRequest) {
    const jsonBlob = new Blob([JSON.stringify(mappedData.postCreateRequest)], { type: 'application/json' });
    formData.append('postCreateRequest', jsonBlob);
  }

  // images 배열이 있다면 처리
  if (mappedData.images?.length) {
    mappedData.images.forEach((img, index) => {
      if (typeof img === 'string' && img.startsWith('data:')) {
        const file = base64ToBlob(img, `image-${Date.now()}-${index}.png`);
        formData.append('images', file);
      } else {
        formData.append('images', img);
      }
    });
  }

  return formData;
};

function handleArrayValue(formData, key, value, keyFormat) {
  if (value.length === 0) {
    // 빈 배열 처리
    formData.append(key, '');
    return;
  }

  if (value.every((item) => item instanceof File)) {
    // 파일 배열 - 서버가 어떤 방식을 원하는지에 따라 조정
    value.forEach((file, index) => {
      const arrayKey = getArrayKey(key, index, keyFormat);
      formData.append(arrayKey, file);
    });
  } else if (value.every((item) => isBase64(item))) {
    // Base64 배열
    console.log(`🔄 Base64 배열 감지됨 - ${key} 필드들을 File로 변환`);
    value.forEach((base64Item, index) => {
      const filename = `${key}_${index}_${Date.now()}.${getExtensionFromBase64(base64Item)}`;
      const file = base64ToBlob(base64Item, filename);
      const arrayKey = getArrayKey(key, index, keyFormat);

      if (file) {
        formData.append(arrayKey, file);
        console.log(`✅ ${key}[${index}]: Base64 → File(${file.name}, ${file.size} bytes)`);
      } else {
        formData.append(arrayKey, base64Item);
      }
    });
  } else {
    // 일반 값 배열
    value.forEach((item, index) => {
      const arrayKey = getArrayKey(key, index, keyFormat);
      if (typeof item === 'object' && item !== null) {
        formData.append(arrayKey, JSON.stringify(item));
      } else {
        formData.append(arrayKey, String(item));
      }
    });
  }
}

// 배열 키 형식 생성
function getArrayKey(key, index, format) {
  switch (format) {
    case 'brackets':
      return `${key}[]`;
    case 'indexed':
      return `${key}[${index}]`;
    case 'multiple':
    default:
      return key;
  }
}

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

// base64 검증 강화
export function isBase64(str) {
  if (typeof str !== 'string' || str.length === 0) return false;

  try {
    // 기본 형식 검사
    if (!str.startsWith('data:') || !str.includes('base64,')) return false;

    // MIME 타입 검사
    const mimeMatch = str.match(/^data:([^;]+);base64,/);
    if (!mimeMatch) return false;

    const mimeType = mimeMatch[1];
    const supportedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
      'application/pdf',
    ];

    if (!supportedTypes.includes(mimeType)) {
      console.warn(`지원하지 않는 MIME 타입: ${mimeType}`);
    }

    // Base64 데이터 유효성 검사
    const base64Data = str.split(',')[1];
    window.atob(base64Data); // 디코딩 테스트

    return true;
  } catch (error) {
    console.warn('Base64 유효성 검사 실패:', error);
    return false;
  }
}

// 이미지 base64를 blob으로 바꿔주는 형
// export function base64ToBlob(base64, filename = null) {
//   try {
//     const parts = base64.split(',');
//     if (parts.length !== 2) {
//       throw new Error('Invalid base64 format');
//     }

//     const imageType = parts[0].split(':')[1].split(';')[0];
//     const decodedData = window.atob(parts[1]);
//     const uInt8Array = new Uint8Array(decodedData.length);

//     for (let i = 0; i < decodedData.length; ++i) {
//       uInt8Array[i] = decodedData.charCodeAt(i);
//     }

//     const blob = new Blob([uInt8Array], { type: imageType });

//     // filename이 제공되었다면 File 객체로 반환
//     if (filename) {
//       return new File([blob], filename, { type: imageType });
//     }
//     console.log('Base to Blob conversion: ', blob);
//     return blob;
//   } catch (error) {
//     console.error('Base64 to Blob conversion failed:', error);
//     return null;
//   }
// }
export function base64ToBlob(base64, filename = null) {
  try {
    // base64 형식 검증
    if (!base64 || typeof base64 !== 'string') {
      throw new Error('Invalid base64 input');
    }

    const parts = base64.split(',');
    if (parts.length !== 2) {
      throw new Error('Invalid base64 format - missing comma separator');
    }

    // MIME 타입 추출
    const mimeMatch = parts[0].match(/data:([^;]+)/);
    if (!mimeMatch) {
      throw new Error('Invalid base64 format - missing MIME type');
    }

    const imageType = mimeMatch[1];
    console.log('🔍 추출된 MIME 타입:', imageType);

    // base64 디코딩
    const decodedData = window.atob(parts[1]);
    const uInt8Array = new Uint8Array(decodedData.length);

    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }

    const blob = new Blob([uInt8Array], { type: imageType });
    console.log('🔍 Blob 생성 완료:', blob.size, 'bytes,', imageType);

    // filename이 제공되었다면 File 객체로 반환
    if (filename) {
      const file = new File([blob], filename, {
        type: imageType,
        lastModified: Date.now(),
      });
      console.log('🔍 File 객체 생성 완료:', file.name, file.type, file.size, 'bytes');
      return file;
    }

    return blob;
  } catch (error) {
    console.error('❌ Base64 to Blob conversion failed:', error);
    console.error('Input preview:', base64?.substring(0, 100));
    return null;
  }
}
// base64에서 확장자 추출
function getExtensionFromBase64(base64) {
  try {
    const mimeType = base64.split(',')[0].split(':')[1].split(';')[0];
    const extensions = {
      'image/jpeg': 'jpg',
      'image/jpg': 'jpg',
      'image/png': 'png',
      'image/gif': 'gif',
      'image/webp': 'webp',
      'image/svg+xml': 'svg',
    };
    return extensions[mimeType] || 'jpg';
  } catch {
    return 'jpg';
  }
}
