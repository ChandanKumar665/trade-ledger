import axios from 'axios';
import { API_HOST } from '../config';

const api = axios.create({
    baseURL: API_HOST,
    withCredentials: true
});

export default api;