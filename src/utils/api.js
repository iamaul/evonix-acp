import axios from 'axios';

const api = axios.create({ 
    baseURL: 'https://dev.evonix-rp.com/', 
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;