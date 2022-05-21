import React from "react";
import NewPost from "./NewPost";

const AuthPosts = (props) => {

    const {token, postings, history} = props;

    return (
        <>
        <main>
        {
            postings.map((post) => {

                // takes the date provided by the API, converts it to a Date Object and then converts it to a new string with a more readable format for display
                let date = new Date(post.createdAt);
                let postDate = date.toDateString();

                console.log(post.messages);
                
                return(
                    <div className='post' key={post._id}>
                        <h3>{post.title}<span className='post-date'>{postDate}</span></h3>
                        <div>Contact: {post.author.username}</div>
                        <div>Location: {post.location}</div>
                        <div>Price: {post.price}</div>
                        <div>{
                            post.willDeliver ? 'Will Deliver' : 'Requires Pickup'   
                        }</div>
                        <p>{post.description}</p>
                        <div id='post-messages'>
                            <h4>Messages</h4>
                            {
                            // ternary to show either "no messages" or the list of messages
                            // maybe make this its own component, and reuse it on the profile
                            // add a way to account for whether the post is made by the user to determine whether to show this entire component
                            !(post.messages == []) ? (<div>No Messages...</div>) : (
                                post.messages.map((message) => {
                                    return (
                                        <div className='single-message'>
                                            <div className='message-from'>{message.fromUser.username}</div>
                                            <div className='message-body'>{message.content}</div> 
                                        </div>
                                    )
                                })
                            )
                            }
                        </div>
                        {
                        // ternary to display the delete or message button depending on whether the user is the Author of the post
                        post.isAuthor ? <button>Delete Post</button> : <button>Send Message</button>
                        }
                    </div>
                )
            })
        }
        </main>
        </>
    )
}

export default AuthPosts;