import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './Nav';
import { getUser, getToken } from './helpers';
const UpdatePost = props => {
    const [state, setState] = useState({
        title: '',
        content: '',
        slug: '',
        price: ''
    });
    const { title, content, slug, price } = state;

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
            .then(response => {
                const { title, content, slug, price } = response.data;
                setState({ ...state, title, content, slug, price });
            })
            .catch(error => alert('Error loading single post'));
    }, []);

    // onchange event handler
    const handleChange = name => event => {
        // console.log('name', name, 'event', event.target.value);
        setState({ ...state, [name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        // console.table({ title, content, user });
        axios
            .put(`${process.env.REACT_APP_API}/post/${slug}`, { title, content, price },
            {
                headers: {
                    authorization: `Bearer ${getToken()}`
                }
            })
            .then(response => {
                console.log(response);
                const { title, content, slug, price } = response.data;
                // empty state
                setState({ ...state, title, content, slug, price });
                // show sucess alert
                alert(`Post titled ${title} is updated`);
            })
            .catch(error => {
                console.log(error.response);
                alert(error.response.data.error);
            });
    };

    const showUpdateForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    onChange={handleChange('title')}
                    value={title}
                    type="text"
                    className="form-control"
                    placeholder="Product Name"
                    required
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea
                    onChange={handleChange('content')}
                    value={content}
                    type="text"
                    className="form-control"
                    placeholder="Write something.."
                    required
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Price</label>
                <input
                    onChange={handleChange('price')}
                    value={price}
                    type="number"
                    className="form-control"
                    placeholder="Enter Price"
                    required
                />
            </div>
            <div>
                <button className="btn btn-primary">Update</button>
            </div>
        </form>
    );

    return (
        <div className="container pb-5">
            <Nav />
            <br />
            <h1>Update Product</h1>
            {showUpdateForm()}
        </div>
    );
};

export default UpdatePost;
