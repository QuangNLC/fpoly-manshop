import { CREATE_WAITING_ORDER, DELETE_WAITING_ORDER, UPDATE_WAITING_ORDER_DETAIL, UPDATE_WAITING_ORDER_USER } from "../types";
const data = localStorage.getItem("WTORDER");
const initialState = {
    list : data ? [...JSON.parse(data).list] : []
};

const WaitingOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case(CREATE_WAITING_ORDER):{
            state.list.push(action.payload)
            localStorage.setItem("WTORDER", JSON.stringify(state));
            return {...state};
        }
        case(DELETE_WAITING_ORDER):{
            let index = state.list.findIndex(item => item.id === action.payload.id)
            let newList = [...state.list]
            if(index !== -1){
                state.list.splice(index, 1)
            }
            localStorage.setItem("WTORDER", JSON.stringify(state));
            return {...state};
        }
        case(UPDATE_WAITING_ORDER_DETAIL): {
            let index = state.list.findIndex(item => item.id === action.payload.id)
            if(index !== -1){
                state.list[index].orderDetail = [...action.payload.orderDetail]
            }
            localStorage.setItem("WTORDER", JSON.stringify(state));
            return {...state}
        }
        case(UPDATE_WAITING_ORDER_USER): {
            let index = state.list.findIndex(item => item.id === action.payload.id)
            if(index !== -1){
                state.list[index].users = {...action.payload.users}
            }
            localStorage.setItem("WTORDER", JSON.stringify(state));
            return {...state}
        }
        default: {
            return state;
        }
    }
};


export default WaitingOrderReducer;

