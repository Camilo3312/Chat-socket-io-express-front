import React, { createContext } from 'react'
import { useLocalStorage } from '../CustomHooks/useLocalStorage'

export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {

    const [userauth, setUserauth] = useLocalStorage('user_auth')

    return (
        <UserContext.Provider value={userauth}>
            {children}
        </UserContext.Provider>
    )
}
