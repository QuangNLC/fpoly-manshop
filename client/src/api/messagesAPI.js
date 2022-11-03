import axiosClient from "./axiosClient";

const messagesAPI = {
    getPrivateMessages: (username) => {
        const url = '/messages/my-private/'+username;
        return axiosClient.get(url);
    },
    sendPrivateMessagesToAdm: (username, payload) => {
        const url = '/messages/user/send-private/'+username;
        return axiosClient.post(url, payload);
            
    }
}

export default messagesAPI