import React, { useState } from 'react'
import { sendMessage, fetchAllPosts } from '../api';

const MessageForm = ({token, postId}) => {

    const [messageContent, setMessageContent] = useState("");

    const sendNewMessage = async (e) => {
        e.preventDefault();
        console.log('new message -- postId: ' + postId + '; content: ' + messageContent)
        const newMessage = await sendMessage(token, postId, messageContent);
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