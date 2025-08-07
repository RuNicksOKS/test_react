import React, { useState, useEffect } from "react";
import NavStyles from "./Navigation.module.css";

import { Link } from 'react-router-dom';
// import Home from './components/Home';
// import About from './components/About';
// import Contact from './components/Contact';

const Navigation: React.FC = () => {
    return(
        //<nav className={styles.container}>
        <div>
            <nav>
            <ul>
                <li className={NavStyles.container}>
                <Link to="/">Home</Link>
                </li>
                <li>
                <Link to="/about">About</Link>
                </li>
                <li>
                <Link to="/contact">Contact</Link>
                </li>
            </ul>
            </nav>

            <hr />

        </div>
    );
};

export default Navigation;