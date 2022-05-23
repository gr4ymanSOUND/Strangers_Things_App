import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router , Route , Link, Switch } from 'react-router-dom';
import { fetchAllPosts, fetchUserData } from "./api";
import Posts from './components/Posts';
import Profile from './components/Profile';

const container = document.getElementById('app');
const root = createRoot(container);

const App = () => {

    // pull the jwt from local storage if it's there, use it to set the token state
    const tokenFromStorage = localStorage.getItem('jwt');
    
    // set up the main state variables
    const [token, setToken] = useState(tokenFromStorage);
    const [postings, setPostings] = useState([]);
    const [userData, setUserData] = useState({})

    // API calls for basic postings data and user data (posts and messages)
    useEffect(() => {
        async function fetchPosts() {
            const postData = await fetchAllPosts(token);
            setPostings(postData.data.posts);
            console.log('fetched posts');
        }
        fetchPosts();
    }, [token])

    useEffect(() => {
        async function fetchData() {
            console.log('postings has changed, fetching user data now', postings)
            const userDataResponse = await fetchUserData(token);
            setUserData(userDataResponse.data);
        }
        // no reason to even fetch the data if there isn't a token stored, was getting some errors on first page load from this
        if(token) {
            fetchData();
            console.log('User Data has been fetched if available');
        }
    }, [postings])


    // handles logging out the user
    const logOut = () => {
        setToken(null);
        localStorage.removeItem('jwt');
    }

    return (
        <Router>
            <header>
                <h1>Stranger's Things!</h1>
                <div className='profile-logout'>
                    <Link className='top-nav-link' to='/profile'>
                        {token ? userData.username : 'Log In'}</Link>
                    {
                        token ? (<button onClick={logOut}>Log Out</button>) : null
                    }
                </div>    
            </header>
            <div id='content-body'>
                <Switch>
                    <Route path='/posts' >
                        <Posts
                            token={token}
                            setToken={setToken}
                            postings={postings}
                            setPostings={setPostings}
                            history={history}
                        />
                    </Route>
                    <Route path='/profile'>
                        <Profile
                            token={token}
                            setToken={setToken}
                            postings={postings}
                            setPostings={setPostings}
                            userData={userData}
                            setUserData={setUserData}
                            history={history}
                        />
                    </Route>
                    <Route exact path='/'>
                        <Posts
                            token={token}
                            setToken={setToken}
                            postings={postings}
                            setPostings={setPostings}
                            history={history}
                        />
                    </Route>
                </Switch>
            </div>
            <footer>
                <Link className='nav-link' to='/posts'>Posts</Link>
                <Link className='nav-link' to='/profile'>{!token ? 'Login': 'Profile'}</Link>
            </footer>
        </Router>
        )
}

root.render(<App />);