import axiosClient from './axiosClient'

export const addressAPI = {
    createAddress: (payload) => {
        const url = 'address/create-address';
        return axiosClient.post(url, payload);
    } 
}