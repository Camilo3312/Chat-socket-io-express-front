import React, { useState } from 'react'
import { useChat } from '../../../CustomHooks/useChat'
import { BoxShadow } from '../../StyledComponents/BoxShadow'
import './ChatMessages.css'

export const ChatMessages = () => {

    const { messages, sendMessage } = useChat()
    const [message, setMessage] = useState()
    return (
        <BoxShadow className='chat_messages'>
            <input type="text" onChange={e => setMessage(e.target.value)} />
            <input type="button" value="Enviar mensage" onClick={() => sendMessage(message, 1)} />
            {
                messages.map((item, index) => (
                    <p key={index}>{item.body}</p>
                ))
            }
        </BoxShadow>
    )

}
