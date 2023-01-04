import { CREATE_WAITING_ORDER, DELETE_WAITING_ORDER, UPDATE_WAITING_ORDER_DETAIL, UPDATE_WAITING_ORDER_USER } from "../types";

export const createWaitingOrderAction = (payload) => ({
    type: CREATE_WAITING_ORDER,
    payload
});

export const deleteWaitingOrderAction = (payload) => ({
    type: DELETE_WAITING_ORDER,
    payload
})

export const updateWaitingOrderDetailAction = (payload) => ({
    type: UPDATE_WAITING_ORDER_DETAIL,
    payload
})

export const updateWaitingOrderUserAction = (payload) => ({
    type: UPDATE_WAITING_ORDER_USER,
    payload
})