import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const AuthContext = React.createContext();

function AuthProviderWrapper(props){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [authToken, setAuthToken] = useState(null);
    const [authError, setauthError] = useState(null);

    const storeToken = (token) => {
        localStorage.setItem('authToken', token)
    };

    const retrieveToken = () => {
        setAuthToken(localStorage.getItem('authToken'))
    };

    const clearToken = () => {
        localStorage.removeItem('authToken')
    };

    const authUser = () => {
        const storedToken = localStorage.getItem('authToken')
        if (storedToken) {
            axios.get(`${API_URL}/api/auth/verify`, {
                headers: { Authorization: `Bearer ${storedToken}`}
            })
            .then((response) => {
                const user = response.data
                setIsLoggedIn(true)
                setIsLoading(false)
                setUser(user)
                retrieveToken()
            })
            .catch((error) => {
                if (error){
                    setauthError(error.response.data.message)
                    return;
                }
            })
            setIsLoading(false);
            setIsLoggedIn(false)
            setUser(null)
        } else {
            setIsLoading(false);
            setIsLoggedIn(false)
            setUser(null)
        }
    }
    
    const logOutUser = () => {
        clearToken();
        authUser()
    }

    useEffect(() => {
        authUser()
    }, []);

    return (
        <AuthContext.Provider 
            value={{
                isLoggedIn,
                isLoading,
                user,
                authToken,
                authError,
                logOutUser,
                authUser,
                storeToken,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export {AuthProviderWrapper, AuthContext }