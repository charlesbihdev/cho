import { create } from "zustand";

const useCartStore = create((set) => ({
    cartItems: JSON.parse(localStorage.getItem("cart")) || [],

    setCartItems: (items) => {
        localStorage.setItem("cart", JSON.stringify(items));
        set({ cartItems: items });
    },

    addToCart: (item) =>
        set((state) => {
            const updated = [...state.cartItems, item];
            localStorage.setItem("cart", JSON.stringify(updated));
            return { cartItems: updated };
        }),

    removeFromCart: (id) =>
        set((state) => {
            const updated = state.cartItems.filter((item) => item.id !== id);
            localStorage.setItem("cart", JSON.stringify(updated));
            return { cartItems: updated };
        }),

    clearCart: () =>
        set(() => {
            localStorage.removeItem("cart");
            return { cartItems: [] };
        }),
}));

export default useCartStore;
