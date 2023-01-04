import axiosClient from "./axiosClient";

export const userAPI = {
    getUser: (payload) => {
        const url = 'users?username=' + payload;
        return axiosClient.get(url);
    },
    getAllUser: () => {
        const url = 'users/getall';
        return axiosClient.get(url);
    }
}