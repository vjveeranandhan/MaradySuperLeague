import React, {useState} from 'react';
import './Login.css';
import ApiService from '../apiService/apiService';
import Popup from '../PopUp/Popup';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errortext, setErrortext] = useState('');

  const handleChange = (e) => {
    console.log("Change in input data", e.target.value)
    const { name, value } = e.target;
    setFormData(prevState => ({
    ...prevState,
    [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem('token', '');
    try {
      const response = await ApiService.register('/api/user-login/', formData, localStorage['token']);
      setFormData({
        username: "",
        password: "",
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', response.data.user_id);
      window.location.reload();
      window.location.href = '/';

    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrortext(error.response.data.message);
      } else {
        setErrortext('Something went wrong. Please try again later.');
      }
    }
  };

  const handlePopupClose = () => {
    setErrortext('');
  };

  return (
    <div className='main-tag'>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className='login-h2-1'>Login</h2>
          <input type="text" id="username" name="username" placeholder='Email' onChange={handleChange} value={formData.username} required/>
          <input type="password" id="password" name="password"  placeholder='Password' onChange={handleChange} value={formData.password} required/>
          <button type="submit" >Login &rarr;</button>
        </form>
        <a href="/" >Forgotten your password?</a>
        <p>Do not have an TourneyHub ID?<a href="/signup" >Create yours now.</a></p>
      </div>
      {errortext && <Popup message={errortext} onClose={handlePopupClose} />}
    </div>
  );
};

export default LoginForm;
