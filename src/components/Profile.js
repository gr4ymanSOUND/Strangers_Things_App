import React, { useEffect } from "react";
import Login from "./Login";
import NewPost from "./NewPost";
import ProfilePosts from "./ProfilePosts";
import { fetchUserData } from "../api";

const Profile = ({token, postings, setPostings, setToken, userData, setUserData}) => {

    // console.log('user data passed to profile: ', userData);

    // use history to redirect like this: ****** currently broken for some reason
    // history.push('/Profile');


    return (
        // !token ? <Login setToken={setToken} history={history} /> : (
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
                {/* <NewPost token={token} postings={postings} setPostings={setPostings}/>    */}
                {
                    !token ? <Login setToken={setToken}/> : <NewPost token={token} postings={postings} setPostings={setPostings}/> 
                }             
            </aside>
            </>
        // )
    )

}

export default Profile;