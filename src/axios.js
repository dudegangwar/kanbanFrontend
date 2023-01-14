import axios from 'axios';

axios.defaults.headers.common['Authorization'] = "Bearer "+localStorage.getItem("token")

export const setToken =(token) => {
axios.defaults.headers.common['Authorization'] = "Bearer "+token
}