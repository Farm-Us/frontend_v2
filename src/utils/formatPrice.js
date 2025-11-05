// utils/formatPrice.js
export const formatPrice = (price) => {
  if (!price || isNaN(price)) return '';
  return new Intl.NumberFormat('ko-KR').format(price);
};

// utils/calculatePrice.js
export const calculateDiscountedPrice = (price, discount) => {
  if (!discount || !price) return price;
  return Math.round(price * (1 - discount / 100));
};
