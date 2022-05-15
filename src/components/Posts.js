import React from "react";


const Posts = (props) => {

    const {postings} = props;

    return (
        <>
        <main>
        {
            postings.map((post) => {
                return(
                    <div className='post' key={post._id}>
                        <h3>{post.title}</h3>
                        <p>{post.description}</p>  
                    </div>
                )
            })
        }
        </main>
        <aside>
            {
                // if the user is logged in, display the new post form
            }
            <div>new post form here</div>
        </aside>
        </>
    )
}

export default Posts;