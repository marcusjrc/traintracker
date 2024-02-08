import axios from 'axios';

export const BASE_URL = 'https://fake-url.com/api/';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});

export const Routes = {
  trains: 'trains',
};
