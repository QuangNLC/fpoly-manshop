import axiosClient from "./axiosClient";

export const userAPI = {
    getUser: (payload) => {
        const url = 'users?username=' + payload;
        return axiosClient.get(url);
    },
    getAllUser: () => {
        const url = 'users/getall';
        return axiosClient.get(url);
    },
    updateUserActivated: (payload) => {
        const url = `users/update-activated/${payload.username}?activated=${payload.activated}`;
        return axiosClient.put(url);
    },
    createUserByAdm: (payload) => {
        const url = 'users/create-by-adm';
        return axiosClient.post(url, payload)
    },
    updateUserAvatar: (username, formData) => {
        const url = '/users/update-avatar/' + username;
        return axiosClient.post(url, formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );
    },
    setDefaultAddress: (payload) => {
        const url = `users/set-default-address/${payload.username}?addressId=${payload.addressId}`;
        return axiosClient.put(url);
    },
    deleteAddress: (payload) => {
        const url = `users/delete-address/${payload.username}?addressId=${payload.addressId}`;
        return axiosClient.delete(url)
    },
    updateUserInfo: (payload) => {
        const url = 'users/update-info/' + payload.username;
        return axiosClient.put(url, payload);
    },
    changePassword: (username, payload) => {
        const url = 'users/change-password/' + username;
        return axiosClient.post(url, payload);
    }
}