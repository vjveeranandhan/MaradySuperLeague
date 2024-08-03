import React, { useState } from 'react';
import './Signup.css';
import ApiService from '../apiService/apiService';
import Popup from '../PopUp/Popup';
// import axios from 'axios';

const Signup = () => {
    const [errortext, setErrortext] = useState('');
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        date_of_birth: '',
        phone: '',
        password: '',
        confirm_password: '',
        age:''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (name === 'date_of_birth') {
            const age = calculateAge(value);
            setFormData(prevState => ({
                ...prevState,
                age: age
            }));
        }
    };

    const calculateAge = (dateOfBirth) => {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };

    const isValidPhoneNumber = (phoneNumber) => {
      const cleaned = phoneNumber.replace(/\D/g, '');
      const isValid = cleaned.length === 10;
  
      return isValid;
    };


    const handleSubmit = async (e) => {
        e.preventDefault(); 
        console.log(formData)

        try {
            if (re.test(formData['email']) === false) {
                setErrortext("Invalid Email!");
                return; 
            }

            if (formData.age < 16) {
                setErrortext("Your age should be greater than 16!");
                return; 
            }
            
            if (!isValidPhoneNumber(formData.phone)) {
              setErrortext("Invalid Phone!");
              return; 
            }

            if (formData['password'] !== formData['confirm_password']) {
                setErrortext("Passwords don't match!");
                return; 
            }

            const response = await ApiService.register('/api/create-user/', formData);
            console.log('Successful API response:', response.data);

            setFormData({
                first_name: '',
                last_name: '',
                email: '',
                date_of_birth: '',
                phone: '',
                password: '',
                confirm_password: '',
                age: ''
            });
            setErrortext('Signup successful!');
            setTimeout(() => {
                window.location.href = '/login';
              }, 2000);
        } catch (error) {
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
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2 className='signup-h2-1'>Create your Account</h2>
                <input type="text" id="first_name" name="first_name" placeholder='First name' onChange={handleChange} value={formData.first_name} required />
                <input type="text" id="last_name" name="last_name" placeholder='Last name' onChange={handleChange} value={formData.last_name} required />
                <input type="text" id="email" name="email" placeholder='Email' onChange={handleChange} value={formData.email} required />
                <input type="date" id="date_of_birth" name="date_of_birth" placeholder='Date of birth' onChange={handleChange} value={formData.date_of_birth} required />
                <input type="text" id="phone" name="phone" placeholder='Phone' onChange={handleChange} value={formData.phone} required />
                <input type="password" id="password" name="password" placeholder='Password' onChange={handleChange} value={formData.password} required />
                <input type="password" id="confirm_password" name="confirm_password" placeholder='Confirm Password' value={formData.confirm_password} onChange={handleChange} />
                <button type="submit">Signup &rarr;</button>
            </form>
            <a href="/">Forgotten your password?</a>
            <p>Have account?<a href="/login">Login.</a></p>
            {errortext && <Popup message={errortext} onClose={handlePopupClose} />}
        </div>
    );
};

export default Signup;
