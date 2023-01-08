import axiosClient from "./axiosClient";

export const productAPI = {
    getAllPr: () => {
        const url = 'product/getall';
        return axiosClient.get(url);
    },
    getFilterInfo: () => {
        const url = 'product/get/filter/info';
        return axiosClient.get(url);
    },
    getProductById: (id) => {
        const url = 'product/'+id;
        return axiosClient.get(url);
    },
    createProduct: (payload) => {
        const url = 'product/create';
        return axiosClient.post(url, payload);
    },
    createProductSize: (payload) => {
        const url = 'product/create-size/'+payload.id;
        return axiosClient.post(url, payload);
    },
    updateProduct: (payload) => {
        const url = 'product/update/'+payload.id;
        return axiosClient.put(url, payload);
    }
};