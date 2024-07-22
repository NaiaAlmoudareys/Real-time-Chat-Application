import axios from 'axios';

const API_URL = 'http://localhost:5000/api/messages';

export const getMessages = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/:userId`, {
        headers: { 'x-auth-token': token },
    });
    return response.data;
};

export const sendMessage = async (message) => {
    const token = localStorage.getItem('token');
    await axios.post(API_URL, message, {
        headers: { 'x-auth-token': token },
    });
};
