import axios from 'axios';

const feeAxiosClient = axios.create({
    baseURL: "https://online-gateway.ghn.vn/shiip/public-api/"
});

feeAxiosClient.interceptors.request.use((config) => {
    config.headers = {
        'token': `e31fbcda-7469-11ed-bcba-eac62dba9bd9`
    }
    return config;
});

const ghnFeeAPI = {
    getCityData: () => {
        const url = 'master-data/province';
        return feeAxiosClient.get(url);
    },
    getDistrictData: (payload) => {
        const url = 'master-data/district';
        return feeAxiosClient.post(url, payload);
    },
    getWardData: (payload) => {
        const url = 'master-data/ward';
        return feeAxiosClient.post(url, payload);
    },
    getShipTypes: (payload) => {
        const url = 'v2/shipping-order/available-services';
        return feeAxiosClient.post(url, payload);
    },
    getShippingFee: (payload) => {
        const url = 'v2/shipping-order/fee';
        return feeAxiosClient.post(url, payload);
    },
    getShipTime: (payload) => {
        const url = 'v2/shipping-order/leadtime';
        return feeAxiosClient.post(url, payload);
    }
};


export default ghnFeeAPI;