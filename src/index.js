import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router , Route , Link } from 'react-router-dom';
import Posts from './components/Posts';
import Profile from './components/Profile';
import { fetchAllPosts } from "./api";

const container = document.getElementById('app');
const root = createRoot(container);

const App = () => {

    const tokenFromStorage = localStorage.getItem('jwt');

    const [token, setToken] = useState(tokenFromStorage);
    const [postings, setPostings] = useState([]);


    useEffect(() => {
        async function fetchData() {
            const result = await fetchAllPosts();
            setPostings(result.data.posts);
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
                <Route path='/posts'>
                    <Posts postings={postings} />
                </Route>
                <Route path='/profile'>
                    <Profile token={token} setToken={setToken}/>
                </Route>
                <Route exact path='/'>
                    <Posts postings={postings} />
                </Route>
            </div>
            <footer>
                <Link className='nav-link' to='/posts'>Posts</Link>
                <Link className='nav-link' to='/profile'>Profile</Link>
            </footer>
        </Router>
        )
}

root.render(<App />);