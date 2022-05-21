import React, { useState } from "react";
import { makeNewPost } from "../api";

const NewPost = () => {

    const [postTitle, setPostTitle] = useState('');
    const [postDescription, setPostDescription] = useState('');
    const [postPrice, setPostPrice] = useState('');
    const [postLocation, setPostLocation] = useState('');
    const [postDeliver, setPostDeliver] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        //code to handle when the submit button is clicked
        // makeNewPost(postTitle, postDescription, postPrice, postLocation, postDeliver);
        console.log(postTitle, postDescription, postPrice, postLocation, postDeliver);
        // reset the form after submission
        setPostTitle('')
        setPostDescription('')
        setPostPrice('')
        setPostLocation('')
        setPostDeliver('')
    }

    return (
        <form onSubmit={submitHandler}>
            <div className='form-section'>
                <div className='form-label'>Post Title:</div>
                <input
                    type='text'
                    value={postTitle}
                    onChange={({target: {value}}) => setPostTitle(value)}
                    id='new-post-title'
                    required
                />
            </div>
            <div className='form-section'>
                <div className='form-label'>Description:</div>
                {
                        // resize: none in style for textarea to disable resizing
                }
                <textarea
                    rows='5'
                    cols='30'
                    value={postDescription}
                    onChange={({target: {value}}) => setPostDescription(value)}
                    id='new-post-description'
                    required
                ></textarea>
            </div>
            <div className='form-section'>
                <label className='form-label'>Price:</label>
                <input
                    type='text'
                    value={postPrice}
                    onChange={({target: {value}}) => setPostPrice(value)}
                    id='new-post-price'
                    required
                />
            </div>
            <div className='form-section'>
                <label className='form-label'>Location:</label>
                <input
                    type='text'
                    value={postLocation}
                    onChange={({target: {value}}) => setPostLocation(value)}
                    id='new-post-location'
                />
            </div>
            <div className='form-section'>
                <label className='form-label'>Deliver?</label>
                <input
                    type='checkbox'
                    onChange={({target: {checked}}) => setPostDeliver(checked)}
                    id='new-post-deliver'
                />
            </div>
            <button type='submit'>submit</button>
        </form>
    )
}

export default NewPost;