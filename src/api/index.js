// api calls here

const BASE_URL = 'https://strangers-things.herokuapp.com/api/2022-FTB-ET-WEB-PT';

export async function fetchAllPosts(token) {
    try {
        const response = await fetch(`${BASE_URL}/posts`, token ? {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token
                }
            } : {});
        const result = await response.json();
        return result;
    } catch (err) {
        console.log(err);
    }
}

export async function makeNewPost(token, postTitle, postDescription, postPrice, postLocation, postDeliver) {
    try {
        const response = await fetch(`${BASE_URL}/posts`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
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

export async function deletePost(token, postId) {
    try {
        const response = await fetch(`${BASE_URL}/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        const result = await response.json();
        console.log('Delete post: ', result)
        return result;
    } catch (err) {
        console.log('delete call error: ' + err);
    }
}

export async function registerUser(user, pass) {
    // needs to pass user object with username an password string properties
    try {
        const response = await fetch(`${BASE_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
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

export async function loginUser(user, pass) {
    // needs to pass user object with username an password string properties
    try {
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
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

export async function fetchUserData(token) {
    try {
        const response = await fetch(`${BASE_URL}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        const result = await response.json();
        console.log('user API: ', result);
        return result;
    } catch (err) {
        console.log('user call error: ' + err);
    }
}

// make function to create header for login/register API call
// API call will return the token, which is used for authentication in other API calls

// headers: {
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer TOKEN_STRING_HERE'
//   },