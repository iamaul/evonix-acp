import axios from 'axios';

export default axios.create({ 
    baseURL: 'https://server.evonix-rp.com/', 
    headers: {
        'Content-Type': 'application/json'
    }
});