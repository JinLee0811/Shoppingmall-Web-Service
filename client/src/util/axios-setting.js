import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_ADDRESS,
});
const token = localStorage.getItem('jwt');

instance.defaults.headers.common['Authorization'] = token
  ? `Bearer ${token}`
  : null;
export default instance;
