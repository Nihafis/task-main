import axios from 'axios';
import router from './router';
import { Notify } from 'quasar';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.data === 'Unauthorized' && error.response.status === 402) {
      router.push({
        path: '/login',
        query: { redirect: router.currentRoute.value.fullPath },
      });
      Notify.create({
        color: 'negative',
        message: 'Please login first',
        icon: 'warning',
        position: 'top',
      });
    }
    return Promise.reject(error);
  }
)

export default instance;