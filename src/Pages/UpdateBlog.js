import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import style from './CreateStyle.module.css';
import Swal from 'sweetalert2'

const UpdateBlog = (props) => {
    const params = useParams()
    const [accessToken, setAccessToken] = useState('');
    const navigator = useNavigate()

    const [title, setTitle] = useState("")
    const [short_description, setShorDescription] = useState("")
    const [blog, setBlog] = useState("")
    const [authorID, setAuthorID] = useState("")
    const [userID, setUserID] = useState();
    const [blogID, setBlogID] = useState("")

    const loadData = (access_token) => {
        let headersList = {
            "Accept": "*/*",
            "Authorization": "Bearer " + access_token,
        }

        fetch("http://127.0.0.1:8000/api/curd-operation/blog-details/" + params.id + "/", {
            method: "GET",
            headers: headersList
        })
            .then(response => response.json())
            .then(response => {
                setAuthorID(response.author)
                setBlogID(response.id)
                setTitle(response.title)
                setShorDescription(response.short_description)
                setBlog(response.blog)
                if (localStorage.getItem('user_id') !== response.author) {
                    alert("You are trying to do unauthorized activity. Please Login again.")
                    localStorage.removeItem('user_id');
                    localStorage.removeItem('access_token');
                    navigator('/');
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    const SaveBlog = (e) => {
        e.preventDefault()
        let headersList = {
            "Accept": "*/*",
            "Authorization": "Bearer " + accessToken
        }

        let bodyContent = new FormData();
        bodyContent.append("title", title);
        bodyContent.append("short_description", short_description);
        bodyContent.append("blog", blog);

        fetch(`http://127.0.0.1:8000/api/curd-operation/blog-update/${blogID}/`, {
            method: "PUT",
            body: bodyContent,
            headers: headersList
        })
            .then(response => response.json())
            .then(response => {
                if (!response.detail) {
                    Swal.fire(
                        'Good job!',
                        "Updated Successfully !!!",
                        'success'
                    )
                }
                else {
                }
                navigator('/home/')
            })
            .catch(error => console.log(error))
    }

    const checkUser = () => {
        if (parseInt(authorID) !== parseInt(userID)) {
            localStorage.removeItem('user_id');
            localStorage.removeItem('access_token');
            navigator('/');
        }
    }

    useEffect(() => {
        const access = localStorage.getItem('access_token');
        access ? setAccessToken(access) : navigator('/');
        const user_id = localStorage.getItem('user_id');
        user_id ? setUserID(user_id) : navigator('/')
        loadData(access)
    }, [])

    return (
        <div style={{ padding: "10px" }}>
            {authorID == userID ?
                <div>
                    <button className='btn btn-primary' onClick={() => navigator('/home/')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-90deg-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z" />
                        </svg> No Need to Update
                    </button>
                    <form onSubmit={SaveBlog}>
                        <legend className={style.legend}>Write Blog</legend>
                        <input className={"form-control " + style.input} placeholder={"Title Of the blog"} value={title} onChange={e => setTitle(() => e.target.value)} />
                        <input className={"form-control " + style.input} placeholder={"Short Description"} value={short_description} onChange={e => setShorDescription(() => e.target.value)} />
                        <textarea className={"form-control"} placeholder='Start the blog from here' style={{ width: "100%", height: "200px" }} value={blog} onChange={e => setBlog(() => e.target.value)}></textarea>
                        <button className={"btn btn-outline-success mt-4 w-100"} type="submit">Save</button>
                    </form>
                </div>
                :
                <div>
                    <h1>You are unauthorized to update the blog.</h1>
                    <h5>Because of doing unauthorized activity you have to login again.</h5>
                    <button onClick={() => {
                        checkUser()
                    }} className="btn btn-warning">Go Back To Login Page</button>
                </div>
            }
        </div>
    )
}

export default UpdateBlog
