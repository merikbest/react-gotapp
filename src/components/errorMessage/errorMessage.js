import React from "react";
import './errorMessage.css';
import img from './error.jpg';

const ErrorMessage = () => {
    return (
        <>
            <img src={img} alt="error"/>
            <span>Something going wrong</span>
        </>
    )
}

export default ErrorMessage;