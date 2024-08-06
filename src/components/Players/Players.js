import React, { useEffect, useState } from 'react'
import './Players.css'
import ApiService from '../apiService/apiService';


const Players = () => {
    const [userdata, setUserData] = useState({});
    const [errortext, setErrortext] = useState('');
    // const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await ApiService.fetch_data('/api/get-all-user/', token);
            console.log("API response data:", response.data);
            if (Array.isArray(response.data)) {
                setUserData(response.data);
            } else if (response.data) {
                setUserData([response.data]);
            } else {
                console.error('Unexpected data format:', response.data);
                setErrortext('Unexpected data format.');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setErrortext(error.response?.data?.message || 'Something went wrong. Please try again later.');
        }
    }

    // const getUsers = async () => {
    //     const token = localStorage.getItem('token');
    //     try {
    //         const response = await ApiService.fetch_data('/api/get-user/', token);
    //         setUserData(response.data);
    //         console.log("userdata", userdata)
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //         setErrortext(error.response?.data?.message || 'Something went wrong. Please try again later.');
    //     }
    //     const response = await fetch("https://api.github.com/users");
    //     const FinalData = await response.json();
    //     setUsers(FinalData)
    // }

    useEffect(() => {
        getUsers();
    }, [])
    return (
        <div className="container">
            {Array.isArray(userdata) && userdata.length > 0 ? (
                userdata.map((curElem) => (
                    <div className="card_item" key={curElem.id}>
                        <div className="card_inner">
                            <img src={curElem.image || 'https://photosnow.org/wp-content/uploads/2024/04/no-dp-mood-off_9.jpg'} alt="User" />
                            <div className="userName">{curElem.first_name} {curElem.last_name}</div>
                            <div className="detail-box">
                                <div className="gitDetail"><span>Articles</span>23</div>
                                <div className="gitDetail"><span>Following</span>45</div>
                                <div className="gitDetail"><span>Followers</span>11</div>
                            </div>
                            <button className="seeMore">See More</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>{errortext || 'No users found'}</p>
            )}
        </div>
    );
    // return (
    //         <div className="container">
    //             {
    //                 users.map((curElem) => {
    //                     return (
    //                         <div className="card_item" key={curElem.id}>
    //                             <div className="card_inner">
    //                                 <img src={curElem.avatar_url} alt=""/>
    //                                 <div className="userName">{curElem.login}</div>
    //                                 {/* <div className="userUrl">{curElem.url}</div> */}
    //                                 <div className="detail-box">
    //                                     <div className="gitDetail"><span>Articles</span>23</div>
    //                                     <div className="gitDetail"><span>Following</span>45</div>
    //                                     <div className="gitDetail"><span>Followers</span>11</div>
    //                                 </div>
    //                                 <button className="seeMore">See More</button>
    //                             </div>
    //                         </div>
    //                     )
    //                 })
    //             }
    //         </div>
    // )
}

export default Players;