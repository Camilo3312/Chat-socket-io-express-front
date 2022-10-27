import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from './useLocalStorage'

export const useAuth = () => {

    const navigate = useNavigate()
    const [value, setValue, removeValue] = useLocalStorage('user_auth', null)
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)

    const google_auth = (data) => {
        setLoading(true)
        try {
            axios.post(`${process.env.REACT_APP_API_URL}/google_auth`, data)
            .then(response => { 
                console.log(response.data)
                setValue({...response.data,...data})
                navigate('chat')
                window.location.reload()
            })
            .finally(setLoading(false))
        } catch (error) {
            setError(error)
        }
        
    }

    const auth = (data) => {
        setLoading(true)
        try {
            axios.post(`${process.env.REACT_APP_API_URL}/auth`, data)
            .then(response => { 
                console.log(response.data)
                setValue({...response.data})
                navigate('chat')
                window.location.reload()
            })
            .finally(setLoading(false))
        } catch (error) {
            setError(error)
        }
        
    }

    const logout = () => {
        removeValue()
        navigate('/')
    }

    return { google_auth, auth, logout }
}
