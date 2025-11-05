// hooks/useProduct.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useProduct = (productId) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        // 현재는 localStorage에서 가져오지만, 나중에 API 호출로 변경 가능
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        const foundProduct = storedProducts.find((p) => p.id.toString() === productId);

        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError('상품을 찾을 수 없습니다.');
          navigate('/seller-market');
        }
      } catch (err) {
        setError('상품을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId, navigate]);

  return { product, loading, error };
};
