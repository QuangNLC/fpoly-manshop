import axiosClient from "./axiosClient";

const authAPI = {
    signin: (payload) => {
        const url = '/auth/signin';
        return axiosClient.post(url, payload);
    },
    register: (payload) => {
        const url = '/auth/register';
        return axiosClient.post(url, payload)
    }
};

export default authAPI;