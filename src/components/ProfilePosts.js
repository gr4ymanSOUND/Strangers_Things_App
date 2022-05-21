import React from "react";
import Messages from "./Messages";
import { deletePost } from "../api";

const ProfilePosts = (props) => {

    const {token, userData, setUserData, history} = props;

    console.log('user data inside ProfilePosts: ', userData)

    const handleDelete = async (token, postId) => {
        console.log(token, postId);
        deletePost(token, postId);

        console.log('post deleted: ', userData.posts);
        document.getElementById(postId).style.display = 'none'
    }

    return (
        <>
        {
            userData.posts.map((post) => {
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
                        <div>Location: {post.location}</div>
                        <div>Price: {post.price}</div>
                        <div>{
                            post.willDeliver ? 'Will Deliver' : 'Requires Pickup'   
                        }</div>
                        <p>{post.description}</p>
                        {
                            post.isAuthor ? (
                                <Messages messages={post.messages}/>
                            ) : null
                        }
                        {
                            <button type='button' onClick={() => {handleDelete(token, post._id)}}>Delete Post</button>
                        }
                    </div>
                )
            })
        }
        </>
    )
}

export default ProfilePosts;