import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../../Context/UserProvider'
import { useChat } from '../../../CustomHooks/useChat'
import { BoxShadow } from '../../StyledComponents/BoxShadow'
import { ChatCard } from '../../UI/ChatCard/ChatCard'
import './ChatSidebar.css'

export const ChatSidebar = () => {

    const userContext = useContext(UserContext)

    const chats = [
        {
            room: 1,
            user_state_connected: true,
            image_profile: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29uc3xlbnwwfHwwfHw%3D&w=1000&q=80',
            date_last_connected: '02 Julio',
            user_name: 'Sofia',
            last_message: 'Hey ws foo',
            unread_messages: 2
        },
        {
            room: 2,
            user_state_connected: false,
            image_profile: 'https://images.unsplash.com/photo-1545996124-0501ebae84d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGh1bWFufGVufDB8fDB8fA%3D%3D&w=1000&q=80',
            date_last_connected: '02 Julio',
            user_name: 'Juan Alverto',
            last_message: 'Hey ws foo',
            unread_messages: 10
        },
        {
            room: 3,
            user_state_connected: true,
            image_profile: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29uc3xlbnwwfHwwfHw%3D&w=1000&q=80',
            date_last_connected: '02 Julio',
            user_name: 'Sofia',
            last_message: 'Hey ws foo',
            unread_messages: 2
        },
        {
            room: 4,
            user_state_connected: false,
            image_profile: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29uc3xlbnwwfHwwfHw%3D&w=1000&q=80',
            date_last_connected: '02 Julio',
            user_name: 'Sofia',
            last_message: 'Hey ws foo',
            unread_messages: 2
        }
    ]

    useEffect(() => {
        console.log(userContext);
    }, [])

    const { roomConnect } = useChat()

    return (
        <div className='chats'>
            {
                chats.map((item, index) => (
                    <div onClick={roomConnect(item.room)}>
                        <ChatCard information={item} key={index} />
                    </div>
                ))
            }
        </div>
    )
}
