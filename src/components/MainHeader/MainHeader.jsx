import React from 'react';
import { Link } from 'react-router-dom';
import "./MainHeader.css";
const Header = () => {
    return (
        <header>
            <div className="Home">
                <Link to="/">Home</Link>
            </div>


            <div className="face-api">
                <Link to="/faceAPI">Face API</Link>
            </div>
            <div className="face-api">
                <Link to="/faceAPI">Face API</Link>
            </div>
        </header>
    );
};

export default Header;
