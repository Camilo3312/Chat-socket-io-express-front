import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'

export const useFetch = (url = null) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        try {
            axios.get(url)
                .then(response => {
                    console.log(response.data)
                    setData(response.data)
                })
                .finally(setLoading(false))
        } catch (error) {
            setError(error)
        }

    }, [])

    const get = async (url_) => {    
        setLoading(true) 
        const response = await axios.get(url_)
            .then(response => {
                // console.log(response.data)
                setData(response.data)
            })    
            .finally(() => setLoading(false))
        // console.log(response.data);
        return response.data      
    }

    const post = async (url_, data) => {    
        setLoading(true) 
        const response = await axios.post(url_, data)
            .then(response => {
                console.log(response.data)
                setData(response.data)
            })    
            .finally(() => setLoading(false))
        // console.log(response.data);
        return response.data      
    }

    const setData_ = (data) => {
        setData(data)
    }

    return {
        data,
        loading,
        error,
        get,
        post,
        setData_
    }
}
