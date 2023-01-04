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
    }
};