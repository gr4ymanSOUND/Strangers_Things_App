import React, { useEffect } from "react";
import Login from "./Login";
import NewPost from "./NewPost";
import ProfilePosts from "./ProfilePosts";
import { fetchUserData } from "../api";

const Profile = ({token, postings, setPostings, setToken, userData, setUserData}) => {

    // check if the token is in state
        // if not, don't render the entire <main> tag, just render the aside -- styling will center it on the page

    return (
            <>
            {
                token ? (
                <main>
                <div className={'profile-content'}>
                    <h2 className='page-title'>{`${userData.username}'s Posts and Messages`}</h2>
                        {(JSON.stringify(userData) !== '{}') ? (<ProfilePosts 
                            token={token}
                            postings={postings}
                            setPostings={setPostings}
                            userData={userData}
                            setUserData={setUserData}
                        />): null}
                </div>
                </main>
                ) : null
            }
            <aside>
                {
                    // if there is no token in state, the aside should be filled with the login form; if there is, we want to allow the user to make new posts from this page as well.
                    !token ? <Login setToken={setToken}/> : <NewPost token={token} postings={postings} setPostings={setPostings}/> 
                }             
            </aside>
            </>
    )
}

export default Profile;