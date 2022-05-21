import React, { useEffect } from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import AuthPosts from "./AuthPosts";
import Login from "./Login";
import NewPost from "./NewPost";
import ProfilePosts from "./ProfilePosts";
import { fetchUserData } from "../api";

const Profile = ({token, postings, setPostings, setToken, userData, setUserData, history}) => {

    // const {token, postings, setPostings, setToken, userData, setUserData, history} = props;

    console.log('user data passed to profile: ', userData);
    console.log('profile postings list : ', postings)

    // use history to redirect like this: 
    // history.push('/Profile');
    
    // useEffect(() => {
    //     async function fetchData() {
    //         const userDataResponse = await fetchUserData(token);
    //         setUserData(userDataResponse);
    //         console.log('User data response in useEffect in profile ', userDataResponse)
    //         console.log('user data state from profile: ', userData);
    //     }
    //     fetchData();
    // }, [])

    return (
        !token ? (
        <Login token={token} setToken={setToken} />
        ) : (
            <>
            <main>
                <div className={'profile-content'}>
                <h3 className='page-title'>Your Posts and Messages</h3>
                    <ProfilePosts 
                        token={token}
                        userData={userData}
                        setUserData={setUserData}
                        history={history} 
                    />
            </div>
            </main>
            <aside>
                <NewPost token={token} postings={postings} setPostings={setPostings}/>
                {/* <h2>Username: {userData.username}</h2> */}
                <button>Log Out</button>
            </aside>
            </>
        )
    )

}

export default Profile;