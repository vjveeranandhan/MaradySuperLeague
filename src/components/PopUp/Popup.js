import React from 'react';
import './Popup.css'

const Popup = ({ message, onClose }) => {
    const toggleModal = () => {
        onClose();
    };

    return (
        <>
        <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content">
                <button className="close-modal" onClick={toggleModal}>
                    X
                </button>
                <p style={{color:'black'}}>{message}</p>
            </div>
        </div>
        </>
    );
};

export default Popup