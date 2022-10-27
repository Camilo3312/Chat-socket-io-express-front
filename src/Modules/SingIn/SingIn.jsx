import React, { useState } from 'react'
import { useEffect } from 'react'
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { googleLogout } from '@react-oauth/google';
import { useAuth } from '../../CustomHooks/useAuth';
import { BoxShadow } from '../../Components/StyledComponents/BoxShadow'

import './SingIn.css'

export const SingIn = () => {

    const { google_auth, auth } = useAuth()
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    return (
        <>
            <main>
                <div className="center_main">

                    <BoxShadow className='login'>
                        <div className="google_login">

                            <div className="information_login">
                                <p className='subtitle'>Login</p>
                                <p className='info'>Chat with Socket.io and Express</p>
                            </div>
                            <GoogleLogin
                                onSuccess={credentialResponse => {
                                    google_auth(jwt_decode(credentialResponse.credential))
                                    console.log(jwt_decode(credentialResponse.credential));
                                }}
                                onError={() => {
                                    console.log('Login Failed')
                                }}
                            />
                        </div>
                        <div className="">
                            <form className="registry" onSubmit={e => {
                                e.preventDefault()

                                auth({
                                    email,
                                    password
                                })
                            }}>

                                <input className='input_chat' type='email' placeholder='Email' onChange={e => setEmail(e.target.value)} />
                                <input className='input_chat' type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} />
                                <button className='btn_login'>Login</button>
                            </form>
                        </div>


                    </BoxShadow>
                </div>
            </main>
        </>
    )
}
