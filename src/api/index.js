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
        throw err;
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
        throw err;
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
        throw err;
    }
}

// make function to create header for login/register API call
// API call will return the token, which is used for authentication in other API calls

// headers: {
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer TOKEN_STRING_HERE'
//   },