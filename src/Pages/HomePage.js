import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import style from './Home.module.css'
import Swal from 'sweetalert2'
import Navbar from './Navbar';

const HomePage = () => {
    const [accessToken, setAccessToken] = useState('');
    const [listOfBlog, setListOfBlog] = useState([]);
    const navigator = useNavigate();
    const [userID, setUserID] = useState();
    const [refresh, setRefresh] = useState(false);


    const DeletePost = (blogID) => {
        let headersList = {
            "Accept": "*/*",
            "Authorization": "Bearer " + accessToken,
        }

        fetch("http://127.0.0.1:8000/api/curd-operation/blog-delete/" + blogID + "/", {
            method: "DELETE",
            headers: headersList
        })
            .catch(error => {
                console.log(error)
            })
        Swal.fire({
            icon: 'error',
            title: 'Deleted',
            text: 'Deleted Successfully',
        })

        setRefresh(!refresh)
    }

    useEffect(() => {
        const access = localStorage.getItem('access_token');
        access ? setAccessToken(access) : navigator('/');
        const user_id = localStorage.getItem('user_id');
        user_id ? setUserID(user_id) : navigator('/')
        loadData(access);
    }, [refresh])

    const loadData = async (access_token) => {
        let headersList = {
            "Accept": "*/*",
            "Authorization": "Bearer " + access_token,
        }

        await fetch("http://127.0.0.1:8000/api/curd-operation/blog-list/", {
            method: "GET",
            headers: headersList
        })
            .then(response => response.json())
            .then(response => {
                setListOfBlog(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        accessToken ?
            listOfBlog ?
                <div style={{
                    textAlign: "center",
                    marginTop: "20px"
                }}>
                    <Navbar />
                    <button className={"btn btn-success"} onClick={() => navigator('/create-blog/')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                        </svg> Create New Blog
                    </button>
                    {
                        listOfBlog.map(blog => (
                            <div className="card p-3 m-3" key={blog.id}>
                                <div className="card-body">
                                    <h5 className="card-title">{blog.title}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{blog.get_author_name}</h6>
                                    <p className="card-text">{blog.short_description}</p>
                                    <div>
                                        <button className="card-link btn btn-success" onClick={() => navigator('/view-blog/' + blog.id + '/')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-paper-fill" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M6.5 9.5 3 7.5v-6A1.5 1.5 0 0 1 4.5 0h7A1.5 1.5 0 0 1 13 1.5v6l-3.5 2L8 8.75l-1.5.75ZM1.059 3.635 2 3.133v3.753L0 5.713V5.4a2 2 0 0 1 1.059-1.765ZM16 5.713l-2 1.173V3.133l.941.502A2 2 0 0 1 16 5.4v.313Zm0 1.16-5.693 3.337L16 13.372v-6.5Zm-8 3.199 7.941 4.412A2 2 0 0 1 14 16H2a2 2 0 0 1-1.941-1.516L8 10.072Zm-8 3.3 5.693-3.162L0 6.873v6.5Z" />
                                            </svg> <span className={style.open}>Open</span>
                                        </button>
                                        <p></p>
                                        {blog.author == userID ?
                                            <div>
                                                <button className="card-link btn btn-warning" onClick={() => navigator('/update-blog/' + blog.id + '/')}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-code-slash" viewBox="0 0 16 16">
                                                        <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z" />
                                                    </svg> <span id='edit'>Edit</span>
                                                </button>
                                                <button className="card-link btn btn-danger" onClick={() => DeletePost(blog.id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                                    </svg> <span id='delete'>Delete</span>
                                                </button>
                                            </div>
                                            : ""}
                                    </div>
                                </div>
                            </div>
                        )
                        )
                    }
                </div>
                : ""
            : ""
    )
}

export default HomePage
