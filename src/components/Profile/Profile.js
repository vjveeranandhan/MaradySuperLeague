import React, { useEffect, useState } from 'react';
import './Profile.css';
import ApiService from '../apiService/apiService';

const Profile = () => {
    const [userdata, setUserData] = useState({});
    const [editstatus, setEditstatus] = useState(true);
    const [errortext, setErrortext] = useState('');

    const handleChange = (e) => {
        const { name, type, files, value } = e.target;
        if (type === 'file') {
            setUserData({
                ...userdata,
                [name]: files[0] // Update state with the file object
            });
        } else {
            setUserData({
                ...userdata,
                [name]: value
            });
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

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchData = async () => {
            try {
                const response = await ApiService.fetch_data('/api/get-user/', token);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setErrortext(error.response?.data?.message || 'Something went wrong. Please try again later.');
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const age = calculateAge(userdata.date_of_birth);

            if (age < 16) {
                setErrortext("Your age should be greater than 16!");
                return;
            }

            const formData = new FormData();
            formData.append('first_name', userdata.first_name);
            formData.append('last_name', userdata.last_name);
            formData.append('email', userdata.email);
            formData.append('date_of_birth', userdata.date_of_birth);
            formData.append('phone', userdata.phone);
            formData.append('age', age);
            formData.append('id', userdata.id);

            if (userdata.profile_picture) {
                formData.append('profile_picture', userdata.profile_picture);
            }

            const token = localStorage.getItem('token');
            const response = await ApiService.updateUserData('/api/update-user/', formData, token);
            setErrortext(response.data.message);

            // Optionally redirect after a delay
            setTimeout(() => window.location.href = '/profile', 2000);

        } catch (error) {
            console.error('Error updating data:', error.response?.data?.message || 'Something went wrong.');
            setErrortext(error.response?.data?.message || 'Something went wrong. Please try again later.');
        }
    };

    return (
        <div className='profile-main-container'>
            <div className='header-container'>
                <h1>Profile</h1>
            </div>
            <div key={userdata.id} className='profile-details-container'>
                {editstatus ? (
                    <div className="profile-details">
                        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                            <img
                                src={userdata.image || 'https://photosking.net/wp-content/uploads/2024/05/no-dp_16.webp'}
                                alt="Profile"
                                style={{ width: '270px', height: '355px', borderRadius: '10%' }}
                            />
                        </div>
                        <h2>{userdata.first_name} {userdata.last_name}</h2>
                        <div style={{ margin: '40px 0 0 0' }}>
                            <p><strong>Email:</strong> <span>{userdata.email}</span></p>
                            <p><strong>Age:</strong> <span>{userdata.age}</span></p>
                            <p><strong>Date of Birth:</strong> <span>{userdata.date_of_birth}</span></p>
                            <p><strong>Phone:</strong> <span>{userdata.phone}</span></p>
                            <p><strong>Current Club:</strong> <span>{userdata.club}</span></p>
                        </div>
                        <div>
                            <button className='edit-button' onClick={() => setEditstatus(false)}>Edit</button>
                        </div>
                    </div>
                ) : (
                    <div className='update-user-component'>
                        <form onSubmit={handleSubmit} className='user-update-form'>
                            <h1>Update Profile</h1>
                            <input
                                id="profile_picture"
                                name="profile_picture"
                                type="file"
                                accept="image/*"
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                id="first_name"
                                name="first_name"
                                placeholder='First name'
                                value={userdata.first_name || ''}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                id="last_name"
                                name="last_name"
                                placeholder='Last name'
                                onChange={handleChange}
                                value={userdata.last_name || ''}
                                required
                            />
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder='Email'
                                onChange={handleChange}
                                value={userdata.email || ''}
                                required
                            />
                            <input
                                type="date"
                                id="date_of_birth"
                                name="date_of_birth"
                                onChange={handleChange}
                                value={userdata.date_of_birth || ''}
                                required
                            />
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                placeholder='Phone'
                                onChange={handleChange}
                                value={userdata.phone || ''}
                                required
                            />
                            <div>
                                <button type="submit" className='update-submit-button'>Save</button>
                                <button
                                    type="button"
                                    className='update-cancel-button'
                                    onClick={() => { window.location.href = '/profile'; }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                        {errortext && <div className='error-message'>{errortext}</div>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
