import { ADD_TO_CART, CLEAR_CART, CHANGE_CART_ITEM_QUANTITY, CHANGE_CART_ITEM_SIZE, DELETE_CART_ITEM } from "../types";

export const addToCartAction = (payload) => ({
    type: ADD_TO_CART,
    payload
});

export const clearCartAction = () => ({
    type: CLEAR_CART
})

export const changeCartItemQuantityAction =  (payload)  =>  ({
    type:  CHANGE_CART_ITEM_QUANTITY,
    payload
})

export const changeCartItemSizeAction = (payload) => ({
    type: CHANGE_CART_ITEM_SIZE,
    payload
})

export const deleteCartItemAction = (payload) => ({
    type: DELETE_CART_ITEM,
    payload
})