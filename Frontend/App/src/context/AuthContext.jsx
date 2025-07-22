import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider =({children})=>{
    const [token, setToken]= useState();
    const[user,setUser] = useState();

    const login = (token, userData)=>{
        setToken(token);
        setUser(userData);
    };

    const logout= () =>{
        setToken(null);
    };

    return(
        <AuthContext.Provider value ={{token,user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth =()=> useContext(AuthContext);