// api calls here

const BASE_URL = 'https://strangers-things.herokuapp.com/api/2022-FTB-ET-WEB-PT';


// helper to make the headers section for the API calls
const makeHeaders = (token) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
    return headers;
}

// retreive the posts list, passing in the token
export async function fetchAllPosts(token) {
    try {
        const response = await fetch(`${BASE_URL}/posts`, token ? {
            method: 'GET',
            headers: makeHeaders(token)
        } : {});
        const result = await response.json();
        return result;
    } catch (err) {
        console.log(err);
    }
}

// create a new post
export async function makeNewPost(token, postTitle, postDescription, postPrice, postLocation, postDeliver) {
    try {
        const response = await fetch(`${BASE_URL}/posts`, {
            method: "POST",
            headers: makeHeaders(token),
            body: JSON.stringify({
              post: {
                title: postTitle,
                description: postDescription,
                price: postPrice,
                location: postLocation,
                willDeliver: postDeliver
              }
            })
          });
        const result = await response.json();
        console.log(result);
        return result;
    } catch (err) {
        console.log(err);
        alert(err);
    }
}

// delete a post, passing in its ID - the call will fail if the token passed in doesn't match the user that created the post, but I also don't even show the button if they're not so we shouldn't see that error ever
export async function deletePost(token, postId) {
    try {
        const response = await fetch(`${BASE_URL}/posts/${postId}`, {
            method: 'DELETE',
            headers: makeHeaders(token)
        });
        const result = await response.json();
        console.log('Delete post: ', result)
        return result;
    } catch (err) {
        console.log('delete call error: ' + err);
    }
}

// create a new user account
export async function registerUser(user, pass) {
    console.log("registering")
    try {
        const response = await fetch(`${BASE_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            // needs to pass a user object with username an password string properties
                user: {
                    username: user,
                    password: pass
                }
            })
        });
        const result = await response.json();
        console.log(result);
        return result;
    } catch (err) {
        console.log('register call error: ' + err);
    }
}

// log in with an existing account
export async function loginUser(user, pass) {
    console.log("logging in")

    try {
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            // needs to pass user object with username an password string properties
                user: {
                    username: user,
                    password: pass
                }
            })
        });
        const result = await response.json();
        console.log(result);
        return result;
    } catch (err) {
        console.log('login call error: ' + err);
        alert(err);
    }
}

// retrieve the user object -- used for the posts and messages on the profile (no need to filter the posts based on isAuthor)
export async function fetchUserData(token) {
    try {
        const response = await fetch(`${BASE_URL}/users/me`, {
            headers: makeHeaders(token)
        });
        const result = await response.json();
        console.log('user API: ', result);
        return result;
    } catch (err) {
        console.log('user call error: ' + err);
    }
}

// send a message on a specified post
export async function sendMessage(token, postId, messageContent) {
    try {
        const response = await fetch(`${BASE_URL}/posts/${postId}/messages`, {
            method: 'POST',
            headers: makeHeaders(token),
            body: JSON.stringify({
                message: {
                    content: messageContent
                }
            })
        })
        const result = await response.json();
        return result;
    } catch (err) {
        console.log('Message failed to send: ', err.message)
    }
}

// make function to create header for login/register API call
// API call will return the token, which is used for authentication in other API calls

// headers: {
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer TOKEN_STRING_HERE'
//   },