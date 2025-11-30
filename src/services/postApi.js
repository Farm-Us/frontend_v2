// services/postApi.js
import axios from 'axios';
import { createFormDataForMultipart } from '../utils/formData';
import api from './api';
import config from './config';

export const postApi = {
  // POST 요청: 포스트 생성
  createPost: async (producerId, postData) => {
    try {
      if (config.isDevelopment) {
        console.log('📝 포스트 생성 시작:', {
          producerId,
          title: postData?.postCreateRequest?.title,
          imagesCount: postData?.images?.length,
        });
      }

      const formData = createFormDataForMultipart(postData);
      const resp = await api.post(`/posts/${producerId}`, formData);

      if (config.isDevelopment) {
        console.log('✅ 포스트 생성 성공:', resp);
      }

      return resp;
    } catch (error) {
      if (config.isDevelopment) {
        console.error('❌ 포스트 생성 실패:', error);
      }
      throw error;
    }
  },

  // GET 요청: 포스트 목록 조회
  getPosts: async (params = {}) => {
    try {
      const resp = await api.get('/posts', { params });

      if (config.isDevelopment) {
        console.log('📋 포스트 목록 조회 성공:', resp);
      }

      return resp;
    } catch (error) {
      if (config.isDevelopment) {
        console.error('❌ 포스트 목록 조회 실패:', error);
      }
      throw error;
    }
  },

  // GET 요청: 포스트 상세 조회
  getPostDetail: async (postId) => {
    try {
      const resp = await api.get(`/posts/${postId}`);

      if (config.isDevelopment) {
        console.log('📖 포스트 상세 조회 성공:', resp);
      }

      return resp;
    } catch (error) {
      if (config.isDevelopment) {
        console.error('❌ 포스트 상세 조회 실패:', error);
      }
      throw error;
    }
  },

  // PATCH 요청: 포스트 수정
  updatePost: async (producerId, postId, postData) => {
    try {
      if (config.isDevelopment) {
        console.log('✏️ 포스트 수정 시작:', { producerId, postId });
      }

      const resp = await api.patch(`/posts/${producerId}/${postId}`, postData);

      if (config.isDevelopment) {
        console.log('✅ 포스트 수정 성공:', resp);
      }

      return resp;
    } catch (error) {
      if (config.isDevelopment) {
        console.error('❌ 포스트 수정 실패:', error);
      }
      throw error;
    }
  },

  // DELETE 요청: 포스트 삭제
  deletePost: async (postId) => {
    try {
      if (config.isDevelopment) {
        console.log('🗑️ 포스트 삭제 시작:', { postId });
      }

      const resp = await api.delete(`/posts/${postId}`);

      if (config.isDevelopment) {
        console.log('✅ 포스트 삭제 성공:', resp);
      }

      return resp;
    } catch (error) {
      if (config.isDevelopment) {
        console.error('❌ 포스트 삭제 실패:', error);
      }
      throw error;
    }
  },
};
