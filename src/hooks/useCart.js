import { useState, useEffect } from 'react';

const CART_STORAGE_KEY = 'farm-us-cart';

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 로컬 스토리지에서 장바구니 로드
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setCartItems(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 상태 변경 시 로컬 스토리지에 저장
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }
  }, [cartItems, isLoading]);

  const addToCart = (item) => {
    // 같은 optionId를 가진 항목이 있는지 확인
    const existingItemIndex = cartItems.findIndex((i) => i.optionId === item.optionId);
    
    if (existingItemIndex !== -1) {
      // 같은 optionId가 있으면 수량 증가
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + (item.quantity || 1)
      };
      setCartItems(updatedItems);
    } else {
      // 없으면 새로운 항목 추가
      setCartItems([...cartItems, { ...item, quantity: item.quantity || 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter((i) => i.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCartItems(cartItems.map((i) => (i.id === itemId ? { ...i, quantity } : i)));
    }
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
  };

  const getTotalCount = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  return {
    cartItems,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalCount,
  };
};
