import { ADD_TO_CART, DELETE_CART_ITEM, CHANGE_CART_ITEM_QUANTITY, CLEAR_CART } from "../types";
const data = localStorage.getItem("CART");

const initialState = {
    cart: data ? [...JSON.parse(data).cart] : []
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case (ADD_TO_CART): {
            console.log(action.payload)
            let index = checkItemByProductIdAndSize(state.cart, action.payload.product.id, action.payload.size.size.title);
            if (index == -1) {
                state.cart.push(action.payload);
            } else {
                state.cart[index].quantity += action.payload.quantity;
            };
            localStorage.setItem("CART", JSON.stringify(state));
            console.log(state)
            return {
                ...state
            }
        }
        case (DELETE_CART_ITEM): {
            let index = checkItemByProductIdAndSize(state.cart, action.payload.product.id, action.payload.size.size.title);
            if (index == -1) {
            } else {
                state.cart.splice(index, 1);
            }
            localStorage.setItem("CART", JSON.stringify(state));
            return {
                ...state
            }
        }
        case(CHANGE_CART_ITEM_QUANTITY): {
            let index = checkItemByProductIdAndSize(state.cart, action.payload.product.id, action.payload.size.size.title);
            if(index == -1){

            }else{
                state.cart[index].quantity = action.payload.quantity;
            }
            localStorage.setItem("CART", JSON.stringify(state));
            return {
                ...state
            }
        }
        case(CLEAR_CART):{
            state.cart = []
            localStorage.setItem("CART", JSON.stringify(state));
            return({
                ...state
            });
        }
        default: {
            return state;
        }
    }
};

const checkItemByProductIdAndSize = (arr, id, size) => {
    let result = -1;

    arr.forEach((item, index) => {
        if (item.product.id === id && item.size.size.title === size) {
            result = index;
        };
    });

    return result;
}

export default cartReducer;

