import { createContext, useState } from "react";

const CartContext = createContext([]);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [headerLocation, setHeaderLocation] = useState("Ariyalur");

  return (
    <CartContext.Provider
      value={{ cart, headerLocation, setCart, setHeaderLocation }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
