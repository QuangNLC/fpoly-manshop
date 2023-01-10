import axiosClient from "./axiosClient";

const promotionAPI = {
    getAll: () => {
        const url = 'promotions/all';
        return axiosClient.get(url);
    },
    createPromotion: (payload) => {
        const url ='promotions/create';
        return axiosClient.post(url, payload);
    },
    getProductNotExist: () => {
        const url = 'promotions/product-to-promotions';
        return axiosClient.get(url);
    },
    getPromotionDetail: (id) => {
        const url = 'promotions/' + id;
        return axiosClient.get(url);
    },
    updatePromotion: (payload) => {
        const url = 'promotions/updatepromotion/' + payload.id;
        return axiosClient.put(url, payload);
    }
};

export default promotionAPI;