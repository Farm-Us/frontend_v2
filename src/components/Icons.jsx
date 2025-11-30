// src/components/Icons.jsx
// 이 파일은 앱 전체에서 사용되는 모든 아이콘 컴포넌트를 모아놓은 곳입니다.
import React from 'react';
import Coupon from '@/assets/icons/Coupon.svg?react';

export const LogoIcon = () => (
  <svg width='86' height='24' viewBox='0 0 86 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <text x='0' y='20' fontFamily='Arial, sans-serif' fontSize='24' fill='black' fontWeight='bold'>
      Farm:Us
    </text>
  </svg>
);

export const ShoppingCartIcon = () => (
  <svg
    className='w-6 h-6 text-gray-800'
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'></path>
  </svg>
);

export const UserIcon = () => (
  <svg
    className='w-6 h-6 text-gray-800'
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'></path>
  </svg>
);

export const HeartIcon = () => (
  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z'></path>
  </svg>
);
export const InteractHeartIcon = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M21.4521 8.50024C21.4521 7.90915 21.3356 7.32367 21.1094 6.77759C20.8831 6.23148 20.5509 5.73552 20.1328 5.31763C19.715 4.89968 19.2188 4.5673 18.6729 4.34106C18.1268 4.1148 17.5413 3.9983 16.9502 3.99829C16.3591 3.99829 15.7736 4.11479 15.2275 4.34106C14.6816 4.56729 14.1854 4.89871 13.7676 5.31665L12.707 6.3772C12.3165 6.76764 11.6835 6.76769 11.293 6.3772L10.2334 5.31763C9.38924 4.47347 8.24362 3.99927 7.0498 3.99927C5.8561 3.99935 4.71127 4.47355 3.86719 5.31763C3.02317 6.16176 2.54883 7.30653 2.54883 8.50024C2.54886 9.69397 3.02312 10.8387 3.86719 11.6829L12 19.8157L20.1328 11.6829L20.2861 11.5227C20.6327 11.1404 20.9114 10.7007 21.1094 10.2229C21.3356 9.67684 21.4521 9.09133 21.4521 8.50024ZM23.4521 8.50024C23.4521 9.35405 23.2839 10.1998 22.957 10.9885C22.6302 11.7772 22.1507 12.4934 21.5469 13.0969L12.707 21.9368C12.3165 22.3273 11.6835 22.3273 11.293 21.9368L2.45312 13.0969C1.23398 11.8777 0.548862 10.2244 0.548828 8.50024C0.548828 6.77599 1.2339 5.12182 2.45312 3.90259C3.67225 2.6836 5.32579 1.99935 7.0498 1.99927C8.77401 1.99927 10.4282 2.68342 11.6475 3.90259L12 4.25513L12.3525 3.90259C12.9561 3.29877 13.6732 2.82023 14.4619 2.49341C15.2507 2.16656 16.0963 1.99829 16.9502 1.99829C17.804 1.9983 18.6497 2.16657 19.4385 2.49341C20.227 2.82015 20.9434 3.29899 21.5469 3.90259C22.1508 4.50621 22.6302 5.22315 22.957 6.01196C23.2839 6.80076 23.4521 7.64641 23.4521 8.50024Z'
      fill='#6A7685'
    />
  </svg>
);

export const MessageCircleIcon = () => (
  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z'></path>
  </svg>
);

export const BookmarkIcon = () => (
  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z'></path>
  </svg>
);

export const PlusCircleIcon = () => (
  <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 20 20'>
    <path
      fillRule='evenodd'
      d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z'
      clipRule='evenodd'></path>
  </svg>
);

export const EditIcon = () => (
  <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'></path>
  </svg>
);

export const XIcon = () => (
  <svg className='w-6 h-6 text-gray-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path>
  </svg>
);

export const CloseIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24'>
    <path d='M18 6L6 18M6 6l12 12' stroke='gray' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

export const ChevronRightIcon = ({ className = 'w-5 h-5 text-gray-500', ...props }) => (
  <svg
    className={className}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
    {...props}>
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5l7 7-7 7'></path>
  </svg>
);

