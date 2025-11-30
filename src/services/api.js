// services/api.js
import axios from 'axios';
import config from './config';

// 환경에 따른 설정
const getApiConfig = () => {
  const baseConfig = {
    timeout: 10000,
    headers: {
      'ngrok-skip-browser-warning': 'true',
    },
  };

  if (config.isDevelopment) {
    return {
      ...baseConfig,
      baseURL: config.apiUrl,
      timeout: 30000, // 개발 시 더 긴 타임아웃
    };
  }

  return {
    ...baseConfig,
    baseURL: config.apiUrl,
    timeout: 10000,
  };
};

const api = axios.create(getApiConfig());

// 공통 요청 인터셉터 - 모든 환경에서 토큰 처리
// api.interceptors.request.use(
//   (requestConfig) => {
//     // 토큰이 있으면 헤더에 추가 (모든 환경)
//     // const token = localStorage.getItem('token');
//     // if (token) {
//     //   requestConfig.headers.Authorization = `Bearer ${token}`;
//     // }
//     // FormData인 경우 Content-Type 헤더 제거 (브라우저가 자동 설정)
//     if (requestConfig.data instanceof FormData) {
//       delete requestConfig.headers['Content-Type'];

//       if (config.isDevelopment) {
//         console.log('📎 FormData detected - Content-Type header removed');
//         console.log('📤 FormData entries:');
//         console.log(requestConfig.data);
//         // for (let [key, value] of requestConfig.data.entries()) {
//         //   console.log(`  ${key}:`, value);
//         // }
//       }
//     }
//     // 개발 환경에서만 로깅
//     if (config.isDevelopment) {
//       console.log('🚀 API Request:', requestConfig.method?.toUpperCase(), requestConfig.url);
//       if (requestConfig.data) {
//         console.log('📤 Request Data:', requestConfig.data);
//       }
//     }

//     return requestConfig;
//   },
//   (error) => {
//     if (config.isDevelopment) {
//       console.error('❌ 요청 에러:', error);
//     }
//     return Promise.reject(error);
//   }
// );
// api.js의 request interceptor 수정
api.interceptors.request.use(
  (requestConfig) => {
    // FormData인 경우 Content-Type 헤더 제거 (브라우저가 자동 설정)
    if (requestConfig.data instanceof FormData) {
      delete requestConfig.headers['Content-Type'];

      if (config.isDevelopment) {
        console.log('📎 FormData detected - Content-Type header removed');

        // FormData 내용 확인 - 올바른 방법
        console.log('📤 FormData entries:');
        let entryCount = 0;
        try {
          for (let [key, value] of requestConfig.data.entries()) {
            entryCount++;
            if (value instanceof File) {
              console.log(`  ${key}: File(${value.name}, ${value.type}, ${value.size}bytes)`);
            } else {
              console.log(`  ${key}: ${value}`);
            }
          }
          console.log(`📊 Interceptor에서 확인된 항목 수: ${entryCount}`);
        } catch (error) {
          console.error('❌ FormData entries 확인 중 오류:', error);
        }

        // FormData 객체 자체는 {}로 표시되는 것이 정상
        console.log('FormData 객체:', requestConfig.data);
      }
    }

    // 개발 환경에서만 로깅
    if (config.isDevelopment) {
      console.log('🚀 API Request:', requestConfig.method?.toUpperCase(), requestConfig.url);
      // FormData가 아닌 경우만 데이터 로깅
      if (requestConfig.data && !(requestConfig.data instanceof FormData)) {
        console.log('📤 Request Data:', requestConfig.data);
      }
    }

    return requestConfig;
  },
  (error) => {
    if (config.isDevelopment) {
      console.error('❌ 요청 에러:', error);
    }
    return Promise.reject(error);
  }
);

// 환경별 응답 인터셉터
if (config.isDevelopment) {
  // 개발 환경 - 상세한 로깅 + 에러 처리
  api.interceptors.response.use(
    (response) => {
      console.log('✅ API Response:', response.status, response.config.url);
      console.log('📥 Response Data:', response.data);
      return response.data; // data만 반환
    },
    (error) => {
      console.error('❌ API Error:', error.response?.status, error.message);

      // 개발 환경에서는 더 상세한 에러 정보
      console.error('🔍 상세 에러 정보:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url,
        method: error.config?.method,
      });

      // 에러 메시지 정규화
      const errorMessage = error.response?.data?.message || error.message || '알 수 없는 오류가 발생했습니다.';

      return Promise.reject(new Error(errorMessage));
    }
  );
} else {
  // 프로덕션 환경 - 최소한의 로깅 + 필수 에러 처리만
  api.interceptors.response.use(
    (response) => {
      return response.data; // data만 반환
    },
    (error) => {
      // 401 에러면 로그아웃 처리 (프로덕션에서도 필수)
      // if (error.response?.status === 401) {
      //   localStorage.removeItem('token');
      //   window.location.href = '/';
      // }

      // 프로덕션에서는 간단한 에러 로깅만
      if (error.response?.status >= 500) {
        console.error('Server Error:', error.response?.status);
      }

      // 에러 메시지 정규화 (사용자 친화적으로)
      let errorMessage;

      if (error.response?.status === 404) {
        errorMessage = '요청한 정보를 찾을 수 없습니다.';
      } else if (error.response?.status === 403) {
        errorMessage = '접근 권한이 없습니다.';
      } else if (error.response?.status >= 500) {
        errorMessage = '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
      } else {
        errorMessage = error.response?.data?.message || '알 수 없는 오류가 발생했습니다.';
      }

      return Promise.reject(new Error(errorMessage));
    }
  );
}

export default api;
