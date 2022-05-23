import React from "react";
import Messages from "./Messages";
import { deletePost } from "../api";

const ProfilePosts = (props) => {

    const {token, postings, setPostings, userData, setUserData, history} = props;

    console.log('user data inside ProfilePosts: ', userData)

    let userPosts = userData.posts;
    console.log('user post lists: ', userPosts);

    const handleDelete = async (token, postId) => {
        console.log(token, postId);
        deletePost(token, postId);
        console.log('post deleted: ', userData.posts);

        const newPostings = postings.filter((post) => post.active);
        setPostings(newPostings);
        
        document.getElementById(postId).style.display = 'none'
    }

    return (
        <>
        {
            userPosts.map((post) => {
                // if the post is inactive, don't show it on the screen
                if (!post.active) {
                    return null
                }
                // takes the date provided by the API, converts it to a Date Object and then converts it to a new string with a more readable format for display
                let date = new Date(post.createdAt);
                let postDate = date.toDateString();                
                
                return(
                    <div className='post' key={post._id} id={post._id}>
                        <h3>{post.title}<span className='post-date'>{postDate}</span></h3>
                        <div className='post-body'>
                            <div>Price: {post.price}</div>
                            <div>{
                                post.willDeliver ? 'Will Deliver' : 'Requires Pickup'   
                            }</div>
                            <p>{post.description}</p>
                            <Messages messages={post.messages}/>
                            <button className='delete-button' type='button' onClick={() => {handleDelete(token, post._id)}}>Delete Post</button>
                        </div>
                    </div>
                )
            })
        }
        </>
    )
}

export default ProfilePosts;