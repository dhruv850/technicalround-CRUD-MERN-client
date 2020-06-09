import React, { useState } from 'react';
import axios from 'axios';
import Nav from './Nav';

import { getUser, getToken } from './helpers';

const Create = () => {
    // state
    const [state, setState] = useState({
        title: '',
        content: '',
        price:''
       
    });
    // destructure values from state
    const { title, content,price } = state;

    // onchange event handler
    const handleChange = name => event => {
        // console.log('name', name, 'event', event.target.value);
        setState({ ...state, [name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        
        axios
            .post(
                `${process.env.REACT_APP_API}/post`,
                { title, content, price },
                {
                    headers: {
                        authorization: `Bearer ${getToken()}`
                    }
                }
            )
            .then(response => {
                console.log(response);
                // empty state
                setState({ ...state, title: '', price: '' });
               
                // show sucess alert
                alert(`Product named ${response.data.title} is created`);
            })
            .catch(error => {
                console.log(error.response);
                alert(error.response.data.error);
            });
    };

    return (
        <div className="container pb-5">
            <Nav />
            <br/>
            <h1>Create Product</h1>
            <br />

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
                </div>
               
                <div>
                    <button className="btn btn-primary">Create</button>
                </div>
            </form>
        </div>
    );
};

export default Create;
