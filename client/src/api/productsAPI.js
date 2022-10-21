import axiosClient from './axiosClient';

const productAPI = {
    getProduct: (id) => {
        const url = '/product/' + id;
        return axiosClient.get(url);
    },
    getAll: (cate, page, limit) => {
        let url = '/product'
        if (cate) {
            url = url + '/category/' + cate;
            if (page) {
                url = url + '/' + page;
                if (limit) {
                    url = url + '/' + limit;
                };
            };
        } else if (page) {
            url = url + '/' + page;
            if (limit) {
                url = url + '/' + limit;
            };
        }else{
            url = url + '/getall';
        }


        return axiosClient.get(url);
    },
    getFilterInfo: () => {
        const url = '/product/get/filter/info';
        return axiosClient.get(url);
    },
    getAllCategory: () => {
        const url = '/category/getall';
        return axiosClient.get(url);
    },
    createCategory: (payload) => {
        const url = '/category/create';
        return axiosClient.post(url, payload);   
    },
    getCategoryDetails: (id) => {
        const url = '/category/details?categoryId='+id;
        return axiosClient.get(url);
    },
    deleteCategory: (id) => {
        const url = '/category?categoryId='+id;
        return axiosClient.delete(url);
    },
    updateCategoryDetails: (payload) => {
        const url = 'category/update?categoryId='+payload.id;
        return axiosClient.put(url, payload);
    }
};

export default productAPI;