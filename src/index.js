import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router , Route , Link, useHistory } from 'react-router-dom';
import { fetchAllPosts, fetchUserData } from "./api";
import Posts from './components/Posts';
import Profile from './components/Profile';

const container = document.getElementById('app');
const root = createRoot(container);

const App = () => {

    // set up history for use in redirecting throughout the app
    let history = useHistory();

    // pull the jwt from local storage if it's there, use it to set the token state
    const tokenFromStorage = localStorage.getItem('jwt');
    
    const [token, setToken] = useState(tokenFromStorage);
    const [postings, setPostings] = useState([]);
    const [userData, setUserData] = useState({})

    // API calls for basic postings data and user data (posts and messages)
    useEffect(() => {
        async function fetchPosts() {
            const postData = await fetchAllPosts(token);
            setPostings(postData.data.posts);
            console.log('fetched posts');
            const userDataResponse = await fetchUserData(token);
        }
        fetchPosts();
    }, [])

    useEffect(() => {
        async function fetchData() {
            const userDataResponse = await fetchUserData(token);
            setUserData(userDataResponse);
            console.log('User data response in useEffect ', userDataResponse)
            console.log('user data state from src index: ', userData);
        }
        fetchData();
    },[])

    return (
        <Router>
            <header>
                <h1>Stranger's Things!</h1>
                {/* <Link className='top-nav-link' to='/profile'>{
                    token ? userData.username : 'Log In'
                }</Link> */}
            </header>
            <div id='content-body'>
                {
                    // include the search bar here if we get to that
                }
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
                        postings={postings}
                        setPostings={setPostings}
                        token={token}
                        setToken={setToken}
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
            </div>
            <footer>
                <Link className='nav-link' to='/posts'>Posts</Link>
                <Link className='nav-link' to='/profile'>Profile/Login</Link>
            </footer>
        </Router>
        )
}

root.render(<App />);