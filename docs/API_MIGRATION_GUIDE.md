# API 마이그레이션 가이드

## 개요

localStorage → 서버 API로 마이그레이션하기 위한 가이드 문서입니다.
현재 코드 분석을 통해 추출한 API 응답 구조와 마이그레이션 체크리스트를 제공합니다.

---

## 📊 현재 API 상태

### ✅ 구현된 API

- **상품 API** (`itemApi.js`)

  - `createItem(producerId, itemData)` - 상품 생성
  - `getItemsProducer(producerId, params)` - 판매자 상품 목록
  - `getItemDetail(id, params)` - 상품 상세 조회
  - `updateItem(id, itemData)` - 상품 수정
  - `deleteItem(id)` - 상품 삭제

- **커뮤니티 API** (`communityApi.js`)
  - `createPost(id, postData)` - 포스트 생성
  - `getPosts(params)` - 포스트 목록
  - `getPostsDetail(postId)` - 포스트 상세
  - `updatePost(id, postData)` - 포스트 수정
  - `deletePost(id)` - 포스트 삭제

---

## 📝 마이그레이션 대상 데이터

### 1단계: 상품 정보 (Product)

#### 현재 localStorage 구조

```javascript
{
  products: [
    {
      id: timestamp,
      itemName: string,
      category: string,
      mainImage: base64,
      marketName: string,
      farmerName: string,
      career: string,
      itemPrice: number,
      storageOption: string,
      farmingOption: string,
      cultivationMethod: string,
      details: [
        {
          id: number,
          title: string,
          content: string,
          image: base64,
          placeholder: object,
        },
      ],
      options: [
        {
          name: string,
          value: string,
          price: number,
        },
      ],
      discount: number,
    },
  ];
}
```

#### 수정 필요 파일

- `src/store/productStore.js` ✅ (persist 제거 완료)
- `src/hooks/useProductRegister.js` ✅ (localStorage 제거 완료)

#### API 요청 흐름

```
사용자 입력
  ↓
React Hook Form + Zustand 스토어
  ↓
dataLogics() 변환 (productWriteDataMapper.js)
  ↓
createFormData() 변환 (formData.js)
  ↓
itemApi.createItem() 호출
  ↓
서버 저장 → React Query 캐시 업데이트
```

**확인 필요 사항:**

- [ ] 백엔드에서 어떤 필드를 받는지? (모든 필드 필수인지?)
- [x] FormData 형식이 맞는지? (multipart/form-data 인지?)
- [ ] 이미지 업로드는 별도로 처리되는지?
- [ ] 응답 형식은 무엇인가? (상품 ID 포함 여부)

---

### 2단계: 커뮤니티 정보 (Community)

#### 현재 데이터 구조

```javascript
{
  // Zustand 스토어 (메모리)
  title: string,
  content: string,
  images: [base64, base64, ...], // 최대 10개
  taggedProducts: [productId, productId, ...],
}
```

#### 수정 완료 파일

- `src/store/communityWriteStore.js` ✅ (persist 제거 완료)
- `src/pages/community/CommunityWriteTagPage.jsx` ✅ (API 연동 완료)
- `src/hooks/useCommunityWriteForm.js` ✅ (에러 처리 추가)
- `src/pages/community/CommunityWriteConfirmPage.jsx` ✅ (Context 제거)
- `src/services/postApi.js` ✅ (메서드명 정리)
- `src/utils/communityWriteDataMapper.js` ✅ (로깅 개선)

#### API 요청 흐름

```
사용자 입력 (제목, 내용, 이미지)
  ↓
React Hook Form + Zustand 스토어
  ↓
communityWriteMapper() 변환
  ↓
createFormDataForMultipart() 변환
  ↓
postApi.createPost() 호출
  ↓
서버 저장 → React Query 캐시 업데이트
  ↓
/community로 이동 (자동 새로고침)
```

#### 커뮤니티 마이그레이션 상태: ✅ 완료

**개선 사항:**

- [x] postApi.js 메서드 정리 (updatePost, deletePost 메서드명 명확화)
- [x] 에러 처리 표준화 (개발/프로덕션 환경 구분)
- [x] useCommunityWriteForm에서 producerId 동적 로드
- [x] CommunityWriteTagPage에서 판매자 상품 API 연동
- [x] React Query 캐시 업데이트 로직 개선
- [x] 유효성 검사 강화 (제목, 내용 필수)

**확인 필요 사항:**

- [ ] 포스트 생성 API 응답에 postId 포함 여부
- [ ] 태그된 상품 (itemIds) 전송 형식 확인
- [ ] 이미지 MultiPart FormData 형식 검증
- [ ] 포스트 생성 후 목록 자동 갱신 확인

---

### 3단계: 유저 정보 (User) - 백엔드 API 대기

#### 현재 localStorage 구조

```javascript
{
  user: {
    producerId: number,
    userImage: string,
    userName: string,
    marketName: string,
    farmerName: string,
    career: string,
    isSeller: boolean,
    role: 'PRODUCER' | 'CONSUMER',
    email: string
  }
}
```

#### 수정 필요 파일

- `src/store/userStore.js` ✅ (persist 제거 완료)
- `src/hooks/useUserInfo.js` ✅ (localStorage 제거 완료)

#### 현 상태

- ⏸️ 백엔드 API 대기 중
- 현재는 목데이터만 사용

---

## 🔄 FormData 변환 규칙

### createFormData() - 기본 상품 정보

```javascript
입력:
{
  itemName: "딸기",
  mainImage: base64,
  category: "과일",
  details: [
    { title: "...", content: "...", image: base64 }
  ]
}

변환 결과 (MultiPart):
├── request (JSON Blob)
│   ├── itemName: "딸기"
│   ├── category: "과일"
│   └── details: [...]
├── mainImage (File)
└── details[0].image (File)
```

### createFormDataForMultipart() - 커뮤니티 포스트

```javascript
입력:
{
  postCreateRequest: {
    title: "...",
    content: "...",
    taggedProducts: [1, 2, 3]
  },
  images: [base64, base64, ...]
}

변환 결과 (MultiPart):
├── postCreateRequest (JSON Blob)
└── images (File[], 여러 개)
```

---

## ⚠️ 주의사항

### 1. Base64 이미지 처리

- 모든 이미지는 현재 Base64로 저장됨
- 서버 전송 시 File/Blob으로 변환됨 (formData.js에서)
- **확인 필요**: 서버가 원본 파일 형식을 원하는지?

### 2. 캐시 무효화

- 새 항목 생성 후 React Query 캐시 업데이트 필요
  ```javascript
  queryClient.setQueryData(['get-items-producer', producerId], (oldData) => {
    return [...(oldData || []), newItem];
  });
  ```

### 3. 에러 처리

- 서버 오류 시 현재는 이전 localStorage에 저장
- 마이그레이션 후: 에러 메시지 표시만 진행

### 4. 임시 저장 기능

- 현재: localStorage persist로 자동 저장
- 마이그레이션 후: **자동 저장 기능 제거**
- 필요 시: 별도의 드래프트 저장 API 고려

---

## 🚀 마이그레이션 체크리스트

### 1단계: 상품 정보

- [x] Zustand persist 제거
- [x] localStorage 제거
- [ ] 백엔드 API 명세 확인
- [ ] FormData 형식 검증
- [ ] 이미지 업로드 테스트
- [ ] 상품 생성 후 목록 업데이트 테스트
- [ ] 에러 처리 로직 추가

### 2단계: 커뮤니티 정보 (마이그레이션 완료 ✅)

- [x] Zustand persist 제거
- [x] localStorage 제거
- [x] postApi.js 메서드 정리
- [x] useCommunityWriteForm 에러 처리 추가
- [x] CommunityWriteTagPage API 연동
- [x] React Query 캐시 업데이트 로직 개선
- [x] 유효성 검사 강화
- [ ] 백엔드 API 명세 확인 (최종 검증)
- [ ] MultiPart FormData 형식 검증
- [ ] 포스트 생성 후 목록 업데이트 테스트
- [ ] 에러 처리 테스트

### 3단계: 유저 정보

- [x] Zustand persist 제거
- [x] localStorage 제거
- [ ] 백엔드 로그인 API 준비 대기
- [ ] 로그인 시스템 구현
- [ ] 토큰 관리 체계 확립
- [ ] 자동 로그인 기능 구현

---

## 📞 다음 단계

### API 명세서 준비되면:

1. **데이터 매핑** - 요청/응답 필드명 일치 확인
2. **테스트 코드** - vitest로 각 API 호출 테스트
3. **에러 시나리오** - 네트워크 오류, 타임아웃 등 처리
4. **통합 테스트** - 전체 플로우 테스트

### 현재 할 수 있는 작업:

1. **테스트 코드 작성** - 현재 API 호출 로직 테스트
2. **타입 정의** - TypeScript 타입 추가 (선택)
3. **에러 핸들러** - 공통 에러 처리 함수 작성
4. **로깅** - API 요청/응답 로깅 개선

---

## 참고 파일

### 핵심 파일

- `src/services/itemApi.js` - 상품 API
- `src/services/communityApi.js` - 커뮤니티 API
- `src/utils/formData.js` - FormData 변환 유틸
- `src/utils/productWriteDataMapper.js` - 데이터 매핑 로직
- `src/store/productStore.js` - 상품 상태 관리
- `src/store/communityWriteStore.js` - 커뮤니티 상태 관리

### 수정 파일

- `src/hooks/useProductRegister.js` - 상품 등록 폼
- `src/pages/community/CommunityWriteTagPage.jsx` - 커뮤니티 태그 페이지
- `src/hooks/useUserInfo.js` - 유저 정보 훅

### 백엔드 연동

- API 명세서 (Swagger) - **필수**
- 테스트용 API 엔드포인트 - **필수**
- 예제 요청/응답 - **권장**
