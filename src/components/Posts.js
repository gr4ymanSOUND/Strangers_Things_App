import React from "react";


const Posts = (props) => {

    const {token, postings, history} = props;

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
        {
            token ? (
                <aside>
                    <div>new post form here</div>
                </aside>
            ) : null
        }

        </>
    )
}

export default Posts;