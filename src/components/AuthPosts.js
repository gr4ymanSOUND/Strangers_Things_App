import React, { useEffect } from "react";
import Messages from "./Messages";
import MessageForm from "./MessageForm";
import { deletePost, sendMessage } from "../api";

const AuthPosts = ({token, postings, setPostings}) => {

    // console.log('authposts postings: ', postings)

    const handleDelete = async (token, postId) => {
        console.log(token, postId);
        deletePost(token, postId);
        console.log('post deleted: ');

        const newPostings = postings.filter((post) => post.active);
        setPostings(newPostings);

        document.getElementById(postId).style.display = 'none'
    }

    return (postings.length) ? (
        <>
        {
            postings.map((post) => {

                // takes the date provided by the API, converts it to a Date Object and then converts it to a new string with a more readable format for display
                let date = new Date(post.createdAt);
                let postDate = date.toDateString();                
                
                return(
                    <div className='post' key={post._id} id={post._id}>
                        <h3>{post.title}<span className='post-date'>{postDate}</span></h3>
                        <div className='post-body'>
                            <div className='post-section'>Contact: <span>{post.author.username}</span></div>
                            <div className='post-section'>Location: <span>{post.location}</span></div>
                            <div className='post-section'>Price: <span>{post.price}</span></div>
                            <div className='post-section'>{
                                post.willDeliver ? 'Will Deliver' : 'Requires Pickup'   
                            }</div>
                            <div className='post-section'>Item Description:</div>
                            <p>{post.description}</p>
                            {
                                post.isAuthor ? (
                                    <Messages messages={post.messages}/>
                                ) : <MessageForm token={token} postId={post._id}/>
                            }
                            {
                            // ternary to display the delete or message button depending on whether the user is the Author of the post
                            post.isAuthor ? (
                                <button id='delete-button' type='button' onClick={() => { handleDelete(token, post._id) }}
                                >Delete Post</button>
                            ) : null
                            }
                        </div>
                    </div>
                )
            })
        }
        </>
    ) : null
}

export default AuthPosts;