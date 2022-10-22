import React from 'react'
import { useEffect } from 'react'
import { BoxShadow } from '../../StyledComponents/BoxShadow'
import './ChatCard.css'

export const ChatCard = ({ information }) => {
    useEffect(() =>{
        console.log(information);
    },[])
    return (
        <BoxShadow className='chat_card'>
            <div className="user_profile">
                <div className="user_state_connected">
                    {
                        information.connection_state == 1 ?
                            <div className="user_connected"></div>
                            :
                            <div className="user_disconnected"></div>
                    }
                </div>
                <p>{information.is_new_message}</p>
                <div className="image_profile">
                    <img src={information.image_profile} alt="" />
                </div>
            </div>
            <div className="information_room">
                <div className="inforation_user">
                    <p className='user_name'>{information.username}</p>
                    <p className='last_message'>{!information.message ? `Inicia una conversacion` : information.message }</p>
                </div>
                <div className="date_last_connected">
                    <p className='last_connected'>{information.date_message}</p>
                    <div className="unread_messages">
                        <p className='value_unread_messages'>4</p>
                    </div>
                </div>
            </div>
        </BoxShadow>
    )
}
