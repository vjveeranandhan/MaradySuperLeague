import ApiService from '../apiService/apiService';

const Logout = async () => {
  try {
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user');

    console.log('Token', token);
    console.log('user_id', user_id);

    if (token) {
        const response = await ApiService.logout('/api/user-logout/', token);
        console.log('Successful API response:', response.data);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
    }
    else{
        window.location.href = '/';
    }
    return null;
    } catch (error) {
    console.error('Error fetching data:', error);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  }
};

export default Logout;
