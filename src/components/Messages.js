import React from 'react'

const Messages = ({messages}) => {

    // let testmessages = [{
    //     fromUser: {
    //         username: 'test'
    //     },
    //     content: 'test'
    // }];

    // testmessages = [];

        

    return (
        <div className='post-messages'>
            <h4>Messages</h4>
            {
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