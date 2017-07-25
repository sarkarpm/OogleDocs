import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <Link to='/edit/_id_goes_here_'>Edit</Link>
            <Link to='/login'>Logout</Link>
        </div>
    );
};

export default Home;
