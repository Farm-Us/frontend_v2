// src/components/Button.jsx

import styles from './Button.module.css';

// text와 onClick 함수를 props로 받아 재사용 가능하게 만듭니다.
export default function Button({ text, onClick }) {
  return (
    <button className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
}
