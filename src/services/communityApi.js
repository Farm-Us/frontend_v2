// services/communityApi.js
import { createFormData } from '../utils/formData';
import api from './api';

export const communityApi = {
  // GET 요청
  getPosts: async (params = {}) => {
    try {
      const response = await api.get('/posts', { params });
      return response; // 이미 인터셉터에서 .data 반환함
    } catch (error) {
      throw error; // 에러는 그대로 던지기
    }
  },

  // GET 요청: 디테일
  getPostsDetail: async (postId) => {
    try {
      const response = await api.get(`/posts/${postId}`);
      console.log('커뮤니티 디테일 response data: ', response);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // POST 요청
  createPost: async (id, postData) => {
    try {
      const formData = createFormData(postData);
      console.log('formData 변환함?:', formData);
      const response = await api.post(`/posts/${id}`, formData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // patch 요청
  updatePost: async (id, postData) => {
    try {
      const response = await api.patch(`/posts/${id}`, postData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // DELETE 요청
  deletePost: async (id) => {
    try {
      const response = await api.delete(`/posts/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // 파일 업로드
  uploadImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
};
