import React from 'react';
import HeaderComponent from './components/header/Header';
import NavigationComponent from './components/navigation/Navigation';
import LoginComponent from './components/login/Login';
import AsdfComponent from './components/login/asdf';
//import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

function App() {
 
    return(
        <div>
            <HeaderComponent/>
            <NavigationComponent/>
            <h1>My React Login</h1>
            <LoginComponent/>
            <AsdfComponent/>
        </div>
    )
}

export default App;