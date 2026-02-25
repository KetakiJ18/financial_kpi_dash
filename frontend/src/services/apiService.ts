import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const uploadFiles = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));

    const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const fetchInsights = async () => {
    const response = await axios.get(`${API_BASE_URL}/insights`);
    return response.data;
};
