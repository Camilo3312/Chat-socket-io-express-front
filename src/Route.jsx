import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ChatTest } from './ChatTest'
import { UserProvider } from './Context/UserProvider'
import { SingIn } from './Modules/SingIn/SingIn'

export const RoutesApp = () => {
    return (
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<SingIn />} />
                    <Route path='/chat' element={<ChatTest />} />
                </Routes>
            </BrowserRouter>
        </UserProvider>
    )
}
