import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './FormLayout.module.css';
import { Toaster } from 'react-hot-toast';
// import { FormHeader } from './Header/FormHeader';

export default function FormLayout() {
  return (
    <div className={styles.container}>
      {/* <FormHeader /> */}
      <Toaster position='top-center' reverseOrder={false} />
      <div className={styles.mobileScreen}>
        <Outlet />
      </div>
    </div>
  );
}
