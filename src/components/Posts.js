import React from "react";
import AuthPosts from "./AuthPosts";
import Login from "./Login";
import NewPost from "./NewPost";


const Posts = (props) => {

    const {token, setToken, postings, history} = props;

    return (
        <>
        <main>
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
                        <div>Price: {post.price}</div>
                        <p>{post.description}</p>  
                    </div>
                )
            })) : (
                <AuthPosts 
                    token={token}
                    postings={postings}
                    history={history}    
                /> )
        }
        </main>
        <aside>
            {
                !token ? (
                    <Login token={token} setToken={setToken}/>
                ) : (
                    <NewPost />
                )
            }
        </aside>
        </>
    )
}

export default Posts;