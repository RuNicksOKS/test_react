import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginComponent from './components/login/Login';
import SignUpComponent from './components/login/SignUp';
import LoginSucces from './pages/LoginSucces';
import EnitecHome from './pages/EnitecHome';

function App() {
    return(
        <div>
            {/* <HeaderComponent/>
            <NavigationComponent/>
            <h1>My React Login</h1> */}
            <Routes>
                <Route path="/" element={<LoginComponent />} />
                <Route path="/signup" element={<SignUpComponent />} />
                <Route path="/login-success" element={<LoginSucces />} />
                <Route path="/enitec" element={<EnitecHome />} />
            </Routes>
        </div>
    )
}

export default App;