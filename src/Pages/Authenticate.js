import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const Authenticate = () => {
    let { token } = useParams()

    const [password, setPassword] = useState('');
    const navigator = useNavigate()

    const seePassword = () => {
        let writtenPassword = document.getElementById("password");
        if(writtenPassword.type === 'password') {
            writtenPassword.type = 'text'
        }
        else {
            writtenPassword.type = 'password'
        }
    }

    const verifyUser = (e) => {
        e.preventDefault()
        fetch('http://127.0.0.1:8000/api/auth/verify-email/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "password": password,
                "auth_token": token,
            })
        })
        .then(response => response.json())
            .then(response => {
                if (response.success) {
                    Swal.fire(
                        'Good job!',
                        response.success,
                        'success'
                    )
                    navigator('/')
                }
                else if(response.verified) {
                    Swal.fire(
                        'Sorry, You are already verified! We are taking you to login page.',
                        'Error!!!',
                        'error',
                    )
                    navigator('/')
                }
                else {
                    Swal.fire(
                        'Sorry, Something wrong!',
                        'Error!!!',
                        'error',
                    )
                }
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                  })
            })
    }

    return (
        <div>
            <form>
                <div className="form-group">
                    <label htmlFor="password">Set Your Password *</label>
                    <input 
                        type="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="form-control"
                        placeholder='Password'
                        required={true}
                    />
                    <p><input type={"checkbox"} onClick={() => seePassword()} className="mt-3" /> See Password</p>
                </div>
                <div className='text-center'><button type='submit' className="btn btn-outline-danger w-50 mt-2 text-white" onClick={verifyUser}>Set Password</button></div>
                <br />
            </form>
        </div>
    )
}

export default Authenticate
