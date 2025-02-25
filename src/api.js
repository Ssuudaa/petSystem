import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // 后端地址
  timeout: 5000 // 请求超时
});

// 请求拦截器
api.interceptors.request.use(config => {
  console.log('请求发送:', config);
  return config;
}, error => {
  return Promise.reject(error);
});

// 响应拦截器
api.interceptors.response.use(response => {
  return response.data; // 直接返回数据
}, error => {
  console.error('请求错误:', error);
  return Promise.reject(error);
});

export default api;
