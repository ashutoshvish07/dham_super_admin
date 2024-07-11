
import axios from 'axios';

const Axios = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL || '',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

Axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

Axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized, redirecting to login...');
        }
        return Promise.reject(error);
    }
);

export default Axios;
