import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CartPage.module.css';
import { ChevronLeftIcon } from '@/components/icons';
import { useCart } from '@/hooks/useCart';

export default function CartPage() {
  const navigate = useNavigate();
  const { cartItems: storedCartItems, isLoading } = useCart();
  const [cartItems, setCartItems] = useState([]);

  const [selectAll, setSelectAll] = useState(true);

  const handleBack = () => navigate(-1);

  // 로컬 스토리지에서 로드 시 state 업데이트
  useEffect(() => {
    if (!isLoading && storedCartItems.length > 0) {
      const itemsWithSelection = storedCartItems.map((item) => ({
        ...item,
        isSelected: true,
      }));
      setCartItems(itemsWithSelection);
    } else if (!isLoading && storedCartItems.length === 0) {
      // navigate(-1);
    }
  }, [isLoading, storedCartItems]);

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setCartItems(
      cartItems.map((item) => ({
        ...item,
        isSelected: newSelectAll,
      }))
    );
  };

  const handleSelectItem = (id) => {
    const updatedItems = cartItems.map((item) => (item.id === id ? { ...item, isSelected: !item.isSelected } : item));
    setCartItems(updatedItems);
    setSelectAll(updatedItems.every((item) => item.isSelected));
  };

  const handleDeleteSelected = () => {
    setCartItems(cartItems.filter((item) => !item.isSelected));
  };

  const handleQuantityChange = (id, delta) => {
    setCartItems(
      cartItems.map((item) => (item.optionId === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item))
    );
  };

  // 선택된 상품 계산
  const selectedItems = cartItems.filter((item) => item.isSelected);
  const selectedProductPrice = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = selectedItems.length > 0 ? 3000 : 0;
  const discount = 0;
  const totalPrice = selectedProductPrice + shippingFee - discount;
  const selectedCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0);

  // 판매자별로 그룹핑
  const groupedItems = cartItems.reduce((acc, item) => {
    const existing = acc.find((group) => group.seller === item.sellerName);
    if (existing) {
      existing.items.push(item);
    } else {
      acc.push({ seller: item.sellerName, items: [item] });
    }
    return acc;
  }, []);

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <button className={styles.backButton} onClick={handleBack}>
          <ChevronLeftIcon width={24} height={24} />
        </button>
        <h1 className={styles.headerTitle}>장바구니</h1>
        <div className={styles.spacer} />
      </header>

      {/* 전체 선택 영역 */}
      <div className={styles.selectAllSection}>
        <div className={styles.selectAllLeft}>
          <input
            type='checkbox'
            checked={selectAll}
            onChange={handleSelectAll}
            className={styles.checkbox}
            id='selectAll'
          />
          <label htmlFor='selectAll' className={styles.selectAllLabel}>
            전체 선택
          </label>
        </div>
        <button className={styles.deleteButton} onClick={handleDeleteSelected}>
          선택 삭제
        </button>
      </div>

      {/* 상품 목록 */}
      <div className={styles.cartContent}>
        {groupedItems.map((group, groupIndex) => (
          <div key={groupIndex} className={styles.sellerGroup}>
            <div className={styles.divider} />
            <div className={styles.sellerHeader}>
              <h3 className={styles.sellerName}>{group.seller}</h3>
            </div>

            <div className={styles.itemsContainer}>
              {group.items.map((item) => (
                <div key={item.optionId} className={styles.cartItem}>
                  <input
                    type='checkbox'
                    checked={item.isSelected}
                    onChange={() => handleSelectItem(item.id)}
                    className={styles.checkbox}
                    id={`item-${item.id}`}
                  />

                  <div className={styles.itemContent}>
                    <div className={styles.cardTop}>
                      <img src={item.image} alt={item.productName} className={styles.productImage} />
                      <div className={styles.productInfo}>
                        <h4 className={styles.productName}>{item.productName}</h4>
                        <p className={styles.variant}>상품선택: {item.optionValue}</p>
                      </div>
                    </div>

                    <div className={styles.cardBottom}>
                      <div className={styles.quantityControl}>
                        <button className={styles.quantityButton} onClick={() => handleQuantityChange(item.optionId, -1)}>
                          −
                        </button>
                        <input type='text' className={styles.quantityInput} value={item.quantity} readOnly />
                        <button className={styles.quantityButton} onClick={() => handleQuantityChange(item.optionId, 1)}>
                          +
                        </button>
                      </div>
                      <p className={styles.itemPrice}>{(item.price * item.quantity).toLocaleString()}원</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 바텀시트 - 결제 요약 */}
      <div className={styles.bottomSheet}>
        <div className={styles.handle} />

        <div className={styles.priceSection}>
          <div className={styles.priceLine}>
            <span className={styles.priceLabel}>선택 상품금액</span>
            <span className={styles.priceValue}>{selectedProductPrice.toLocaleString()}원</span>
          </div>
          <div className={styles.priceLine}>
            <span className={styles.priceLabel}>배송비</span>
            <span className={styles.priceValue}>{shippingFee.toLocaleString()}원</span>
          </div>
          <div className={styles.priceLine}>
            <span className={styles.priceLabel}>할인예상금액</span>
            <span className={styles.priceValue}>{discount.toLocaleString()}원</span>
          </div>

          <div className={styles.totalLine}>
            <span className={styles.totalLabel}>총 주문금액</span>
            <span className={styles.totalValue}>{totalPrice.toLocaleString()}원</span>
          </div>
        </div>

        <div className={styles.checkoutButton}>
          <button
            className={styles.paymentButton}
            disabled={selectedCount === 0}
            onClick={() => navigate('/order-complete', { state: { totalPrice } })}>
            <span>총 {selectedCount}개 |</span>
            <span> {totalPrice.toLocaleString()}원 결제하기</span>
          </button>
        </div>
      </div>
    </div>
  );
}
