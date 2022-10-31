import React, { useContext, useEffect, useRef } from 'react'
import { useState } from 'react'
import { BoxShadow } from './Components/StyledComponents/BoxShadow'
import { ChatCard } from './Components/UI/ChatCard/ChatCard'
import { UserContext } from './Context/UserProvider'
import { useChat } from './CustomHooks/useChat'
import { useAuth } from './CustomHooks/useAuth'
import CryptoJS from 'crypto-js'

import { ReactComponent as NodejsIcon } from './Assets/Icons/Nodejs.svg'
import { ReactComponent as SocketioIcon } from './Assets/Icons/Socketio.svg'
import { ReactComponent as SendIcon } from './Assets/Icons/Send.svg'
import { ReactComponent as Logout } from './Assets/Icons/Logout.svg'
import { ReactComponent as Search } from './Assets/Icons/Search.svg'
import { ReactComponent as AddPeople } from './Assets/Icons/AddPeople.svg'

import './ChatTest.css'
import { MessageCard } from './Components/UI/MessageCard/MessageCard'
import { Loader } from './Components/UI/Loader/Loader'
import { useFetch } from './CustomHooks/useFetch'

export const ChatTest = () => {

    const [message, setMessage] = useState()
    const [username, setUsername] = useState('%$&()/!?')
    const [connectionId, setConnectionId] = useState()
    const [currentChat, setCurrentChat] = useState(null)
    const [currentIndex, setCurrentInedx] = useState(0)

    const data = useContext(UserContext)
    const { logout } = useAuth()
    const { messages, setMessages, update, chats, disconnect, connect, roomConnect, sendMessage, setChats } = useChat()
    const chatRef = useRef()
    const { data: users, loading, get, setData_ } = useFetch()
    const { data: response, loading: loading_chat, post } = useFetch()

    useEffect(() => {
        get(`${process.env.REACT_APP_API_URL}/get_users/${username}`)
        !username && setData_(null)
        !username && setUsername('#%%!&"(/!&"')
        // console.log(users);
    }, [username])

    useEffect(() => {
        connect()
    }, [])

    useEffect(() => {
        if (!currentChat) {
            console.log('No existe un chat seleccionado');
        } else {
            if (currentChat.id_room) {
                const list = chats
                const updatedChat = list.filter(item => {
                    return item.id_room == currentChat.id_room
                })
                setCurrentChat(updatedChat[0])
            }
        }
    }, [chats])

    useEffect(() => {
        if (chatRef && chatRef.current) {
            const { scrollHeight, clientHeight } = chatRef.current;
            chatRef.current.scrollTo({ left: 0, top: scrollHeight - clientHeight, behavior: 'smooth' });
        }
    }, [messages])

    const getDate = () => {
        const date = new Date()
        const opciones = { hour: 'numeric', minute: 'numeric', weekday: 'long', year: 'numeric', month: 'short' };
        return date.toLocaleDateString('es-ES', opciones)
    }

    const encrypts = (data) => {
        const test1 = CryptoJS.AES.encrypt(data,'@securitykey').toString()
        console.log(test1);

        const test = CryptoJS.AES.decrypt(test1,'@securitykey').toString(CryptoJS.enc.Utf8)

        console.log(test);
    }

    const inputRef = useRef()

    // https://chat-socket-io-express.onrender.com



    return (
        <main className='main_chat'>    

            <section className="chat">
                <div className='chats'>
                    <BoxShadow className='header_profile'>
                        <div className="header_my_profile">
                            <div className='header_info_profile'>
                                <img className='image_my_profile' src={data?.picture} alt="" />
                                <div className="infor_profile">
                                    <p className='full_name'>{data?.name}</p>
                                </div>
                            </div>
                            <Logout className='logout_icon' onClick={e => {
                                disconnect()
                                logout()
                            }} />
                        </div>
                        <div className="search_users">
                            <form className='form_search' action="">
                                <div className="input_search">
                                    <Search className='search_icon' />
                                    <input type="search" className='search_all_users' placeholder='search people' ref={inputRef} onChange={e => setUsername(e.target.value)} name="" id="" />
                                    <div className="loader_search">
                                        {
                                            loading &&
                                            <Loader className='loader_search_users' />
                                        }
                                    </div>
                                </div>
                            </form>
                        </div>


                        <div className={`search_results ${users && 'show_results'}`}>
                            {
                                users?.length < 1 ?
                                    <div className="users_not_found">                
                                        <p className='info_users_not_found'>No matches found :(</p>
                                    </div>
                                    :
                                    users?.map((item, index) => (
                                        item.id_user != data.id_user &&
                                        <div className="card_users" key={index} onClick={() => {                               
                                            setCurrentChat(item)
                                            setMessages([])
                                            setData_(null)
                                        }}>
                                            <img className='image_profile_search_user' src={item.image_profile} alt="" />
                                            <p className='username_profile_search_user'>{item.username}</p>
                                        </div>
                                    ))
                            }

                        </div>



                    </BoxShadow>

                    <div className="my_chats">

                        {
                            !users &&
                            <>
                                {
                                    chats.length > 0 ?
                                        chats.map((item, index) => (
                                            <div className="test" key={index} onClick={() => {
                                                roomConnect(item.id_room)
                                                setCurrentChat(item)
                                                setCurrentInedx(index)
                                                // console.log(item);
                                            }}>
                                                <ChatCard information={
                                                    {
                                                        ...item,
                                                        is_new_message: item.id_user !== data.is_user ? true : false
                                                    }
                                                } />
                                            </div>
                                        ))
                                        :
                                        <div className="search_more_people">
                                            <button className="btn_search_people" onClick={() => {
                                                inputRef.current.focus()
                                            }}>
                                                {/* <AddPeople className='icon_add_people'/> */}
                                                <Search className='btn_search_icon' />
                                                <p>Search people</p> 
                                            </button>
                                        </div>
                                }
                            </>
                        }
                    </div>
                </div>

                <BoxShadow className="messages">


                    {currentChat ?
                        <>
                            <header className="info_curent_chat">
                                <div className="profile_current_chat">
                                    <img className='image_my_profile' src={currentChat?.image_profile} alt="" />
                                    {
                                        currentChat.connection_state == 1 ?
                                            <div className="user_connected"></div>
                                            :
                                            <div className="user_disconnected"></div>
                                    }
                                </div>
                                <div className="info_profile">
                                    <p className='full_name'>{currentChat?.username}</p>
                                    {
                                        currentChat.connection_state == 1 ?
                                            <p className='info_connection_state'>Online</p>
                                            :
                                            <p className='info_connection_state'>Disconected</p>

                                    }
                                </div>
                            </header>


                            <div ref={chatRef} className="chat_messages">

                                {
                                    messages?.length < 1 && (
                                        <div className="brefore_sending_message">
                                            <p className='title_before_sending'>Start a new conversation</p>
                                            <p className='message_before_sending'>
                                                Write yor first message
                                            </p>
                                        </div>
                                    )
                                }

                                {
                                    messages?.map((item, index) => (
                                        // <div key={index}>
                                        //     <p>{item?.message}</p>
                                        //     <p>{item?.date_message}</p>
                                        // </div>

                                        <div className={`message_order ${item.id_user != data.id_user ? 'in' : 'out'}`}>
                                            <MessageCard key={index} data={item} />
                                        </div>
                                    ))
                                }

                            </div>


                            <form onSubmit={e => {
                                e.preventDefault()
                                if (!currentChat.id_room) {

                                    update({ of_id_user: data.id_user, for_id_user: currentChat.id_user })
                                        .then(response => {
                                            // console.log('Termino!');
                                            // console.log(response[0]);
                                            
                                            setMessages([...messages, {
                                                message: message,
                                                date_message: getDate(),
                                                id_message: null,
                                                id_user: data.id_user,
                                            }])

                                            sendMessage(message, getDate(), response[0].id_room)
                                            
                                            roomConnect(response[0].id_room)
                                            
                                            setCurrentChat({ ...currentChat, id_room: response[0].id_room })

                                            setMessage('')
                                        })

                                } else {
                                    console.log('Si hay sala');

                                    sendMessage(message, getDate(), currentChat.id_room)
                                    setMessages([...messages, {
                                        message: message,
                                        date_message: getDate(),
                                        id_message: null,
                                        id_user: data.id_user,
                                    }])
                                    setMessage('')
                                }

                            }} className='form_send_message'>
                                <input className='input_chat' type='text' placeholder='Message...' onChange={e => {
                                    setMessage(e.target.value)
                                    
                                    // socket.emit('typing', true)
                                    // setTimeout(() => {
                                    //     socket.emit('typing', false)
                                    // }, 2000)
                                }
                                } value={message} />
                                <button className='btn_send_message'>
                                    <SendIcon className='icon_sendmessage' />
                                </button>
                            </form>

                        </>
                        :
                        <div className="information_app">
                            <div className='icons_app'>
                                <NodejsIcon className='icon_nodejs' />
                                <SocketioIcon className='icon_socketio' />
                            </div>
                            {/* <p className='title_information'>Chat Socket.io Express</p> */}
                        </div>
                    }
                </BoxShadow>
            </section>
        </main >
    )
}
