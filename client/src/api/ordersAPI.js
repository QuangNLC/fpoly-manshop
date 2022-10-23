import axiosClient from "./axiosClient";

const ordersAPI = {
    getMyOrders: (username) => {
        const url='/order/my-orders?username='+username;
        return axiosClient.get(url);
    },
    getAll: () => {
        const url='/order/all';
        return axiosClient.get(url);
    }
};

export default ordersAPI;