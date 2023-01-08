import axiosClient from './axiosClient';

const materialAPI = {
    getAllMate: () => {
        const url = 'material/getall';
        return axiosClient.get(url);
    },
    createMate: (payload) => {
        const url = 'material/create';
        return axiosClient.post(url, payload);
    },
    updateMate: (payload) => {
        const url = 'material/update?materialId='+payload.id;
        return axiosClient.put(url, payload);
    }
}

export default materialAPI;