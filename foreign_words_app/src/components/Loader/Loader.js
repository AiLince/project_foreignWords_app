import React from 'react';
import './Loader.css';
import Kitten from '../../assets/images/kitten.gif';

const Loader = () => {
    return (
        <div className="Loader">
            <img src={Kitten} alt="Loading" width="70px" />
            <p>Идёт загрузка. Пожалуйста, подождите</p>
        </div>
    );
};

export default Loader;