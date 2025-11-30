import React from 'react';
import { ChevronRightIcon } from '../Icons';
import styles from './OrderSection.module.css';

const orderStatus = [
  { label: '입금\n대기', count: 0 },
  { label: '결제\n완료', count: 0 },
  { label: '배송\n준비', count: 0 },
  { label: '배송중', count: 0 },
  { label: '배송\n완료', count: 0 },
  { label: '리뷰', count: 0 },
];

export default function OrdersSection() {
  return (
    <div className='p-5'>
      <h3 className='px-3 text-base font-semibold text-gray-900'>진행중인 주문</h3>

      <div className={`${styles.baseCard}`}>
        {orderStatus.map((status, idx) => (
          <React.Fragment key={idx}>
            <div className='flex flex-col items-center min-w-0 flex-1'>
              <span className='h-9 flex items-center justify-center font-medium whitespace-pre-line leading-tight'>
                {status.label}
              </span>
              <span className='mt-1 text-lg font-bold text-green-500'>{status.count}</span>
            </div>

            {/* 마지막 항목이 아닐 때만 화살표 표시 */}
            {idx < orderStatus.length - 1 && (
              <div className='flex items-center justify-center px-2 flex-shrink-0'>
                <ChevronRightIcon className='w-[16px] h-[16px]' color='#E2E6E9' />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
