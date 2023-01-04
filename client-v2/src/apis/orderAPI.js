import axiosClient from "./axiosClient";

export const orderAPI = {
    checkOut: (payload) => {
        const url = 'order/checkout';
        return axiosClient.post(url, payload);
    },
    getAllOrder: () => {
        const url = 'order/getall';
        return axiosClient.get(url);
    },
    getOrderInfo: (id) => {
        const url = 'order/'+id;
        return axiosClient.get(url);
    },
    updateOrderStatus: (payload) => {
        const url='order/update-status/'+ payload.id;
        return axiosClient.put(url, payload);
    },
    updateOrderInfo: (payload) => {
        const url = 'order/update-order-info/'+payload.id;
        return axiosClient.put(url, payload);
    },
    updatePaymentInfo: (payload) => {
        const url = 'order/update-payment-info/'+payload.id;
        return axiosClient.put(url, payload); 
    }


};