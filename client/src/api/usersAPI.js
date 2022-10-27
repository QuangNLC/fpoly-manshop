import axiosClient from "./axiosClient";

const usersAPI = {
    getall: () => {
        const url = '/users/getall';
        return axiosClient.get(url);
    },
    getUser: (username) => {
        const url = '/users?username=' + username;
        return axiosClient.get(url);
    },
    deleteUser: (username) => {
        const url = '/users?username=' + username;
        return axiosClient.delete(url);
    },
    updateUserAvatar: (username, formData) => {
        const url = '/users/update-avatar/' + username;
        return axiosClient.post(url, formData,
            {
                headers: {
                    "content-type": "multipart/form-data"
                }
            }
        );
    }
};

export default usersAPI;