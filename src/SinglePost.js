import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './Nav';

const SinglePost = props => {
    const [post, setPost] = useState('');

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
            .then(response => setPost(response.data))
            .catch(error => alert('Error loading single product'));
    }, []);

    return (
        <div className="container pb-5">
            <Nav />
            <br />
            <h1>{post.title}</h1>
            <p className="lead">{post.content}</p>
            <h2>
                                    Price: <span className="badge">{post.price}</span><h6>updation on{' '}
                                    <span className="badge">{new Date(post.createdAt).toLocaleString()}</span> </h6>
                                </h2>
        </div>
    );
};

export default SinglePost;
