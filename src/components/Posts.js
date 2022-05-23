import React from "react";
import AuthPosts from "./AuthPosts";
import Login from "./Login";
import NewPost from "./NewPost";


const Posts = ({token, setToken, postings, setPostings}) => {

    return (
        <>
        <main>
        <h2 className={'page-title'}>Posts</h2>
        {
            // ternary decides between a very basic post view and the Authorized Posts view with all info
            !token ? (
                postings.map((post) => {

                // takes the date provided by the API, converts it to a Date Object and then converts it to a new string with a more readable format for display
                let date = new Date(post.createdAt);
                let postDate = date.toDateString();

                return(
                    <div className='post' key={post._id}>
                        <h3>{post.title}<span className='post-date'>{postDate}</span></h3>
                        <div className='post-body'>
                            <div className='post-section'>Price: <span>{post.price}</span></div>
                            <div className='post-section'>Item Description: <span>{post.description}</span></div>  
                            <div className='post-tagline'>Log in to see more details and send this user a message!</div>
                        </div>
                    </div>
                )
            })) : (
                <AuthPosts 
                    token={token}
                    postings={postings}
                    setPostings={setPostings}
                /> )
        }
        </main>
        <aside>
            {
                // ternary decides whether to show the login form or the new post form
                !token ? (
                    <Login setToken={setToken} />
                ) : (
                    <NewPost token={token} postings={postings} setPostings={setPostings} />
                )
            }
        </aside>
        </>
    )
}

export default Posts;