import React, { useState } from "react";

const NewPost = () => {

    const [postTitle, setPostTitle] = useState('');
    const [postDescription, setPostDescription] = useState('');
    const [postPrice, setPostPrice] = useState('');
    const [postLocation, setPostLocation] = useState('');
    const [postDeliver, setPostDeliver] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        //code to handle when the submit button is clicked
        console.log(postTitle, postDescription, postPrice, postLocation, postDeliver);
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
                ></textarea>
            </div>
            <div className='form-section'>
                <label className='form-label'>Price:</label>
                <input
                    type='text'
                    value={postPrice}
                    onChange={({target: {value}}) => setPostPrice(value)}
                    id='new-post-price'
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