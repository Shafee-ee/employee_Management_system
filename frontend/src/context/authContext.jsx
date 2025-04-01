import React, { useContext, createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const userContext = createContext();

const AuthContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const verifyUser = async () => {


            //try block
            try {
                const token = localStorage.getItem('token');
                if (token) {


                    const response = await axios.get('http://localhost:5000/api/auth/verify', {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });
                    if (response.data.success) {
                        setUser(response.data.user)
                    }
                } else {
                    navigate('/login')
                }

            }


            //catch block
            catch (error) {
                if (error.response && !error.response.data.success) {
                    navigate('/login')

                }
            }




        }, []);

    const login = (user) => {
        setUser(user)
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    }


    return (
        <userContext.Provider value={{ user, login, logout }}>
            {children}
        </userContext.Provider>
    )
}

export const useAuth = () => useContext(userContext);
export default AuthContext