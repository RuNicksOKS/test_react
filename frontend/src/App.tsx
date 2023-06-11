import React from 'react';
import { useState } from 'react';
import axios from 'axios';

function App() {
    const backendURL = 'http://localhost:8000';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Django 서버에 로그인 요청 보내기
        axios.post(`${backendURL}/login/`, { email, password })
        .then(response => {
            // 로그인 성공 처리
            console.log(response.data.message);
        })
        .catch(error => {
            // 로그인 실패 처리
            console.error(error);
        });
    };
 
    return(
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <button type="submit">Login</button>
        </form>
    )
}

export default App;
