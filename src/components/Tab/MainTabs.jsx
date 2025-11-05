import React from 'react';
import Tab from '../Tab/Tab';
import { SearchIcon } from '../Icons';
import styles from './MainTabs.module.css';

const MainTabs = ({ showSearch = false }) => {
  return (
    <header className={styles.tabNavigation}>
      <div className={styles.tabContainer}>
        <Tab to='/'>커머스</Tab>
        <Tab to='/community'>커뮤니티</Tab>
      </div>
      {showSearch && (
        <button className={styles.searchButton}>
          <SearchIcon />
        </button>
      )}
    </header>
  );
};

export default MainTabs;
