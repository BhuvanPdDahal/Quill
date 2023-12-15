import React from 'react'

const ChatLoader: React.FC = () => {
  return (
    <div className='h-chats overflow-auto py-4 flex flex-col items-start gap-3 animate-pulse'>
        <div className='chat incoming-chat h-50px w-100px'></div>
        <div className='chat outgoing-chat h-50px w-200px'></div>
        <div className='chat incoming-chat h-50px w-340px'></div>
        <div className='chat outgoing-chat h-50px w-100px'></div>
        <div className='chat incoming-chat h-50px w-200px'></div>
        <div className='chat outgoing-chat h-50px w-340px'></div>
        <div className='chat incoming-chat h-50px w-340px'></div>
        <div className='chat outgoing-chat h-50px w-200px'></div>
    </div>
  )
}

export default ChatLoader;