import { createContext, useEffect, useState } from "react";
import { menu_list } from "../assets/assets";
import api from "../api"; // Centralized axios instance

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [food_list, setFoodList] = useState([]);

    const [cartItems, setCartItems] = useState(() => {
        const stored = localStorage.getItem('cartItems');
        return stored ? JSON.parse(stored) : {};
    });

    const [token, setToken] = useState(() => localStorage.getItem("token") || "");

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            await api.post("/api/cart/add", { itemId }, { headers: { token } });
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await api.post("/api/cart/remove", { itemId }, { headers: { token } });
        }
    };

    const fetchFoodList = async () => {
        const response = await api.get("/api/food/list");
        setFoodList(response.data.data)
    };

    const loadCartData = async ({ token }) => {
        try {
            const response = await api.post(
                "/api/cart/get", 
                {}, // Empty body
                { headers: { token } }
            );
            setCartItems(response.data.cartData || {});
        } catch (error) {
            console.error("Error loading cart data:", error);
            setCartItems({}); 
        }
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            const token = localStorage.getItem("token");
            // if (token) {
            //     setToken(token);
            //     await loadCartData({ token });
            // } else {
            //     setCartItems({});
            // }
        }
        loadData();
    }, []);
    
    const url = import.meta.env.VITE_API_URL;

    const contextValue = {
        food_list,
        menu_list,
        cartItems,
        addToCart,
        removeFromCart,
        token,
        setToken,
        loadCartData,
        setCartItems,
        url,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
}

export default StoreContextProvider;
