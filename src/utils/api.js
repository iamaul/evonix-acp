import axios from 'axios';

export default axios.create({ 
    baseURL: 'https://dev.evonix-rp.com/', 
    headers: {
        'Content-Type': 'application/json'
    }
});