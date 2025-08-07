import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const navigate = useNavigate();
    const backendURL = 'http://localhost:8001'; // 디버깅용 포트

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log('회원가입 시도:', { email, pw });
            const response = await axios.post(`${backendURL}/login/signup/`, { email, pw });
            console.log('회원가입 성공:', response.data);
            alert('회원가입이 완료되었습니다.');
            navigate('/');
        } catch (error) {
            console.error('회원가입 실패:', error);
            if (axios.isAxiosError(error)) {
                console.error('에러 응답:', error);
                alert(`회원가입 실패: ${error.message}`);
            } else {
                alert('회원가입에 실패했습니다.');
            }
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
            <Typography variant="h5">회원가입</Typography>
            <form onSubmit={handleSubmit} style={{ width: '300px', marginTop: '16px' }}>
                <TextField
                    label="이메일"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="비밀번호"
                    type="password"
                    value={pw}
                    onChange={e => setPw(e.target.value)}
                    fullWidth
                    required
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>
                    회원가입
                </Button>
            </form>
        </Box>
    );
};

export default SignUp;
