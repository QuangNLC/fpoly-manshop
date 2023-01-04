import axiosClient from "./axiosClient";

export const authAPI = {
    register: (payload) => {
        const url = 'auth/register';
        return axiosClient.post(url, payload)
    },
    signin: (payload) => {
        const url = 'auth/signin';
        return axiosClient.post(url, payload);
    }
};