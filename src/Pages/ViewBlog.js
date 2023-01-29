import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import style from './CreateStyle.module.css';

const ViewBlog = (props) => {
    const params = useParams()
    const [accessToken, setAccessToken] = useState('');
    const navigator = useNavigate()

    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [short_description, setShorDescription] = useState("")
    const [blog, setBlog] = useState("")
    const [refresh, setRefresh] = useState(false);

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
                setTitle(response.title)
                setShorDescription(response.short_description)
                setBlog(response.blog)
                setAuthor(response.get_author_name)
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        const access = localStorage.getItem('access_token');
        access ? setAccessToken(access) : navigator('/');
        loadData(access)
    }, [])

    return (
        <div style={{ padding: "10px" }}>
            <button className='btn btn-primary' onClick={() => navigator('/home/')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-90deg-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z" />
                </svg> পড়া শেষ
            </button>
            <br />
            <div style={{ textAlign: "center", marginTop: "30px" }}>
                <h1>{title}</h1>
                <span>{author}</span>
            </div>
            <div>
                <article>
                    {blog}
                </article>
            </div>
        </div>
    )
}

export default ViewBlog