// export const HomeIcon = () => (
//   <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
//     <path
//       strokeLinecap='round'
//       strokeLinejoin='round'
//       strokeWidth={2}
//       d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
//     />
//   </svg>
// );

export const SettingsIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.84 2.37 2.373a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.84 3.31-2.373 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.84-2.37-2.373a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.84-3.31 2.373-2.37a1.724 1.724 0 002.572-1.065z'
    />
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
  </svg>
);

export const CouponIcon = () => <Coupon />;

export const CheckCircleIcon = (props) => (
  <svg {...props} fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
    <path
      fillRule='evenodd'
      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
      clipRule='evenodd'
    />
  </svg>
);

export const StarIcon = (props) => (
  <svg
    {...props}
    xmlns='http://www.w3.org/2000/svg'
    className='w-4 h-4 text-yellow-400'
    fill='currentColor'
    viewBox='0 0 20 20'>
    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
  </svg>
);

export const ChevronLeftIcon = (props) => (
  <svg
    {...props}
    className='w-6 h-6'
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'>
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 19l-7-7 7-7' />
  </svg>
);

export const ArrowLeftIcon = (props) => (
  <svg
    {...props}
    className='w-6 h-6'
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'>
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M10 19l-7-7m0 0l7-7m-7 7h18'></path>
  </svg>
);

export const ChevronBottomIcon = (props) => (
  <svg {...props} width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M19.5 9L12 16.5L4.5 9' stroke='#BAC0C7' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

export const CameraIcon = (props) => (
  <svg
    {...props}
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    strokeWidth='2'
    stroke='currentColor'
    fill='none'
    strokeLinecap='round'
    strokeLinejoin='round'>
    <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
    <path d='M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h3a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v1a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-8a2 2 0 0 1 2 -2'></path>
    <path d='M12 13m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0'></path>
  </svg>
);

export const TrashIcon = (props) => (
  <svg
    {...props}
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    strokeWidth='2'
    stroke='currentColor'
    fill='none'
    strokeLinecap='round'
    strokeLinejoin='round'>
    <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
    <path d='M4 7l16 0'></path>
    <path d='M10 11l0 6'></path>
    <path d='M14 11l0 6'></path>
    <path d='M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12'></path>
    <path d='M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3'></path>
  </svg>
);

export const SearchIcon = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z'
      stroke='#333'
      strokeWidth='2'
    />
    <path d='M21 21L16.65 16.65' stroke='#333' strokeWidth='2' />
  </svg>
);

