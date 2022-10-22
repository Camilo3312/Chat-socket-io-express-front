import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { ChatCard } from './Components/UI/ChatCard/ChatCard';

const socket = io('http://localhost:4000')

const chats = [
  {
      room: '1',
      user_state_connected: true,
      image_profile: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29uc3xlbnwwfHwwfHw%3D&w=1000&q=80',
      date_last_connected: '02 Julio',
      user_name: 'Sofia',
      last_message: 'Hey ws foo',
      unread_messages: 2
  },
  {
      room: '2',
      user_state_connected: false,
      image_profile: 'https://images.unsplash.com/photo-1545996124-0501ebae84d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGh1bWFufGVufDB8fDB8fA%3D%3D&w=1000&q=80',
      date_last_connected: '02 Julio',
      user_name: 'Juan Alverto',
      last_message: 'Hey ws foo',
      unread_messages: 10
  },
  {
      room: '3',
      user_state_connected: true,
      image_profile: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29uc3xlbnwwfHwwfHw%3D&w=1000&q=80',
      date_last_connected: '02 Julio',
      user_name: 'Sofia',
      last_message: 'Hey ws foo',
      unread_messages: 2
  },
  {
      room: '4',
      user_state_connected: false,
      image_profile: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29uc3xlbnwwfHwwfHw%3D&w=1000&q=80',
      date_last_connected: '02 Julio',
      user_name: 'Sofia',
      last_message: 'Hey ws foo',
      unread_messages: 2
  }
]


function App() {

  const [message, setMessage] = useState()
  // const [room, setRoom] = useState()
  const [connectionId, setConnectionId] = useState()
  const [messages, setMessages] = useState([])
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    const reciveMessage = (message) => {
      setMessages([...messages, {
        body: message,
        from: 'user'
      }])
    }
    socket.on('message', reciveMessage)
    socket.on('typing', state => setTyping(state))
    socket.on('event', event => console.log(event))
    socket.on('chats', data => console.log(data))

    return () => {
      socket.off('message', reciveMessage)
    }
  }, [])

  useEffect(() => {
    socket.emit('chats', 1)
  },[])

  return (
    <main>
      <div className='chats'>
        {
          chats.map((item, index) => (
            <div key={index} onClick={() => {
              socket.emit('connectRoom', item.room)
              setConnectionId(item.room)
              setMessages([])
            }}>
              <ChatCard information={item} key={index} />
            </div>
          ))
        }
      </div>
      {/* <input type='text' onChange={e => setConnectionId(e.target.value)} />
      <input type='button' value='Conectar a la sala' onClick={() => {
        socket.emit('connectRoom', connectionId)
      }} /> */}
      <form onSubmit={e => {
        e.preventDefault()
        socket.emit('message', message, connectionId )
        socket.emit('chatsss', 1)
        setMessages([...messages, {
          body: message,
          from: 'Me'
        }])
        setMessage('')
      }}>
        <input type='text' onChange={e => {
          setMessage(e.target.value)

          socket.emit('typing', true)
          setTimeout(() => {
            socket.emit('typing', false)
          }, 2000)
        }
        } value={message} />
        <input type='submit' value='Enviar' />
      </form>
      {
        typing ?
          <h1>Escribiendo...</h1>
          :
          <p></p>
      }
      {
        messages.map((item, index) => (
          <div key={index}>
            <p>{item.body}</p>
            <p>{item.from}</p>
          </div>
        ))
      }
    </main>
  );
}

export default App;
