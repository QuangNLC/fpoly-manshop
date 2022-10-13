import axiosClient from "./axiosClient";

const usersAPI = {
    getall: () => {
        const url = '/users/getall';
        return axiosClient.get(url);
    },
    getUser: (username) => {
        const url = '/users?username='+username;
        return axiosClient.get(url);
    },
    deleteUser: (username) => {
        const url = '/users?username='+username;
        return axiosClient.delete(url);
    }
};

export default usersAPI;