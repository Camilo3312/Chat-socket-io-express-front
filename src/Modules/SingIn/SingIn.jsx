import React from 'react'
import { useEffect } from 'react'
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { googleLogout } from '@react-oauth/google';
import { useAuth } from '../../CustomHooks/useAuth';
import { BoxShadow } from '../../Components/StyledComponents/BoxShadow'

import './SingIn.css'

export const SingIn = () => {

    const { auth } = useAuth()

    useEffect(() => {
        console.log('xd');
        fetch(`${process.env.REACT_APP_API_URL}/get_users/lopez`)
        .then(response => response.json())
        .then(response => console.log(response))
    },[])

    return (
        <>
            <main>
                <div className="center_main">

                    <BoxShadow className='login'>
                        <div className="information_login">
                            <p className='subtitle'>Login</p>
                            <p className='info'>Chat with Socket.io and Express</p>
                        </div>
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                auth(jwt_decode(credentialResponse.credential))
                                console.log(jwt_decode(credentialResponse.credential));
                            }}
                            onError={() => {
                                console.log('Login Failed')
                            }}
                            />
                    </BoxShadow>
                </div>
            </main>
        </>
    )
}
