import { createContext, useEffect, useState } from "react";
import { menu_list } from "../assets/assets";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const url = "http://localhost:4000"
    const [food_list, setFoodList] = useState([]);

    // UPDATE::
    const [cartItems, setCartItems] = useState(() => {
        const stored = localStorage.getItem('cartItems');
        return stored ? JSON.parse(stored) : {};
      });


    // const [token, setToken] = useState("")
    const [token, setToken] = useState(() => localStorage.getItem("token") || "");

    const currency = "$";
    const deliveryCharge = 5;
      
    // UPDATE:
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
      }, [cartItems]);

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
          try {
            if (cartItems[item] > 0) {
              // Compare IDs as strings to avoid mismatch
              let itemInfo = food_list.find((product) => String(product._id) === String(item));
              if (itemInfo) {
                totalAmount += itemInfo.price * cartItems[item];
              }
            }
          } catch (error) {
            // handle error if needed
          }
        }
        return totalAmount;
      };

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data)
    }

    const loadCartData = async ({ token }) => {
        try {
            const response = await axios.post(
                url + "/api/cart/get", 
                {}, // <-- Empty body (no userId needed)
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
            //     await loadCartData({ token }); // Only call if token exists ********** Change if error
            // } else {
            //     setCartItems({}); // No token? Set cart to empty object
            // }
        }
        loadData();
    }, []);
    

    const contextValue = {
        url,
        food_list,
        menu_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        loadCartData,
        setCartItems,
        currency,
        deliveryCharge
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider;