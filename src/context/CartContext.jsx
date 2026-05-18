import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loadFromStorage, saveToStorage, createId } from '../services/storage.js';
import { useAuth } from './AuthContext.jsx';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedCart = loadFromStorage('agrolink-cart') || [];
    const storedOrders = loadFromStorage('agrolink-orders') || [];
    setCartItems(storedCart);
    setOrders(storedOrders);
  }, []);

  useEffect(() => {
    saveToStorage('agrolink-cart', cartItems);
  }, [cartItems]);

  useEffect(() => {
    saveToStorage('agrolink-orders', orders);
  }, [orders]);

  const addToCart = (product) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((current) => current.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );

  const placeOrder = (address) => {
    if (!user) return null;
    const order = {
      id: createId('ORD'),
      items: cartItems,
      total: getTotal,
      address,
      buyer: {
        name: user.fullName,
        email: user.email,
        phone: user.phone,
      },
      status: 'Processing',
      placedAt: new Date().toISOString(),
    };

    setOrders((current) => [order, ...current]);
    clearCart();
    return order;
  };

  return (
    <CartContext.Provider
      value={{ cartItems, orders, addToCart, removeFromCart, updateQuantity, clearCart, getTotal, placeOrder }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
