import axios from 'axios';  
axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';

const apiClient = axios.create({
    baseURL: 'http://107.21.158.38:8000/',
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
      updateUserData(endpoint, data, token) {
        console.log("Inside updateUserData", endpoint);
        const config = {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        };
        return apiClient.put(endpoint, data, config);
    }
};

export default ApiService;