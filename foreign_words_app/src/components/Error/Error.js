import React from 'react';
import './Error.css';

const Error = ({ message }) => {
    return (
        <div className="Error">
            <p>{message}</p>
        </div>
    );
};

export default Error;