// src/data.js

// --- Asset Imports [최종 수정] ---
import mainBannerImage from './assets/images/main/fishman-sample-img.png'; // 메인 배너 이미지
import userAvatarImg1 from './assets/images/user-profile-1.jpg'; // user-profile-2.png 대신 존재하는 파일로 변경
import userAvatarImg2 from './assets/images/user-profile.png'; // user-profile-2.png 대신 존재하는 파일로 변경

import productImgExtra1 from './assets/images/main/apple-sample-img.png'; // 사과 사진
import productImgExtra2 from './assets/images/main/watermelon-sample-img.png'; // 수박 사진
import productImgExtra3 from './assets/images/main/plum-sample-img.png'; // 복숭아 사진
import productImgExtra4 from './assets/images/main/green-grapes-sample-img.png'; // 청포도 사진
import productImgExtra5 from './assets/images/main/melon-sample-img.png'; // 참외 사진
import productImgExtra6 from './assets/images/main/cucumber-sample-img.png'; // 오이 사진
import productImgExtra7 from './assets/images/main/peach-sample-img.png'; // 황도 사진
import productImgExtra8 from './assets/images/main/potato-sample-img.png'; // 감자캐는 사진
import productImgExtra9 from './assets/images/main/basil-farmer-img.png'; // 바질농사 사진

// 1. 관심 상품 데이터 (보강)
export const interestProducts = [
  { id: 1, name: '[당일 수확]아삭한 꿀 사과', price: '9,900원', discount: '12%', image: productImgExtra1 },
  { id: 2, name: '한입 가득! 당도 폭발 여름 수박', price: '12,500원', discount: '5%', image: productImgExtra2 },
  { id: 3, name: '지금이 딱! 향긋한 복숭아', price: '8,800원', discount: '5%', image: productImgExtra3 },
  { id: 4, name: '[당일 수확]아삭한 꿀 사과', price: '9,900원', discount: '12%', image: productImgExtra1 },
];

// 2. 제철 인기 상품 데이터 (보강)
export const seasonalProducts = [
  {
    id: 1,
    rank: 1,
    name: '!!당도보장✌️🍇특등급 샤인머스캣 2kg 4-5수🍇',
    price: '24,500원',
    discount: '24%',
    rating: '4.6',
    reviews: '136',
    image: productImgExtra4,
  },
  {
    id: 2,
    rank: 2,
    name: '!반짝 할인! 성주참외 온수 참외 10KG',
    price: '9,900원',
    discount: '9%',
    rating: '4.7',
    reviews: '23',
    image: productImgExtra5,
  },
  {
    id: 3,
    rank: 3,
    name: '가격인하! 못난이 미니오이 2kg',
    price: '8,700원',
    discount: '32%',
    rating: '5.0',
    reviews: '13',
    image: productImgExtra6,
  },
  {
    id: 4,
    rank: 4,
    name: '!!당도보장!! 황금알 황도 4kg 무작위과(17~21과)',
    price: '26,800원',
    discount: '18%',
    rating: '4.5',
    reviews: '2',
    image: productImgExtra7,
  },
];

// 3. 농부 이야기 데이터 (CommunityContext에서 사용)
export const farmerStories = [
  {
    id: 1,
    user: { name: '감자국 강원농장', avatar: userAvatarImg1, isFollowing: true },
    title: '올해는 유독 감자가 묵직하게 잘 들었네요.',
    image: [productImgExtra8],
    time: '7시간 전',
  },
  {
    id: 2,
    user: { name: '행복한 농장주', avatar: productImgExtra9, isFollowing: false },
    title: '오늘도 밭에서^^ 바질이 참 잘 컸내요.',
    image: [productImgExtra9],
    timeAgo: '13시간 전',
  },
];



// MainPage에서 사용할 배너 이미지 export
export {mainBannerImage, userAvatarImg2 as userAvatarImg };

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
