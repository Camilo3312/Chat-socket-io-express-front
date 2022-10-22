import React, { useState } from 'react'

export const useLocalStorage = (key, initialvalue) => {

    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialvalue
        } catch {
            return initialvalue
        }
    }
    )

    const setLocalStorage = (value) => {
        try {
            setStoredValue(value)
            window.localStorage.setItem(key, JSON.stringify(value))
        } catch {
            window.localStorage.setItem(key, JSON.stringify(initialvalue))
        }
    }

    const removeLocalStorage = () => {
        window.localStorage.removeItem(key)
    }

    return [storedValue, setLocalStorage, removeLocalStorage]
}
