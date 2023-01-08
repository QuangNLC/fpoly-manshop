import axiosClient from './axiosClient';

const categoryAPI = {
    getAllCate: () => {
        const url = 'category/getall';
        return axiosClient.get(url);
    },
    createCate: (payload) => {
        const url = 'category/create';
        return axiosClient.post(url, payload);
    },
    updateCate: (payload) => {
        const url = 'category/update?categoryId='+payload.id;
        return axiosClient.put(url, payload);
    }
} 

export default categoryAPI;