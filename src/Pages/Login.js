import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './LoginPage.module.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigator = useNavigate();


    const handleSubmit = e => {
        e.preventDefault();

        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)"
        }

        let bodyContent = new FormData();
        bodyContent.append("email", email);
        bodyContent.append("password", password);
        if (!email || !password) {
            setError('Please enter a email and password');
        } else {
            fetch("http://127.0.0.1:8000/api/auth/login/token/", {
                method: "POST",
                body: bodyContent,
                headers: headersList
            })
                .then(response => response.json())
                .then(response => {
                    localStorage.setItem('access_token', response.access_token);
                    localStorage.setItem('user_id', response.userID);
                    navigator('/home/')
                })
                .catch(error => {
                    console.log(error)
                })
        }
    };

    return (
        <div>
            <div className={"container " + style.full_body}>
            <h1 className={style.h1}>Login</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="form-control"
                        placeholder='Email'
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="form-control"
                        placeholder='Password'
                    />
                </div>
                <button className="btn btn-outline-danger w-50 mt-5 text-white">Login</button>
                <br />
                <button className="btn btn-outline-success w-25 mt-5 text-white" onClick={() => navigator('/signup/')}>Signup</button>
            </form>
        </div>
        </div>
    );
}

export default LoginPage;
