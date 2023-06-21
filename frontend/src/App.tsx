import React from 'react';
import { useState } from 'react';
import axios from 'axios';

function App() {
    const backendURL = 'http://localhost:8000';

    // Axios 인스턴스 생성
    const axiosInstance = axios.create({
        baseURL: backendURL,  // Django 백엔드의 URL에 맞게 설정
        withCredentials: true,  // CSRF 쿠키를 전송하기 위해 withCredentials를 true로 설정
      });

      
    // 요청 전에 CSRF 토큰을 포함시킴
    axiosInstance.interceptors.request.use((config) => {
        const csrfToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)csrftoken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
        );
        config.headers['X-CSRFToken'] = csrfToken;
        return config;
    });

    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log(email);  // 이 부분 추가
        console.log(pw);  // 이 부분 추가
        
        // Django 서버에 로그인 요청 보내기
        axiosInstance.post(
            `${backendURL}/login/process/`, 
            { email: email, pw: pw }, 
            { withCredentials: true }
        )
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
                <input type="pw" value={pw} onChange={e => setPw(e.target.value)} />
            </label>
            <button type="submit">Login</button>
        </form>
    )
}

export default App;
