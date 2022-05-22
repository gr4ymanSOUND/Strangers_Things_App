import React from "react";
import AuthPosts from "./AuthPosts";
import Login from "./Login";
import NewPost from "./NewPost";


const Posts = (props) => {

    const {token, setToken, postings, setPostings} = props;

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
                        <div className='post-section'>Price: <span>{post.price}</span></div>
                        <p className='post-section'><span>{post.description}</span></p>  
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