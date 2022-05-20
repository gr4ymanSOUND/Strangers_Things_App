import React from "react";
import Login from "./Login";


const Posts = (props) => {

    const {token, setToken, postings} = props;

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
                        <div>Price: {post.price}</div>
                        <p>{post.description}</p>  
                    </div>
                )
            })
        }
        </main>
        <aside>
            <Login token={token} setToken={setToken}/>
        </aside>
        </>
    )
}

export default Posts;