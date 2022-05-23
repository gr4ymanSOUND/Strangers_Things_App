import React, { useState } from 'react'
import { sendMessage, fetchAllPosts } from '../api';

const MessageForm = ({token, postId}) => {

    // set up the state for the form
    const [messageContent, setMessageContent] = useState("");

    // handle the submit event
    const sendNewMessage = async (e) => {
        e.preventDefault();
        console.log('new message -- postId: ' + postId + '; content: ' + messageContent)
        const newMessage = await sendMessage(token, postId, messageContent);
        // give the user some feedback that the post was successful - the posts list won't show messages unless you're the user who created the post, so you won't see messages you sent on other posts
        if (newMessage.success) {
            setMessageContent("")
            alert('Your message has been sent!');
        }
    }

    return (
        <>
        <form className='message-form' onSubmit={ sendNewMessage }>
            <h4 id='form-message'>Send a Message</h4>
            <textarea
                value={messageContent}
                onChange={ ({target: {value}}) => setMessageContent(value) }
                id='new-message-content'
                required
            ></textarea>
            <button type='submit' >Send</button>
        </form>
        </>
    ) 
}

export default MessageForm;