export const HomeIcon = ({ isActive }) => (
  <svg width='24' height='24' viewBox='0 0 24 24'>
    <path
      d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'
      stroke={isActive ? '#15C47E' : '#6a7685'}
      strokeWidth='2'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
export const CommunityIcon = ({ isActive }) => (
  <svg width='24' height='24' viewBox='0 0 24 24'>
    <path
      d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2m8-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm8 10a2 2 0 0 1-2-2v-2m-2-4h6a2 2 0 0 1 2 2v2'
      stroke={isActive ? '#15C47E' : '#6a7685'}
      strokeWidth='2'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
export const MyPageIcon = ({ isActive }) => (
  <svg width='24' height='24' viewBox='0 0 24 24'>
    <path
      d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m8-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'
      stroke={isActive ? '#15C47E' : '#6a7685'}
      strokeWidth='2'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
export const WriteIcon = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M21 19C21.5523 19 22 19.4477 22 20C22 20.5523 21.5523 21 21 21H12C11.4477 21 11 20.5523 11 20C11 19.4477 11.4477 19 12 19H21Z'
      fill='white'
    />
    <path
      d='M19.1211 5C19.1211 4.8529 19.0924 4.70721 19.0361 4.57129C18.9798 4.43524 18.8971 4.31116 18.793 4.20703C18.6889 4.10296 18.5647 4.0202 18.4287 3.96387C18.2928 3.90765 18.1471 3.87891 18 3.87891C17.7027 3.87891 17.4173 3.99681 17.207 4.20703L4.90234 16.5107L4.37305 18.626L6.48828 18.0977L18.793 5.79297C18.897 5.68893 18.9798 5.56559 19.0361 5.42969C19.0925 5.29364 19.1211 5.14725 19.1211 5ZM21.1211 5C21.1211 5.40978 21.0406 5.81574 20.8838 6.19434C20.7269 6.57298 20.4968 6.91721 20.207 7.20703L7.70703 19.707C7.57887 19.8352 7.41802 19.9267 7.24219 19.9707L3.24219 20.9707C2.90153 21.0557 2.54125 20.9553 2.29297 20.707C2.04468 20.4587 1.9451 20.0985 2.03027 19.7578L3.03027 15.7578L3.07129 15.6289C3.12141 15.5035 3.19684 15.3891 3.29297 15.293L15.793 2.79297C16.3783 2.20768 17.1722 1.87891 18 1.87891C18.4098 1.87891 18.8157 1.95941 19.1943 2.11621C19.573 2.27305 19.9172 2.50318 20.207 2.79297C20.4969 3.0828 20.7269 3.42699 20.8838 3.80566C21.0406 4.18429 21.1211 4.59018 21.1211 5Z'
      fill='white'
    />
  </svg>
);

export const CommentIcon = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M13 2L13.0547 2.00195C15.3848 2.1305 17.5862 3.11351 19.2364 4.76367C20.8865 6.41384 21.8695 8.61517 21.9981 10.9453C21.9991 10.9635 22 10.9818 22 11V11.4971L21.9971 11.7744C21.9599 13.1551 21.6163 14.511 20.9932 15.7461L20.9942 15.7471C20.2056 17.3248 18.9934 18.6523 17.4932 19.5801C15.9935 20.5075 14.2652 20.9981 12.502 20.999L12.503 21L12.501 20.999L12.5 21V20.999C11.1662 21.0021 9.84953 20.72 8.63577 20.1748L3.31643 21.9482C2.95709 22.068 2.56082 21.9749 2.29299 21.707C2.02517 21.4392 1.932 21.0429 2.05178 20.6836L3.82424 15.3633C3.27907 14.1491 2.99654 12.8313 3.00002 11.4971C3.00118 9.73416 3.49275 8.00626 4.41995 6.50684C5.34768 5.00666 6.67518 3.79444 8.25295 3.00586C9.56992 2.34138 11.0249 1.99754 12.5 2.00098V2H13ZM12.4971 4C11.3348 3.99702 10.1878 4.26896 9.15041 4.79297L9.14748 4.79492C7.90183 5.41748 6.85356 6.37421 6.12112 7.55859C5.38878 8.74284 5.00064 10.1076 5.00002 11.5V11.5029C4.99704 12.6652 5.26898 13.8122 5.79299 14.8496C5.91298 15.0875 5.9329 15.3634 5.84866 15.6162L4.5801 19.4189L8.38381 18.1514L8.47952 18.125C8.70494 18.074 8.94224 18.102 9.15041 18.207C10.1878 18.731 11.3348 19.003 12.4971 19H12.5C13.8924 18.9994 15.2572 18.6112 16.4414 17.8789C17.6258 17.1465 18.5825 16.0982 19.2051 14.8525L19.2071 14.8496C19.7311 13.8122 20.003 12.6652 20 11.5029V11.0293C19.8928 9.20031 19.1182 7.47367 17.8223 6.17773C16.5261 4.88157 14.7991 4.10702 12.9697 4H12.4971Z'
      fill='#6A7685'
    />
  </svg>
);

export const PlusIcon = ({ size = 24, color = 'currentColor', className = '', ariaLabel }) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    className={className}
    xmlns='http://www.w3.org/2000/svg'
    role={ariaLabel ? 'img' : 'presentation'}
    aria-label={ariaLabel}
    aria-hidden={ariaLabel ? undefined : true}>
    <path d='M12 5v14M5 12h14' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);
