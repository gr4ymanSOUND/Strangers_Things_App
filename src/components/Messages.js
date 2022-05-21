import React from 'react'

const Messages = ({messages}) => {

    console.log(messages);

    // let testmessages = [{
    //     fromUser: {
    //         username: 'test'
    //     },
    //     content: 'test'
    // }];

    // testmessages = [];

    return (
        (messages.length !== 0) ? (
            messages.map((message, index) => {
                return (
                    <div id='post-messages' key={index}>
                        <h4>Messages</h4>
                        <div className='single-message'>
                            <div className='message-from'>{message.fromUser.username}</div>
                            <div className='message-body'>{message.content}</div> 
                        </div>
                    </div>
                )
            })
        ) : (
            <div id='post-messages'>
                <h4>Messages</h4>
                <div>No Messages...</div>
            </div>
        )
    )
    
}

export default Messages;