/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState, createContext, ReactNode } from 'react';

const defaultValue: any = {
  cart: null,
};

export const CartContext = createContext<any>([{}, () => {}]);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState(defaultValue);

  useEffect(() => {
    if (process.browser) {
      let cartData: string | null | any = localStorage.getItem('woo-cart');
      cartData = cartData !== null ? JSON.parse(cartData) : '';
      setCart(cartData);
    }
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};
