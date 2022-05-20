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
                            <h4>messages</h4>
                            <div className='single-message'>
                                <div className='message-from'>user</div>
                                <div className='message-body'>message content will go here</div> 
                            </div>
                        </div>
                        {
                        // will likely need an extra ternary operator here to decide whether it's a post the user made or not, so we can selectively display the delete/message button in the correct context; we don't want to message ourselves, and we don't want to delete a post we didn't make
                        }
                        <button>Delete Post</button>
                        <button>Send Message</button>
                    </div>
                )
            })
        }
        </main>
        <aside>
            <NewPost />
        </aside>
        </>
    )
}

export default AuthPosts;