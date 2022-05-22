import React, { useState } from "react";
import { makeNewPost } from "../api";

const NewPost = ({token, postings, setPostings}) => {

    const [postTitle, setPostTitle] = useState('');
    const [postDescription, setPostDescription] = useState('');
    const [postPrice, setPostPrice] = useState('');
    const [postLocation, setPostLocation] = useState('');
    const [postDeliver, setPostDeliver] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        //code to handle when the submit button is clicked
        console.log('new post data: ', postTitle, postDescription, postPrice, postLocation, postDeliver);

        const newPost = await makeNewPost(token, postTitle, postDescription, postPrice, postLocation, postDeliver);
        setPostings([...postings, newPost.data.post])

        // reset the form after submission
        setPostTitle('')
        setPostDescription('')
        setPostPrice('')
        setPostLocation(null)
        setPostDeliver(false)
        alert('Your post has been submitted!');
    }

    return (
        <form className='post-form' onSubmit={submitHandler}>
            <h3 id='form-message'>Make a New Post</h3>
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
                <label className='form-label'>Is Delivery Included? </label>
                <input
                    type='checkbox'
                    onChange={({target: {checked}}) => setPostDeliver(checked)}
                    id='new-post-deliver'
                    checked={postDeliver}
                />
            </div>
            <button type='submit'>Submit</button>
        </form>
    )
}

export default NewPost;