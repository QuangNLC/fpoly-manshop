import axiosClient from './axiosClient';

const colorAPI = {
    getAllColor: () => {
        const url = 'color/getall';
        return axiosClient.get(url);
    },
    createColor: (payload) => {
        const url = 'color/create';
        return axiosClient.post(url, payload);
    },
    updateColor: (payload) => {
        const url = 'color/update?colorId='+payload.id;
        return axiosClient.put(url, payload);
    }
}

export default colorAPI;