import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://otruyenapi.com/v1/api/', // Replace with your API base URL
    timeout: 10000, // Request timeout in milliseconds
    headers: {
        'Content-Type': 'application/json',
        // Add any other custom headers if needed
    },
});

// You can also add interceptors if needed
axiosInstance.interceptors.request.use(
    config => {
        // Modify request config before sending the request
        return config;
    },
    error => {
        // Handle request error
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => {
        // Modify response data before returning it
        return response;
    },
    error => {
        // Handle response error
        return Promise.reject(error);
    }
);

export default axiosInstance;