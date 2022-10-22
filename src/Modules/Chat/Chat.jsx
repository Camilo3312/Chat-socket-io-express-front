import React, { useContext } from 'react'
import { useEffect } from 'react'
import { ChatMessages } from '../../Components/Layout/ChatMessages/ChatMessages'
import { ChatSidebar } from '../../Components/Layout/ChatSidebar/ChatSidebar'
import { UserContext } from '../../Context/UserProvider'
import './Chat.css'

export const Chat = () => {
    const user = useContext(UserContext)
    useEffect(() => {
        console.log(user);
    },[])
    return (
        <main className='main_chat'>
            <div className="delimit_main">
                <ChatSidebar/>
                <ChatMessages/>
            </div>
        </main>
    )
}
