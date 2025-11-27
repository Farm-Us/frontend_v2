// services/itemApi.js
import { get } from 'react-hook-form';
import api from './api';
import { createFormData } from '../utils/formData';

export const itemApi = {
  // POST 요청
  createItem: async (prdId, itemData) => {
    try {
      console.log('itemApi - createItem - formData:', itemData);
      // const resp = await api.post(`/items/${prdId}`, itemData);
      const resp = await api.post(`/items/${prdId}`, createFormData(itemData));
      return resp;
    } catch (error) {
      throw error;
    }
  },

  // GET 요청
  getItems: async (params = {}) => {
    try {
      const resp = await api.get(`/items`, { params });
      console.log(resp);
      return resp;
    } catch (error) {
      throw error;
    }
  },

  getItemDetail: async (id, params = {}) => {
    try {
      const resp = await api.get(`/items/${id}`, { params });
      return resp;
    } catch (error) {
      throw error;
    }
  },

  getItemsProducer: async (producerId, params = {}) => {
    try {
      const resp = await api.get(`/items/producer/${producerId}`, { params });
      return resp;
    } catch (error) {
      throw error;
    }
  },

  getItemsCategories: async (params = {}) => {
    try {
      const resp = await api.get(`/items/category`);
      return resp;
    } catch (error) {
      throw error;
    }
  },

  getItemsCategory: async (categoryId, params = {}) => {
    try {
      const resp = await api.get(`/items/category/${categoryId}`, { params });
      return resp;
    } catch (error) {
      throw error;
    }
  },

  // DELETE 요청
  deleteItem: async (id) => {
    try {
      const resp = await api.delete(`/items/${id}`);
      return resp;
    } catch (error) {
      throw error;
    }
  },

  // PATCH 요청
  updateItem: async (id, itemData) => {
    try {
      const resp = await api.patch(`/items/${id}`, itemData);
      return resp;
    } catch (error) {
      throw error;
    }
  },
};
