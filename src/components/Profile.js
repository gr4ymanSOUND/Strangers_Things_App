import React from "react";
import Login from "./Login";

const Profile = (props) => {

    const {token, setToken, history} = props;

    // use history to redirect like this: 
    // history.push('/Profile');

    return (
        !token ? (
        <Login token={token} setToken={setToken} />
        ) : (
            <div>Profile stuff here eventually, or the login page if the user isn't logged in yet</div>
        )
    )

}

export default Profile;