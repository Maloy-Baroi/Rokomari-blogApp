import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './CreateStyle.module.css';
import Swal from 'sweetalert2'

const CreateBlog = () => {
    const [accessToken, setAccessToken] = useState('');
    const navigator = useNavigate()

    const [title, setTitle] = useState("")
    const [short_description, setShorDescription] = useState("")
    const [blog, setBlog] = useState("")

    const SaveBlog = (e) => {
        e.preventDefault()
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Authorization": "Bearer " + accessToken
        }

        let bodyContent = new FormData();
        bodyContent.append("title", title);
        bodyContent.append("short_description", short_description);
        bodyContent.append("blog", blog);

        fetch("http://127.0.0.1:8000/api/curd-operation/blog-create/", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                Swal.fire(
                    'Good job!',
                    response.success,
                    'success'
                )
            })
            .catch(error => console.log(error))

        navigator('/home/')
    }

    useEffect(() => {
        const access = localStorage.getItem('access_token');
        access ? setAccessToken(access) : navigator('/');
    }, [])

    return (
        <div style={{ padding: "10px" }}>
            <button className='btn btn-primary' onClick={() => navigator('/home/')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lightbulb-off-fill" viewBox="0 0 16 16">
                    <path d="M2 6c0-.572.08-1.125.23-1.65l8.558 8.559A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm10.303 4.181L3.818 1.697a6 6 0 0 1 8.484 8.484zM5 14.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5zM2.354 1.646a.5.5 0 1 0-.708.708l12 12a.5.5 0 0 0 .708-.708l-12-12z" />
                </svg> Not Now
            </button>
            <form onSubmit={SaveBlog}>
                <legend className={style.legend}>Write Blog</legend>
                <input className={"form-control " + style.input} placeholder={"Title Of the blog"} value={title} onChange={e => setTitle(() => e.target.value)} />
                <input className={"form-control " + style.input} placeholder={"Short Description"} value={short_description} onChange={e => setShorDescription(() => e.target.value)} />
                <textarea className={"form-control"} placeholder='Start the blog from here' style={{ width: "100%", height: "200px" }} value={blog} onChange={e => setBlog(() => e.target.value)}></textarea>
                <button className={"btn btn-warning text-black mt-4 w-100"} type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-upload" viewBox="0 0 16 16">
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                        <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                    </svg> Save
                </button>
            </form>
        </div>
    )
}

export default CreateBlog
