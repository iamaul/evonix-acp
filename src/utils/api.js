import axios from 'axios';

const api = axios.create({ 
    baseURL: 'https://evonix-backend-api-old.vercel.app/', 
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
