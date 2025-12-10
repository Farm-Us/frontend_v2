import React, { useState, useRef, useEffect } from 'react';
import styles from './CommentBottomSheet.module.css';

// TODO: 댓글 API 연동 필요
// TODO: 댓글 디자인 피그마와 동일한지 확인 필요
const CommentBottomSheet = ({ isOpen, onClose, postId, comments = [], onAddComment }) => {
  const [commentText, setCommentText] = useState('');
  const [localComments, setLocalComments] = useState([]);
  const textareaRef = useRef(null);
  const bottomSheetRef = useRef(null);

  // isOpen될 때만 comments를 초기화
  useEffect(() => {
    if (isOpen) {
      setLocalComments(comments);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      text: commentText,
      author: '나',
      authorImage: 'https://placehold.co/32x32',
      timestamp: '방금 전',
      likes: 0,
    };

    setLocalComments([...localComments, newComment]);
    if (onAddComment) {
      onAddComment(newComment);
    }
    setCommentText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === bottomSheetRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} ref={bottomSheetRef} onClick={handleBackdropClick}>
      <div className={styles.bottomSheet}>
        {/* 헤더 */}
        <div className={styles.header}>
          <div className={styles.dragHandle}></div>
          <div className={styles.headerContent}>
            <h3 className={styles.title}>댓글 {localComments.length}</h3>
            <button className={styles.closeButton} onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* 댓글 목록 */}
        <div className={styles.commentList}>
          {localComments.length === 0 ? (
            <div className={styles.emptyState}>
              <p>첫 댓글을 남겨보세요!</p>
            </div>
          ) : (
            localComments.map((comment) => (
              <div key={comment.id} className={styles.commentItem}>
                <img
                  src={comment.authorImage || 'https://placehold.co/32x32'}
                  alt={comment.author}
                  className={styles.avatar}
                />
                <div className={styles.commentContent}>
                  <div className={styles.commentHeader}>
                    <span className={styles.authorName}>{comment.author}</span>
                    <span className={styles.timestamp}>{comment.timestamp}</span>
                  </div>
                  <p className={styles.commentText}>{comment.text}</p>
                  <div className={styles.commentActions}>
                    <button className={styles.likeButton}>
                      <HeartIcon />
                      {comment.likes > 0 && <span>{comment.likes}</span>}
                    </button>
                    <button className={styles.replyButton}>답글</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 입력 영역 */}
        <div className={styles.inputContainer}>
          <div className={styles.inputWrapper}>
            <textarea
              ref={textareaRef}
              className={styles.input}
              placeholder="댓글을 입력하세요..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={1}
            />
            <button
              className={`${styles.submitButton} ${commentText.trim() ? styles.active : ''}`}
              onClick={handleSubmit}
              disabled={!commentText.trim()}>
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 아이콘 컴포넌트
const CloseIcon = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M18 6L6 18M6 6L18 18'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const HeartIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const SendIcon = () => (
  <svg width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export default CommentBottomSheet;
