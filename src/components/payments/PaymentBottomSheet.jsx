// src/components/payments/PaymentBottomSheet.jsx
import React, { useState } from 'react';

// 결제 옵션 데이터 예시
const option = [
  { id: 1, name: '무게', price: 25000, label: '1kg' },
  { id: 2, name: '무게', price: 45000, label: '2kg' },
  { id: 3, name: '무게', price: 65000, label: '3kg' },
];
export default function PaymentBottomSheet({ options = option, setIsSelectOpen }) {
  const [isOpen, setIsOpen] = useState(false); // 셀렉트 열림 상태
  const [selected, setSelected] = useState(null);
  const defaultName = options[0]?.name || '옵션';

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  const handlePayment = () => {
    if (selected) alert('결제가 완료되었습니다!');
    setIsSelectOpen(false);
  };

  return (
    <div className='fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg max-w-[480px] md:mx-auto flex flex-col overflow-hidden animate-slide-up z-20'>
      {/* --- 상단 바 (드래그 핸들) --- */}
      <div className='w-full py-2 flex justify-center items-center'>
        <div className='w-10 h-1 bg-gray-300 rounded-full' />
      </div>

      {/* --- 콘텐츠 --- */}
      <div className={`flex-1 px-5 flex flex-col gap-4 mb-10 overflow-y-auto ${isOpen ? 'pb-20' : 'pb-40'}`}>
        {/* Select Box */}
        <div className='flex flex-col mt-4 border border-gray-400 rounded-lg'>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className='w-full border-b border-gray-200 px-4 py-3 flex justify-between items-center'>
            <span className='text-gray-700 font-medium'>{selected ? selected.label : defaultName}</span>
            <svg
              className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
            </svg>
          </button>

          {/* 셀렉트 내용 */}
          {isOpen && (
            <div
              className={`transition-all duration-300 overflow-hidden ${
                isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
              }`}>
              {options.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className='w-full px-4 py-3 flex justify-between border-b border-gray-200 hover:bg-gray-50'>
                  <span className='text-gray-700 text-base'>{item.label}</span>
                  <span className='text-gray-900 font-semibold'>{item.price.toLocaleString()}원</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* --- 결제 요약 --- */}
      <div className='border-t border-gray-200 py-4 px-5'>
        <div className='flex justify-between items-center text-lg'>
          <span className='text-gray-500 font-medium'>결제 예상 금액</span>
          <span className='text-gray-900 font-semibold'>
            {selected ? `${selected?.price.toLocaleString()}원` : '0원'}
          </span>
        </div>
      </div>

      {/* --- 결제 버튼 --- */}
      <div className='px-5 pb-8'>
        <button
          disabled={!selected}
          className={`w-full h-12 rounded-2xl text-white font-semibold transition-colors ${
            selected ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 cursor-not-allowed'
          }`}
          onClick={handlePayment}>
          결제하기
        </button>
      </div>
    </div>
  );
}
