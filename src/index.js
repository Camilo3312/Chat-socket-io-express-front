import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RoutesApp } from './Route';
import { ChatTest } from './ChatTest';
import { SingIn } from './Modules/SingIn/SingIn';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserProvider } from './Context/UserProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId="403007703687-eolarvfjgdf50g80ps8oil1v60g7948e.apps.googleusercontent.com">
        <RoutesApp />
    </GoogleOAuthProvider>
);