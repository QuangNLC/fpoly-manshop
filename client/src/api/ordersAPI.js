import axiosClient from "./axiosClient";

const ordersAPI = {
    getMyOrders: (username) => {
        const url='/order/my-orders?username='+username;
        return axiosClient.get(url);
    },
    getAll: () => {
        const url='/order/all';
        return axiosClient.get(url);
    },
    getAllOrderStatus: () => {
        const url='/order/status-info';
        return axiosClient.get(url);
    },
    updateOrderStatus: (payload) => {
        const url='/order/update/'+ payload.id;
        return axiosClient.put(url, payload);
    },
    getOrderNotiList: () => {
        const url = 'order/order-noti';
        return axiosClient.get(url);
    },
    seenNotiByAdm: () => {
        const url = 'order/seen-noti';
        return axiosClient.get(url);
    },
    getOrderInfo: (id) => {
        const url = 'order/'+id;
        return axiosClient.get(url);
    },
    getWatingOrderList: () => {
        const url = 'order/wating-order';
        return axiosClient.get(url);
    }
};

export default ordersAPI;