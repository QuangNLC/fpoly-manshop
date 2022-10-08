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
    }
};

export default productAPI;