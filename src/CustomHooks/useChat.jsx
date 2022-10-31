import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { UserContext } from '../Context/UserProvider';
import { useFetch } from './useFetch';

const socket = io(process.env.REACT_APP_API_URL)

export const useChat = () => {
    const { id_user, isauth } = useContext(UserContext)
    // const { data: initial_messages, get } = useFetch()

    const [messages, setMessages] = useState([])
    const [chats, setChats] = useState([])

    const render_chats = () => {
        socket.emit('chats', id_user)
    }

    useEffect(() => {

        const reciveMessage = (message, id_user, date, room) => {
            setMessages([...messages, {
                date_message: date,
                id_message: null,
                id_user: id_user,
                message: message,
            }])
            console.log(message, id_user);
        }

        const reciveChats = (datas) => {
            setChats(datas)
            // console.log(datas);
        }

        const new_message = () => {
            render_chats()
        }

        socket.on('chats', reciveChats)
        socket.on('message', reciveMessage)
        socket.on('new_message', new_message)
        render_chats()

        return () => {
            socket.off('message', reciveMessage)
            socket.off('chats', reciveChats)
            socket.off('new_message', new_message)
        }
    }, [messages])


    const getMessages = async (currentRoom) => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/get_messages/${currentRoom}`)
        .then(response => {
            // console.log(response.data)
            setMessages(response.data)
        })    
    }

    const sendMessage = (message, date, room) => {
        socket.emit('message', message, id_user, date, room)
        render_chats()
    }

    const update = async (data) => {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/new_chat`, data)
            .then(response => {
                // console.log(response.data)
                // setMessages(response.data)
                socket.emit('update')
                render_chats()
                return response.data
            })

        return response
    }

    const roomConnect = (room) => {
        socket.emit('connectRoom', room)
        getMessages(room)
    }

    const updateCurrenChat = (setCurrentChat) => {
        
    }

    const connect = () => {
        socket.emit('userconnection', id_user)
    }

    const disconnect = () => {
        socket.emit('disconnected', id_user)
    }

    return {
        messages,
        chats,
        setChats,
        sendMessage,
        roomConnect,
        connect,
        setMessages,
        disconnect,
        update
    }
}
