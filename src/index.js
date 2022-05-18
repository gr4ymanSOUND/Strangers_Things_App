import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router , Route , Link, useHistory } from 'react-router-dom';
import Posts from './components/Posts';
import Profile from './components/Profile';
import { fetchAllPosts } from "./api";

const container = document.getElementById('app');
const root = createRoot(container);

const App = () => {

    // set up history for use in redirecting throughout the app
    let history = useHistory();

    // pull the jwt from local storage if it's there, use it to set the token state
    const tokenFromStorage = localStorage.getItem('jwt');
    
    const [token, setToken] = useState(tokenFromStorage);
    const [postings, setPostings] = useState([]);

    // does API call for basic postings data
    useEffect(() => {
        async function fetchData() {
            const result = await fetchAllPosts(token);
            setPostings(result.data.posts);
            console.log(postings);
        }
        fetchData();
    }, [])

    return (
        <Router>
            <header>
                <h1>Stranger's Things!</h1>
            </header>
            <div id='content-body'>
                {
                    // include the search bar here if we get to that
                }
                <Route path='/posts' >
                    <Posts
                        token={token}
                        postings={postings}
                        history={history}
                    />
                </Route>
                <Route path='/profile'>
                    <Profile
                        token={token}
                        setToken={setToken}
                        history={history}
                    />
                </Route>
                <Route exact path='/'>
                    <Posts
                        token={token}
                        postings={postings}
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