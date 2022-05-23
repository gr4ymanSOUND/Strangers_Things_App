import React from 'react'

const Messages = ({messages}) => {

    // I separated out this map function for the messages into its own component -- I realized that I could use the exact same syntax for accessing messages from the main post object and the post object inside the user object, so I used this component on the profile and authorized posts view

    return (
        <div className='post-messages'>
            <h4>Messages</h4>
            {
            // ternary checks if the messages array is empty, maps through the array if there is content
            (messages.length !== 0) ? (
                messages.map((message, index) => {
                    return (
                            <div className='single-message' key={index}>
                                <h5>{message.fromUser.username}</h5>
                                <p>{message.content}</p> 
                            </div>
                    )
                })
            ) : ( <div>No Messages...</div> )
            }
        </div>
    )
    
}

export default Messages;