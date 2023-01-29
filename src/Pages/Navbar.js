import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigator = useNavigate()
    const [userID, setUserID] = useState() 
    const logout = () => {
        localStorage.removeItem('access_token');
        navigator('/')
    }

    useEffect(() => {
        const user_ID = localStorage.getItem('user_id');
        setUserID(user_ID);
    })
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Blogger</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <button className="nav-link active btn btn-danger text-white" onClick={() => logout()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="White" className="bi bi-power" viewBox="0 0 16 16">
                                        <path d="M7.5 1v7h1V1h-1z" />
                                        <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
                                    </svg> Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
