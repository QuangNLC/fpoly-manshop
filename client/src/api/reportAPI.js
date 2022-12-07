import axiosClient from "./axiosClient";

const reportAPI = {
    getChartData: (payload) => {
        const url = 'report/turnover/' + payload;
        return axiosClient.get(url);
    }
};

export default reportAPI;