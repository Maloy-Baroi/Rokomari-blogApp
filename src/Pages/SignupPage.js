import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './LoginPage.module.css';
import Swal from 'sweetalert2'

function SignupPage() {
    const [full_name, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigator = useNavigate();


    const handleSubmit = e => {
        e.preventDefault();

        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)"
        }

        let bodyContent = new FormData();
        bodyContent.append("full_name", full_name);
        bodyContent.append("email", email);
        if (!email) {
            setError('Please enter a email');
        } else {
            fetch("http://127.0.0.1:8000/api/auth/signup/", {
                method: "POST",
                body: bodyContent,
                headers: headersList
            })
                .then(response => response.json())
                .then(response => {
                    if (!response.success) {
                        Swal.fire(
                            'Sorry, Something wrong!',
                            'Error!!!', 
                            'error',
                        )
                    }
                    else {
                        Swal.fire(
                            'Good job!',
                            response.success,
                            'success'
                        )
                        navigator('/')
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    };

    return (
        <div>
            <div className={"container " + style.full_body}>
            <h1 className={style.h1}>Signup</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="full_name">Full Name</label>
                    <input
                        type="text"
                        id="full_name"
                        value={full_name}
                        onChange={e => setFullName(e.target.value)}
                        className="form-control"
                        placeholder='Full Name'
                        required={false}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input 
                        type="email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="form-control"
                        placeholder='Email *'
                        required={true}
                    />
                </div>
                <button className="btn btn-outline-danger w-50 mt-5 text-white">Submit</button>
                <br />
                <span className="btn btn-outline-success w-25 mt-5 text-white" onClick={() => navigator('/')}>Login</span>
            </form>
        </div>
        </div>
    );
}

export default SignupPage;
