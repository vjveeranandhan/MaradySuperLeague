import axios from 'axios';  
axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const ApiService = {
  register(endpoint, data, token) {
    if (token){
      apiClient.defaults.headers.common['Authorization'] = `Token ${token}`;
      console.log("Inside login Authorization", endpoint)
      return apiClient.post(endpoint, data);
      }
    else{
      console.log("Inside login", endpoint)
      return apiClient.post(endpoint, data);
      }
      },
  fetch_data(endpoint, token){
    if (token){
      apiClient.defaults.headers.common['Authorization'] = `Token ${token}`;
      return apiClient.get(endpoint);
      }
    else{
      console.log("Inside login", endpoint)
      return apiClient.post(endpoint);
      }
      },
  updateUserData(endpoint, data, token){
    console.log("Inside updateUserData", endpoint)
    if (token){
      apiClient.defaults.headers.common['Authorization'] = `Token ${token}`;
      return apiClient.put(endpoint, data);
      }
    else{
      console.log("Inside updateUserData", endpoint)
      return apiClient.post(endpoint);
      }
      }
};

export default ApiService;