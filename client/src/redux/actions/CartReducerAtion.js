import { ADD_TO_CART, CLEAR_CART } from "../types";

export const addToCart = (payload) => ({
    type: ADD_TO_CART,
    payload
});

export const clearCartAction = () => ({
    type: CLEAR_CART
})