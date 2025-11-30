// src/data.js

// --- Asset Imports ---
// ✨ [최종 수정] 실제 폴더에 있는 이미지 파일만 사용하도록 경로를 완전히 수정했습니다.
import mainBannerImg from './assets/images/homecommerce.png';
import userAvatarImg1 from './assets/images/user-profile.png';
import userAvatarImg2 from './assets/images/user-profile-1.jpg'; // user-profile-2.png 대신 존재하는 파일로 변경

import productImg1 from './assets/images/product-strawberry.png';
import productImg2 from './assets/images/product-watermelon.jpg';
import productImg3 from './assets/images/product-suvack.jpg';
import productImg4 from './assets/images/card-small.jpg';
import productImg5 from './assets/images/card-large.jpg';
import productImg6 from './assets/images/card-large-1.jpg';

import postImg1 from './assets/images/post-image-1.jpg';
import postImg2 from './assets/images/home-commerce1.jpg'; // homecommerce.png -> home-commerce1.jpg

// 1. 관심 상품 데이터 (보강)
export const interestProducts = [
  { id: 1, name: '고당도 하우스 수박', price: '21,000원', discount: '16%', image: productImg2 },
  { id: 2, name: '초당 옥수수 10개입', price: '15,900원', discount: '20%', image: productImg4 },
  { id: 3, name: '유기농 블루베리 500g', price: '18,000원', discount: '10%', image: productImg1 },
  { id: 4, name: 'GAP 인증 자두 (대과)', price: '25,900원', discount: '13%', image: productImg5 },
];

// 2. 제철 인기 상품 데이터 (보강)
export const seasonalProducts = [
  {
    id: 1,
    rank: 1,
    name: 'GAP 인증 자두 (대과)',
    price: '25,900원',
    discount: '13%',
    rating: '5.0',
    reviews: '999+',
    image: productImg5,
  },
  {
    id: 2,
    rank: 2,
    name: '해남 미니 밤호박 3kg',
    price: '19,900원',
    discount: '15%',
    rating: '4.9',
    reviews: '999+',
    image: productImg6,
  },
  {
    id: 3,
    rank: 3,
    name: '유기농 설향 딸기 1kg',
    price: '14,960원',
    discount: '12%',
    rating: '4.9',
    reviews: '875',
    image: productImg3,
  },
  {
    id: 4,
    rank: 4,
    name: '성주 꿀 참외 2kg',
    price: '22,500원',
    discount: '18%',
    rating: '4.8',
    reviews: '762',
    image: productImg2,
  },
];

// 3. 농부 이야기 데이터 (CommunityContext에서 사용)
export const farmerStories = [
  {
    id: 1,
    user: { name: '싱그러운 농부', avatar: userAvatarImg1, isFollowing: true },
    content: '오늘 수확한 상추 좀 보세요! 너무 예쁘지 않나요? 팜어스 마켓에도 올렸으니 구경오세요~',
    images: [postImg1, postImg2],
    category: '농사일기',
    product: [
      {
        id: 101,
        name: '무농약 꿀사과',
        price: 15000,
        image: productImg1,
        brand: '싱그러운 농장',
        discountRate: 10,
      },
    ],
    tags: [{ y: 150, x: 150 }],
    stats: { likes: '1.2k', comments: '8', isLiked: false },
    timeAgo: '1시간 전',
  },
  {
    id: 2,
    user: { name: '행복한 농장주', avatar: userAvatarImg2, isFollowing: false },
    content: '다들 점심 뭐 드셨나요? 저는 갓 따온 토마토로 파스타 해먹었어요. 역시 직접 키운 게 최고네요 ㅎㅎ',
    images: [postImg2],
    category: '농산물',
    product: [
      {
        id: 102,
        name: '유기농 대추토마토',
        price: 12000,
        image: productImg2,
        brand: '행복 농원',
        discountRate: 5,
      },
    ],
    tags: [{ y: 200, x: 100 }],
    stats: { likes: '345', comments: '12', isLiked: true },
    timeAgo: '3시간 전',
  },
  {
    id: 3,
    user: { name: '딸기농장 아들', avatar: userAvatarImg1, isFollowing: true },
    content: '저희 집 딸기가 드디어 출하를 시작했습니다! 당도 선별기로 하나하나 체크해서 보내드려요!',
    images: [productImg3],
    category: '농산물',
    product: [
      {
        id: 103,
        name: '논산 설향 딸기 1kg',
        price: 24000,
        image: productImg1,
        brand: '딸기농장',
        discountRate: 8,
      },
    ],
    tags: [{ y: 180, x: 120 }],
    stats: { likes: '2.5k', comments: '42', isLiked: false },
    timeAgo: '5시간 전',
  },
];

// 커뮤니티에서 상품 선택 시 호출할거
export const farmerStoriesProd = [
  {
    id: 101,
    name: '무농약 꿀사과',
    price: 15000,
    image: productImg1,
    brand: '싱그러운 농장',
    discountRate: 10,
  },
  {
    id: 102,
    name: '유기농 대추토마토',
    price: 12000,
    image: productImg2,
    brand: '행복 농원',
    discountRate: 5,
  },
  {
    id: 103,
    name: '논산 설향 딸기 1kg',
    price: 24000,
    image: productImg1,
    brand: '딸기농장',
    discountRate: 8,
  },
];

// MainPage에서 사용할 배너 이미지 export
export { mainBannerImg, userAvatarImg1 as userAvatarImg };

// 4. 사용자 임시데이터
export const user = {
  userImage: userAvatarImg1,
  userName: '김준식',
};

export const seller = {
  userImage: userAvatarImg1,
  userName: '김준식',
  marketName: '새벽들딸기농원',
  farmerName: '김준식',
  career: '1년',
};
