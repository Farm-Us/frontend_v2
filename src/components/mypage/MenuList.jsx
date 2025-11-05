import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '../Icons';

export default function MenuSection({ title = '', menuItems }) {
  return (
    <div className='bg-white'>
      {title && <h3 className='text-base font-bold text-gray-900 px-5 pt-5'>{title}</h3>}
      <div className='mt-2'>
        {menuItems.map((item, idx) => (
          <Link
            key={idx}
            to={item.path || '#'}
            className={`flex justify-between items-center p-5 ${idx < menuItems.length - 1 ? 'border-b' : ''}`}>
            <span className='text-base font-medium text-gray-800 flex items-center gap-2'>
              {item.label}
              {item.count !== undefined && (
                <span className='text-base text-green-500 w-5 h-5 flex items-center justify-center rounded-full'>
                  {item.count}
                </span>
              )}
            </span>
            <ChevronRightIcon />
          </Link>
        ))}
      </div>
    </div>
  );
}
