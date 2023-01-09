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
        const url = 'product/' + id;
        return axiosClient.get(url);
    },
    createProduct: (payload) => {
        const url = 'product/create';
        return axiosClient.post(url, payload);
    },
    createProductSize: (payload) => {
        const url = 'product/create-size/' + payload.id;
        return axiosClient.post(url, payload);
    },
    updateProduct: (payload) => {
        const url = 'product/update/' + payload.id;
        return axiosClient.put(url, payload);
    },
    uploadProductImage: (payload) => {
        const url = "product/upload-image/" + payload.id;
        return axiosClient.post(url, payload.formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
    deleteProductImage: (payload) => {
        const url = 'product/delete-image/'+payload.id;
        return axiosClient.post(url, payload);
    },
    setDefaultImage: (payload) => {
        const url = 'product/set-default-img/'+payload.id;
        return axiosClient.put(url, payload);
    },
    updateProductSize: (payload) => {
        const url = 'product/update-size/'+payload.id;
        return axiosClient.put(url, payload);
    },
    deleteProductSize: (payload) => {
        const url = 'product/delete-size/'+payload.id;
        return axiosClient.delete(url);
    }
};