import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getUser,getToken } from './helpers';

const App = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = () => {
        axios
            .get(`${process.env.REACT_APP_API}/posts`)
            .then(response => {
                // console.log(response);
                setPosts(response.data);
            })
            .catch(error => alert('Error fetching products'));
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to delete this post?');
        if (answer) {
            deletePost(slug);
        }
    };

    const deletePost = slug => {
        // console.log('delete', slug, ' post');
        axios
            .delete(`${process.env.REACT_APP_API}/post/${slug}`,
            {
                headers: {
                    authorization: `Bearer ${getToken()}`
                }
            })
            .then(response => {
                alert(response.data.message);
                fetchPosts();
            })
            .catch(error => alert('Error deleting products'));
    };

    return (
        <div className="container pb-5">
            <Nav />
            <br />
            <h1>MERN CRUD</h1>
            <hr />
            {posts.map((post, i) => (
                <div className="row" key={post._id} style={{ borderBottom: '1px solid silver' }}>
                    <div className="col pt-3 pb-2">
                        <div className="row">
                            <div className="col-md-10">
                                <Link to={`/post/${post.slug}`}>
                                    <h2>{post.title}</h2>
                                </Link>
                                <p className="lead">{post.content.substring(0, 100)}</p>
                                <h2>
                                    Price: <span className="badge">{post.price}</span><h6> updation on{' '}
                                    <span className="badge">{new Date(post.createdAt).toLocaleString()}</span> </h6>
                                </h2>
                            </div>



                            {getUser() && (
                                <div className="col-md-2">
                                    <Link to={`/post/update/${post.slug}`} className="btn btn-sm btn-outline-warning">
                                        Update
                                    </Link>
                                    <button
                                        onClick={() => deleteConfirm(post.slug)}
                                        className="btn btn-sm btn-outline-danger ml-1"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default App;