import { create } from 'zustand';
import { Pizza } from '../types';

type CartItem = Pizza & { quantity: number };

type CartStore = {
  isCartOpen: boolean;
  cartItems: CartItem[];
  toggleCart: () => void;
  addToCart: (pizza: Pizza) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
};

export const useCartStore = create<CartStore>((set, get) => ({
  isCartOpen: false,
  cartItems: [],
  
  toggleCart: () => set(state => ({ isCartOpen: !state.isCartOpen })),
  
  addToCart: (pizza) => {
    set((state) => {
      const existingItem = state.cartItems.find(item => item.id === pizza.id);
      
      if (existingItem) {
        return {
          cartItems: state.cartItems.map(item =>
            item.id === pizza.id 
              ? { ...item, quantity: item.quantity + 1 } 
              : item
          )
        };
      }
      
      return {
        cartItems: [...state.cartItems, { ...pizza, quantity: 1 }]
      };
    });
  },
  
  removeFromCart: (id) => {
    set((state) => ({
      cartItems: state.cartItems.filter(item => item.id !== id)
    }));
  },
  
  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(id);
      return;
    }
    
    set((state) => ({
      cartItems: state.cartItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    }));
  },
  
  clearCart: () => set({ cartItems: [] }),
  
  totalItems: () => {
    return get().cartItems.reduce((total, item) => total + item.quantity, 0);
  },
  
  totalPrice: () => {
    return get().cartItems.reduce(
      (total, item) => total + (item.price * item.quantity), 
      0
    );
  }
}));