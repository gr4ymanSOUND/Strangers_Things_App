import React from "react";
import Messages from "./Messages";
import { deletePost } from "../api";

const AuthPosts = (props) => {

    const {token, postings, setPostings, history} = props;

    console.log('authposts postings: ', postings)

    const handleDelete = async (token, postId) => {
        console.log(token, postId);
        deletePost(token, postId);

        const newPostings = postings.filter((post) => post.active);
        setPostings(newPostings);

        console.log('post deleted: ', postings);
        document.getElementById(postId).style.display = 'none'
    }


    return (
        <>
        {
            postings.map((post) => {

                // takes the date provided by the API, converts it to a Date Object and then converts it to a new string with a more readable format for display
                let date = new Date(post.createdAt);
                let postDate = date.toDateString();                
                
                return(
                    <div className='post' key={post._id} id={post._id}>
                        <h3>{post.title}<span className='post-date'>{postDate}</span></h3>
                        <div>Contact: {post.author.username}</div>
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
                        // ternary to display the delete or message button depending on whether the user is the Author of the post
                        post.isAuthor ? (
                            <button type='button' onClick={() => {
                                handleDelete(token, post._id)
                            }}
                            >Delete Post</button>
                        ) : <button>Send Message</button>
                        }
                    </div>
                )
            })
        }
        </>
    )
}

export default AuthPosts;